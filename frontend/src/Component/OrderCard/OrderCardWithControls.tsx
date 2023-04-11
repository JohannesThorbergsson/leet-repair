import React from "react";
import {Box, Button, Card} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import {useNavigate} from "react-router-dom";
import UpdateOrderStatusDialog from "../../Dialog/UpdateOrderStatusDialog";
import useUpdateOrderStatus from "../../Hooks/useUpdateOrderStatus";
import OrderCardContent from "./OrderCardContent";
import {Bike} from "../../model/Bike";
import {User} from "../../Hooks/useAuth";

type OrderCardWithControlsProps = {
    order: ServiceOrder
    orders: ServiceOrder[]
    bikes: Bike[]
    user: User | null
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}

export default function OrderCardWithControls(props: OrderCardWithControlsProps){
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
            <OrderCardContent order={props.order} user={props.user}/>
            <Box sx={{
                pb: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'}}>
                {(props.order.status==="OPEN" && props.user?.role === "BASIC") &&
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
                handleSave={handleSave}
                user={props.user}/>
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
