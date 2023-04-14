import {Box, Typography} from "@mui/material";
import OrderCardWithControls from "../OrderCard/OrderCardWithControls";
import React from "react";
import {ServiceOrder} from "../../model/ServiceOrder";
import {Bike} from "../../model/Bike";
import {User} from "../../Hooks/useAuth";

type OrderGalleryProps = {
    orders: ServiceOrder[]
    bikes: Bike[]
    user: User | null
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}

export default function OrderGallery(props: OrderGalleryProps){
    return (
        <>
            {props.orders.filter(order=> order.status !== "DONE").length>0?
                <Box>
                    <Typography variant={"h4"} fontWeight={"medium"} sx={{}}>Active Orders:</Typography>
                    <Box>
                        {props.orders.filter(order=> order.status !== "DONE").map(order =>
                            <OrderCardWithControls key={order.id}
                                                   order={order}
                                                   user={props.user}
                                                   bikes={props.bikes}
                                                   orders={props.orders}
                                                   updateBikeList={props.updateBikeList}
                                                   updateOrderList={props.updateOrderList}/>)}
                    </Box>
                </Box>:
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '75vh'}}>
                    <Typography variant={"h4"} fontWeight={"medium"} sx={{mt: 4}}>No Active Orders</Typography>
                </Box>
            }
        </>
    )
}
