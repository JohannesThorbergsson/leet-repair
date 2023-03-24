import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ServiceEvent} from "../model/ServiceEvent";
import {Bike} from "../model/Bike";

type UseEditBikeProps = {
    editMode: boolean
    bikes: Bike[]
    bikeToEdit?: Bike
    updateBikeList(bikes: Bike[]): void
}
export default function useEditBike(props: UseEditBikeProps){
    const[modelName, setModelName] =
        useState(props.bikeToEdit? props.bikeToEdit.modelName : "")
    const[mileage, setMileage] =
        useState<number | undefined>(props.bikeToEdit? props.bikeToEdit.mileage : undefined)
    const[mileageFieldValue, setMileageFieldValue] = useState("")
    const[components, setComponents] =
        useState<Component[]>(props.bikeToEdit? props.bikeToEdit.components : [])
    const[services, setServices] = useState<ServiceEvent[]>(props.bikeToEdit? props.bikeToEdit.services : [])
    const[newComponentCategory, setNewComponentCategory] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number | undefined>()
    const[newComponentAgeValue, setNewComponentAgeValue] =useState("")
    const navigate = useNavigate()

    function setValuesOnEditMode(editMode: boolean, bikeToEdit?: Bike) {
        if(editMode && bikeToEdit) {
            setModelName(bikeToEdit.modelName)
            setMileage(bikeToEdit.mileage)
            setComponents(bikeToEdit.components)
            setServices(bikeToEdit.services)
        }
    }
    function handleInputModelName(event: ChangeEvent<HTMLInputElement>){
        setModelName(event.target.value)
    }
    function handleInputMileage(event: ChangeEvent<HTMLInputElement>) {
        setMileageFieldValue(event.target.value)
        if(/^\d+$/.test(event.target.value.trim())) {
            setMileage(Number(event.target.value.trim()))
        }
    }
    function handleInputComponentCategory(event: ChangeEvent<HTMLInputElement>){
        setNewComponentCategory(event.target.value)
    }
    function handleInputComponentModel(event: ChangeEvent<HTMLInputElement>) {
        setNewComponentModel(event.target.value)
    }
    function handleInputComponentAge(event: ChangeEvent<HTMLInputElement>){
        setNewComponentAgeValue(event.target.value)
        if(/^\d+$/.test(event.target.value)) {
            setNewComponentAge(Number(event.target.value))
        }
    }
    function handleSetInstalledComponents(components: Component[]){
        setComponents(components)
        setNewComponentAge(0)
        setNewComponentModel("")
        setNewComponentCategory("")
    }
    function handleDeleteComponent(component: Component) {
        setComponents(components.filter((c => c.type !== component.type)))
    }
    function handleSetServices(services: ServiceEvent[]){
        setServices(services)
    }
    function deleteService(id: string){
        setServices(services.filter(serviceEvent => serviceEvent.id!==id))
    }
    function handleSubmitBike(){
        if(!props.editMode) {
            axios.post("/api/bikes/",
                {modelName: modelName, mileage: mileage, components: components, services: services})
                .then((r) => props.updateBikeList([...props.bikes, r.data]))
                .then(() => navigate("/bikes"))
                .catch((error) => console.error(error))
        }
    }
    function handleCancel(){
        navigate("/bikes")
    }
    return {
        mileageFieldValue,
        components,
        newComponentAge,
        newComponentModel,
        newComponentCategory,
        modelName,
        mileage,
        newComponentAgeValue,
        services,
        handleDeleteComponent,
        handleInputComponentAge,
        handleInputMileage,
        handleInputModelName,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleSetInstalledComponents,
        handleSetServices,
        deleteService,
        handleSubmitBike,
        handleCancel,
        setValuesOnEditMode
    }
}
