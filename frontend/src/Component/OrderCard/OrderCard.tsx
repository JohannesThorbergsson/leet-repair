import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";
import UpdateOrderStatusDialog from "../../Dialog/UpdateOrderStatusDialog";
import axios from "axios";

type OrderCardProps = {
    order: ServiceOrder
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}

export default function OrderCard(props: OrderCardProps){
    const navigate = useNavigate()
    const [status, setStatus] = useState(getStatusDisplayText())
    const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    useEffect(handleUpdateStatus, [saveChanges])

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
        axios.put("/api/orders/" + props.order.id, {...props.order, status: getStatusEnumValue()})
            .then(r => r.data)
            .then(updatedOrder => props.updateOrderList([...props.orders.filter(
                order=>order.id !== props.order.id), updatedOrder]))
            .catch((error) => console.error(error))
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
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h4" fontWeight={"medium"}>
                    {props.order.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        Contractor: {props.order.workshop}
                    </Typography>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        {"Status: " + status}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    New Components:
                </Typography>
                <ComponentTable components={props.order.componentsToReplace} showAge={false}/>
            </CardContent>
            <Box sx={{
                pb: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'}}>
                {props.order.status==="OPEN" &&
                    <Button variant={"contained"}
                            sx={{width: 1/2, mr: 1 , ml: 2}}
                            onClick={()=> navigate("/orders/" + props.order.id)}>
                        Edit Order
                    </Button>
                }
                <Button variant={"contained"} sx={{width: 1/2, mr: 2 , ml: 1}}
                        onClick={handleUpdateStatusDialogSetOpen}>
                    Update Status
                </Button>
            </Box>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                boxShadow: 1
            }}>{card}</Card>
            <UpdateOrderStatusDialog
                id={"update-order-status"} keepMounted
                open={openUpdateStatusDialog}
                status={status}
                saveChanges={saveChanges}
                handleSetStatus={handleSetStatus}
                handleUpdateStatusDialogSetOpen={handleUpdateStatusDialogSetOpen}
                handleSave={handleSave}/>
        </div>
    )
}
