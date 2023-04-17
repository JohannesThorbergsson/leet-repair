import {ChangeEvent, SyntheticEvent, useReducer} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import {Workshop} from "../model/Workshop";
import {useLocation, useNavigate} from "react-router-dom";
import {ServiceOrder} from "../model/ServiceOrder";
import orderFormReducer from "../Reducer/orderFormReducer";

type OrderFormProps = {
    workshops: Workshop[]
    bikes?: Bike[]
    orders: ServiceOrder[]
    orderToEdit?: ServiceOrder
    updateOrderList(orders: ServiceOrder[]): void
}
export default function useOrderForm(props: OrderFormProps){
    const navigate = useNavigate()
    const location = useLocation()
    const initialFormState = {
        orderedComponents: props.orderToEdit?.componentsToReplace ?? [],
        selectedBike: props.bikes?.find(bike=>bike.id === props.orderToEdit?.bikeId) ?? undefined,
        orderDescription: props.orderToEdit?.description ?? "",
        orderedComponentsText: props.orderToEdit?.componentsToReplace.map(
            component => component.category + " " +component.type),
        workshopNewOrder: location.state?.workshop,
        workshopEditOrder: props.workshops?.find(workshop => workshop.name===props.orderToEdit?.workshop),
        orderToEditStatus: props.orderToEdit?.status,
        openDeleteDialog: false
    }
    const [orderFormState, dispatch] = useReducer(orderFormReducer, initialFormState)
    const submitDisabled = orderFormState.orderDescription ==="" || !orderFormState.selectedBike
    const componentsInStock = !props.orderToEdit?
        (orderFormState.workshopNewOrder?.inventory.map(
            component => component.category + " " +component.type) || []):
        (orderFormState.workshopEditOrder?.inventory.map(
            component => component.category + " " +component.type) || [])

    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponentsNewOrder = orderFormState.workshopNewOrder?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        const selectedComponentsEditMode = orderFormState.workshopEditOrder?.inventory.filter(
            component=> value.includes(component.category + " " + component.type))

        if(orderFormState.workshopNewOrder && selectedComponentsNewOrder) {
            dispatch({type: "SET_ORDERED_COMPONENTS", payload: selectedComponentsNewOrder})
            dispatch({type: "SET_ORDERED_COMPONENTS_TEXT", payload: orderFormState.orderedComponents.map(
                component => component.category + " " +component.type)})
        } else if (props.orderToEdit && selectedComponentsEditMode) {
            dispatch({type: "SET_ORDERED_COMPONENTS", payload: selectedComponentsEditMode})
        }
    }
    function handleInputBike(event: SyntheticEvent<Element, Event>, value: string | null){
        dispatch({type: "SET_SELECTED_BIKE", payload: props.bikes?.find(bike => bike.modelName===value)})
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>) {
        dispatch({type: "SET_ORDER_DESCRIPTION", payload: event.target.value})
    }
    function handleSubmitOrder(){
        if(!props.orderToEdit) {
            axios.post("/api/orders/",
                {
                    bikeId: orderFormState.selectedBike?.id,
                    bikeName: orderFormState.selectedBike?.modelName,
                    description: orderFormState.orderDescription,
                    workshop: orderFormState.workshopNewOrder?.name,
                    workshopId: orderFormState.workshopNewOrder?.id,
                    status: "OPEN",
                    componentsToReplace: orderFormState.orderedComponents})
                .then(r => props.updateOrderList([...props.orders, r.data]))
                .finally(()=> navigate("/"))
                .catch((error) => console.error(error))
        } else {
            axios.put("/api/orders/" + props.orderToEdit.id,
                {
                    bikeId: orderFormState.selectedBike?.id,
                    bikeName: orderFormState.selectedBike?.modelName,
                    description: orderFormState.orderDescription,
                    workshop: props.orderToEdit.workshop,
                    workshopId: props.orderToEdit.workshopId,
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
        submitDisabled,
        handleClickDeleteOrder,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder}
}
