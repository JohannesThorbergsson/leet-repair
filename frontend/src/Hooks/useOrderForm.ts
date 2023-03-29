import {ChangeEvent, FormEvent, SyntheticEvent, useState} from "react";
import {Component} from "../model/Component";
import {Bike} from "../model/Bike";
import axios from "axios";
import {Workshop} from "../model/Workshop";
import {useNavigate, useParams} from "react-router-dom";
import {ServiceOrder} from "../model/ServiceOrder";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function useOrderForm(props: OrderFormProps){
    const [orderedComponents, setOrderedComponents] = useState<Component[]>([])
    const [selectedBike, setSelectedBike] = useState<Bike>()
    const [orderDescription, setOrderDescription] = useState<string>("")

    const navigate = useNavigate()
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)

    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponent = workshop?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        if(workshop && selectedComponent) {
            setOrderedComponents([...selectedComponent])
        }
    }
    function handleInputBike(event: SyntheticEvent<Element, Event>, value: string | null){
        setSelectedBike(props.bikes.find(bike => bike.modelName===value))
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>) {
        setOrderDescription(event.target.value)
    }
    function handleSubmitOrder(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.post("/api/orders/",
            {bikeId: selectedBike?.id,
                description: orderDescription,
                workshop: workshop?.name,
                status: "OPEN",
                componentsToReplace: orderedComponents})
            .then(r => props.updateOrderList([...props.orders, r.data]))
            .finally(()=> navigate("/"))
            .catch((error) => console.error(error))
    }
    return {
        workshop,
        selectedBike,
        orderDescription,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder}
}
