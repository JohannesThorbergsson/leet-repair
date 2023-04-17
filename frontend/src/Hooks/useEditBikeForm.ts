import {ChangeEvent, useReducer} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {LocalDate} from 'js-joda';
import {ServiceEvent} from "../model/ServiceEvent";
import {Bike} from "../model/Bike";
import editBikeFormReducer from "../Reducer/editBikeFormReducer";

type UseEditBikeProps = {
    editMode: boolean
    bikes: Bike[]
    bikeToEdit?: Bike
    updateBikeList(bikes: Bike[]): void
}
export default function useEditBikeForm(props: UseEditBikeProps){
    const initialFormState = {
        modelName: props.bikeToEdit? props.bikeToEdit.modelName : "",
        mileage: props.bikeToEdit? props.bikeToEdit.mileage : 0,
        initialMileage: props.bikeToEdit? props.bikeToEdit.mileage : 0,
        mileageFieldValue: props.bikeToEdit? props.bikeToEdit.mileage.toString() : "",
        components: props.bikeToEdit? props.bikeToEdit.components : [],
        initialComponents: props.bikeToEdit? props.bikeToEdit.components : [],
        services: props.bikeToEdit? props.bikeToEdit.services : [],
        openDeleteDialog: false,
        scrollToBottom : false
    }
    const [editBikeFormState, dispatch] = useReducer(editBikeFormReducer, initialFormState)
    const navigate = useNavigate()
    const submitDisabled = editBikeFormState.modelName===""
            || (!/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())
            && editBikeFormState.mileageFieldValue!=="")

    function handleInputModelName(event: ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_MODEL_NAME", payload: event.target.value})
    }
    function handleInputMileage(event: ChangeEvent<HTMLInputElement>) {
        const mileageDiff = editBikeFormState.initialMileage?
            Number(event.target.value) - editBikeFormState.initialMileage : 0
        dispatch({type: "SET_MILEAGE_FIELD_VALUE", payload: event.target.value})
        dispatch({type: "SET_MILEAGE", payload: Number(event.target.value.trim())})
        if(!editBikeFormState.initialComponents.find(component => (component.age ?? 0) + mileageDiff <0)) {
            dispatch({type: "SET_COMPONENTS", payload: editBikeFormState.components.map(component =>
                    (component.age !== undefined ? {...component, age: (editBikeFormState.initialComponents.find(c =>
                            c.type+c.category === component.type+component.category)?.age ?? 0) + mileageDiff }: component ))})
        } else {
            dispatch({type: "SET_COMPONENTS", payload: editBikeFormState.initialComponents})
        }
    }
    function handleSetInstalledComponents(components: Component[]){
        dispatch({type: "SET_COMPONENTS", payload: components})
    }
    function handleSetServices(services: ServiceEvent[]){
        dispatch({type: "SET_SERVICES", payload: services})
    }
    function handleDeleteComponent(component: Component) {
        dispatch({type: "SET_COMPONENTS",
            payload: editBikeFormState.components.filter((c => c.type !== component.type))})
    }
    function deleteService(id: string){
        dispatch({type: "SET_SERVICES",
            payload: editBikeFormState.services.filter(serviceEvent => serviceEvent.id!==id)})
    }
    function handleClickDeleteBike(){
        dispatch({type: "SET_OPEN_DELETE_DIALOG", payload: !editBikeFormState.openDeleteDialog})
    }
    function scroll(){
        dispatch({type: "SET_SCROLL_TO_BOTTOM", payload: !editBikeFormState.scrollToBottom})
    }
    function handleSubmitBike(){
        if(!props.editMode) {
            axios.post("/api/bikes/",
                {
                    modelName: editBikeFormState.modelName,
                    mileage: editBikeFormState.mileage,
                    components: editBikeFormState.components,
                    services: editBikeFormState.services.map((service) => ({
                        ...service, date: LocalDate.parse(service.date)}))})
                .then((r) => props.updateBikeList([...props.bikes, r.data]))
                .then(() => navigate("/bikes"))
                .catch((error) => console.error(error))
        } else {
            axios.put("/api/bikes/" + props.bikeToEdit?.id,
                {
                    modelName: editBikeFormState.modelName,
                    mileage: editBikeFormState.mileage,
                    components: editBikeFormState.components,
                    services: editBikeFormState.services.map((service) => ({
                        ...service, date: LocalDate.parse(service.date)}))})
                .then(r => r.data)
                .then(updatedBike => props.updateBikeList(
                    [...props.bikes.filter(bike => bike.id !== updatedBike.id), updatedBike]))
                .then((() => navigate("/bikes")))
                .catch((error) => console.error(error))
        }
    }
    function handleCancel(){
        navigate("/bikes")
    }
    return {
        editBikeFormState,
        submitDisabled,
        handleDeleteComponent,
        handleInputMileage,
        handleInputModelName,
        handleSetInstalledComponents,
        handleSetServices,
        deleteService,
        handleSubmitBike,
        handleCancel,
        handleClickDeleteBike,
        scroll
    }
}
