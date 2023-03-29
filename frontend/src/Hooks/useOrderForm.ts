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
    orderToEdit?: ServiceOrder
    updateOrderList(orders: ServiceOrder[]): void
}
export default function useOrderForm(props: OrderFormProps){
    const navigate = useNavigate()
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)

    const [orderedComponents, setOrderedComponents]
        = useState<Component[]>(props.orderToEdit? props.orderToEdit.componentsToReplace : [])
    const [selectedBike, setSelectedBike]
        = useState<Bike | undefined>(props.orderToEdit? props.bikes.find(bike=>bike.id === props.orderToEdit?.bikeId) : undefined)
    const [orderDescription, setOrderDescription]
        = useState<string>(props.orderToEdit? props.orderToEdit.description : "")


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
        orderedComponents,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder}
}
