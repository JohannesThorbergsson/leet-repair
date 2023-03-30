import {useEffect, useState} from "react";
import axios from "axios";
import {ServiceOrder} from "../model/ServiceOrder";
import {LocalDate} from "js-joda";
import {Bike} from "../model/Bike";

type OrderCardWithControlsProps = {
    order: ServiceOrder
    orders: ServiceOrder[]
    bikes: Bike[]
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}
export default function useUpdateOrderStatus(props: OrderCardWithControlsProps){
    const [status, setStatus] = useState(getStatusDisplayText())
    const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        if(mounted) {
            handleUpdateStatus()
        } else {
            setMounted(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveChanges])

    function getStatusDisplayText() {
        switch (props.order.status) {
            case "OPEN":
                return "Open"
            case "IN_PROGRESS":
                return "In Progress"
            case "READY_FOR_PICKUP":
                return "Ready for Pickup"
            case "DONE":
                return "Done"
            default:
                return props.order.status
        }
    }
    function getStatusEnumValue() {
        switch (status) {
            case "Open":
                return "OPEN"
            case "In Progress":
                return "IN_PROGRESS"
            case "Ready for Pickup":
                return "READY_FOR_PICKUP"
            case "Done":
                return "DONE"
            default:
                return props.order.status
        }
    }

    function handleUpdateStatus(){
        axios.put("/api/orders/" + props.order.id,
            {...props.order, date: LocalDate.now(), status: getStatusEnumValue()})
            .then(r => r.data)
            .then(updatedOrder => props.updateOrderList([...props.orders.filter(
                order=>order.id !== props.order.id), updatedOrder]))
            .catch((error) => console.error(error))
        if(status==="Done"){
            const bikeToUpdate = props.bikes.find(bike=> bike.id === props.order.bikeId)
            if(bikeToUpdate) {
                axios.put("/api/bikes/" + props.order.bikeId,
                    {
                        ...bikeToUpdate,
                        services: [
                            ...bikeToUpdate.services,
                            {
                                description: props.order.description,
                                newComponents: props.order.componentsToReplace,
                                workshopName: props.order.workshop,
                                date: props.order.date
                            }],
                        components:
                            [...bikeToUpdate.components
                                .filter((component => !props.order.componentsToReplace
                                    .map(comp=> comp.category.toLowerCase())
                                    .includes(component.category.toLowerCase()))), ...props.order.componentsToReplace]})
                    .then(r => r.data)
                    .then(updatedBike => props.updateBikeList(
                        [...props.bikes.filter(bike => bike.id !== updatedBike.id), updatedBike]))
                    .catch((error) => console.error(error))
            }
        }
    }
    function handleSetStatus(newStatus: string){
        setStatus(newStatus)
    }
    function handleUpdateStatusDialogSetOpen(){
        setOpenUpdateStatusDialog(!openUpdateStatusDialog)
    }
    function handleSave(){
        setSaveChanges(!saveChanges)
    }
    return {status, openUpdateStatusDialog, saveChanges, handleSetStatus, handleSave, handleUpdateStatusDialogSetOpen}
}
