import React from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";
import UpdateOrderStatusDialog from "../../Dialog/UpdateOrderStatusDialog";
import useUpdateOrderStatus from "../../Hooks/useUpdateOrderStatus";

type OrderCardProps = {
    order: ServiceOrder
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}

export default function OrderCard(props: OrderCardProps){
    const navigate = useNavigate()
    const {
        status,
        openUpdateStatusDialog,
        saveChanges,
        handleSetStatus,
        handleSave,
        handleUpdateStatusDialogSetOpen}
        = useUpdateOrderStatus(props)

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
            <UpdateOrderStatusDialog
                id={"update-order-status"} keepMounted
                open={openUpdateStatusDialog}
                status={status}
                saveChanges={saveChanges}
                handleSetStatus={handleSetStatus}
                handleUpdateStatusDialogSetOpen={handleUpdateStatusDialogSetOpen}
                handleSave={handleSave}/>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                boxShadow: 1
            }}>{card}</Card>
        </div>
    )
}
