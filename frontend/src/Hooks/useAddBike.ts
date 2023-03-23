import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ServiceEvent} from "../model/ServiceEvent";

export default function useAddBike(){
    const[mileage, setMileage] = useState<number | undefined>()
    const[mileageFieldValue, setMileageFieldValue] = useState("")
    const[modelName, setModelName] = useState("")
    const[components, setComponents] = useState<Component[]>([])
    const[services, setServices] = useState<ServiceEvent[]>([])
    const[newComponentCategory, setNewComponentCategory] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number | undefined>()
    const[newComponentAgeValue, setNewComponentAgeValue] =useState("")
    const navigate = useNavigate()

    function handleInputModelName(event: ChangeEvent<HTMLInputElement>){
        setModelName(event.target.value)
    }
    function handleInputMileage(event: ChangeEvent<HTMLInputElement>) {
        setMileageFieldValue(event.target.value)
        if(/^\d+$/.test(event.target.value.trim())) {
            setMileage(Number(event.target.value.trim()))
        }
    }
    function handleInputComponentName(event: ChangeEvent<HTMLInputElement>){
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
    function handleSubmitNewComponent(){
        setComponents([...components,
            {category: newComponentCategory, type: newComponentModel, age: newComponentAge}])
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
    function handleSubmitBike(){
        axios.post("/api/bikes/",
            {modelName: modelName, mileage: mileage, components: components}).then()
            .catch((error) => console.error(error))
    }
    function handleCancel(){
        navigate("/bikes")
    }
    return {mileageFieldValue, components, newComponentAge, newComponentModel, newComponentCategory,
        modelName, mileage, newComponentAgeValue, services,
        handleDeleteComponent,
        handleInputComponentAge,
        handleInputMileage,
        handleInputModelName,
        handleInputComponentModel,
        handleInputComponentCategory: handleInputComponentName,
        handleSubmitNewComponent,
        handleSetServices,
        handleSubmitBike,
        handleCancel
    }
}
