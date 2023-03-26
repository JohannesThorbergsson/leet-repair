import {ChangeEvent, useReducer, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { LocalDate } from 'js-joda';
import {ServiceEvent} from "../model/ServiceEvent";
import {Bike} from "../model/Bike";
import editBikeFormReducer from "../Reducer/editBikeFormReducer";

type UseEditBikeProps = {
    editMode: boolean
    bikes: Bike[]
    bikeToEdit?: Bike
    updateBikeList(bikes: Bike[]): void
}
export default function useEditBike(props: UseEditBikeProps){
    const initialFormState = {
        modelName: props.bikeToEdit? props.bikeToEdit.modelName : "",
        mileage: props.bikeToEdit? props.bikeToEdit.mileage : undefined,
        mileageFieldValue: props.bikeToEdit? props.bikeToEdit.mileage.toString() : "",
        components: props.bikeToEdit? props.bikeToEdit.components : [],
        services: props.bikeToEdit? props.bikeToEdit.services : []
    }
    const [editBikeFormState, dispatch] = useReducer(editBikeFormReducer, initialFormState)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate()

    function handleInputModelName(event: ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_MODEL_NAME", payload: event.target.value})
    }
    function handleInputMileage(event: ChangeEvent<HTMLInputElement>) {
        dispatch({type: "SET_MILEAGE_FIELD_VALUE", payload: event.target.value})
        if(/^\d+$/.test(event.target.value.trim())) {
            dispatch({type: "SET_MILEAGE", payload: Number(event.target.value.trim())})
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
        setOpenDeleteDialog(!openDeleteDialog)
    }
    function handleSubmitBike(){
        if(!props.editMode) {
            axios.post("/api/bikes/",
                {
                    modelName: editBikeFormState.modelName,
                    mileage: editBikeFormState.mileage,
                    components: editBikeFormState.components,
                    services: editBikeFormState.services.map((service) => ({
                        description: service.description,
                        newComponents: service.newComponents,
                        workshopName: service.workshopName,
                        date: LocalDate.parse(service.date)}))})
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
                        description: service.description,
                        newComponents: service.newComponents,
                        workshopName: service.workshopName,
                        date: LocalDate.parse(service.date)}))})
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
        openDeleteDialog,
        handleDeleteComponent,
        handleInputMileage,
        handleInputModelName,
        handleSetInstalledComponents,
        handleSetServices,
        deleteService,
        handleSubmitBike,
        handleCancel,
        handleClickDeleteBike
    }
}
