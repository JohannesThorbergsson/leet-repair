import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { LocalDate } from 'js-joda';
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
    const[mileageFieldValue, setMileageFieldValue] =
        useState(props.bikeToEdit? props.bikeToEdit.mileage.toString() : "")
    const[components, setComponents] =
        useState<Component[]>(props.bikeToEdit? props.bikeToEdit.components : [])
    const[services, setServices] = useState<ServiceEvent[]>(props.bikeToEdit? props.bikeToEdit.services : [])

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
    function handleSetInstalledComponents(components: Component[]){
        setComponents(components)
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
                {
                    modelName: modelName,
                    mileage: mileage,
                    components: components,
                    services: services.map((service) => ({
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
                    modelName: modelName,
                    mileage: mileage,
                    components: components,
                    services: services.map((service) => ({
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
        mileageFieldValue,
        components,
        modelName,
        mileage,
        services,
        handleDeleteComponent,
        handleInputMileage,
        handleInputModelName,
        handleSetInstalledComponents,
        handleSetServices,
        deleteService,
        handleSubmitBike,
        handleCancel
    }
}
