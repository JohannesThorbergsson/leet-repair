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
    const workshopNewOrder: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)
    const orderToEditStatus = props.orderToEdit?.status
    const componentsInStock = !props.orderToEdit?
        workshopNewOrder?.inventory.map(component => component.category + " " +component.type) || []:
        props.workshops.find(workshop => workshop.name===props.orderToEdit?.workshop)
            ?.inventory.map(component => component.category + " " +component.type) || []

    const [orderedComponents, setOrderedComponents]
        = useState<Component[]>(props.orderToEdit? props.orderToEdit.componentsToReplace : [])
    const [selectedBike, setSelectedBike]
        = useState<Bike | undefined>(props.orderToEdit? props.bikes.find(bike=>bike.id === props.orderToEdit?.bikeId) : undefined)
    const [orderDescription, setOrderDescription]
        = useState<string>(props.orderToEdit? props.orderToEdit.description : "")
    const [orderedComponentsText, setOrderedComponentsText]
        = useState<string[]>(orderedComponents.map(component => component.category + " " +component.type))
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponent = workshopNewOrder?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        const selectedComponentEditMode = props.workshops.find(
            workshop=>workshop.name===props.orderToEdit?.workshop)
            ?.inventory.filter(component=> value.includes(component.category + " " + component.type))
        if(workshopNewOrder && selectedComponent) {
            setOrderedComponents([...selectedComponent])
            setOrderedComponentsText(orderedComponents.map(component => component.category + " " +component.type))
        } else if (props.orderToEdit && selectedComponentEditMode) {
            setOrderedComponents(selectedComponentEditMode)
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
        if(!props.orderToEdit) {
            axios.post("/api/orders/",
                {
                    bikeId: selectedBike?.id,
                    description: orderDescription,
                    workshop: workshopNewOrder?.name,
                    status: "OPEN",
                    componentsToReplace: orderedComponents})
                .then(r => props.updateOrderList([...props.orders, r.data]))
                .finally(()=> navigate("/"))
                .catch((error) => console.error(error))
        } else {
            axios.put("/api/orders/" + props.orderToEdit.id,
                {
                    bikeId: selectedBike?.id,
                    description: orderDescription,
                    workshop: props.orderToEdit.workshop,
                    status: orderToEditStatus,
                    componentsToReplace: orderedComponents})
                .then(r => r.data)
                .then(updatedOrder => props.updateOrderList([...props.orders.filter(
                    order=>order.id!==updatedOrder.id), updatedOrder]))
                .finally(()=> navigate("/"))
                .catch((error) => console.error(error))
        }
    }
    function handleClickDeleteOrder(){
        setOpenDeleteDialog(!openDeleteDialog)
    }
    return {
        openDeleteDialog,
        workshopNewOrder,
        selectedBike,
        orderDescription,
        orderedComponents,
        orderedComponentsText,
        componentsInStock,
        handleClickDeleteOrder,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder}
}
