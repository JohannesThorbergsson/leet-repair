import {ChangeEvent, FormEvent, SyntheticEvent, useReducer} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import {Workshop} from "../model/Workshop";
import {useNavigate, useParams} from "react-router-dom";
import {ServiceOrder} from "../model/ServiceOrder";
import orderFormReducer from "../Reducer/orderFormReducer";

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
    const initialFormState = {
        orderedComponents: props.orderToEdit?.componentsToReplace ?? [],
        selectedBike: props.bikes.find(bike=>bike.id === props.orderToEdit?.bikeId) ?? undefined,
        orderDescription: props.orderToEdit?.description ?? "",
        orderedComponentsText: props.orderToEdit?.componentsToReplace.map(
            component => component.category + " " +component.type),
        workshopNewOrder: props.workshops.find(workshop => workshop.id === workshopId),
        workshopEditOrder: props.workshops.find(workshop => workshop.name===props.orderToEdit?.workshop),
        orderToEditStatus: props.orderToEdit?.status,
        openDeleteDialog: false
    }
    const [orderFormState, dispatch] = useReducer(orderFormReducer, initialFormState)

    const componentsInStock = !props.orderToEdit?
        (orderFormState.workshopNewOrder?.inventory.map(
            component => component.category + " " +component.type) || []):
        (orderFormState.workshopEditOrder?.inventory.map(
            component => component.category + " " +component.type) || [])

    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponentNewOrder = orderFormState.workshopNewOrder?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        const selectedComponentEditMode = props.workshops.find(
            workshop=>workshop.name===props.orderToEdit?.workshop)
            ?.inventory.filter(component=> value.includes(component.category + " " + component.type))

        if(orderFormState.workshopNewOrder && selectedComponentNewOrder) {
            dispatch({type: "SET_ORDERED_COMPONENTS", payload: selectedComponentNewOrder})
            dispatch({type: "SET_ORDERED_COMPONENTS_TEXT", payload: orderFormState.orderedComponents.map(
                component => component.category + " " +component.type)})
        } else if (props.orderToEdit && selectedComponentEditMode) {
            dispatch({type: "SET_ORDERED_COMPONENTS", payload: selectedComponentEditMode})
        }
    }
    function handleInputBike(event: SyntheticEvent<Element, Event>, value: string | null){
        dispatch({type: "SET_SELECTED_BIKE", payload: props.bikes.find(bike => bike.modelName===value)})
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>) {
        dispatch({type: "SET_ORDER_DESCRIPTION", payload: event.target.value})
    }
    function handleSubmitOrder(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(!props.orderToEdit) {
            axios.post("/api/orders/",
                {
                    bikeId: orderFormState.selectedBike?.id,
                    description: orderFormState.orderDescription,
                    workshop: orderFormState.workshopNewOrder?.name,
                    status: "OPEN",
                    componentsToReplace: orderFormState.orderedComponents})
                .then(r => props.updateOrderList([...props.orders, r.data]))
                .finally(()=> navigate("/"))
                .catch((error) => console.error(error))
        } else {
            axios.put("/api/orders/" + props.orderToEdit.id,
                {
                    bikeId: orderFormState.selectedBike?.id,
                    description: orderFormState.orderDescription,
                    workshop: props.orderToEdit.workshop,
                    status: orderFormState.orderToEditStatus,
                    componentsToReplace: orderFormState.orderedComponents})
                .then(r => r.data)
                .then(updatedOrder => props.updateOrderList([...props.orders.filter(
                    order=>order.id!==updatedOrder.id), updatedOrder]))
                .finally(()=> navigate("/"))
                .catch((error) => console.error(error))
        }
    }
    function handleClickDeleteOrder(){
        dispatch({type: "SET_OPEN_DELETE_DIALOG", payload: !orderFormState.openDeleteDialog})
    }
    return {
        orderFormState,
        componentsInStock,
        handleClickDeleteOrder,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder}
}
