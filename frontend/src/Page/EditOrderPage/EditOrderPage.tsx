import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import {ServiceOrder} from "../../model/ServiceOrder";
import {Box} from "@mui/material";
import React from "react";
import InvalidId from "../../Component/InvalidId/InvalidId";
import OrderForm from "../../Component/OrderForm/OrderForm";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

type EditOrderPageProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    mapApiKey: string
    isFetching: boolean
    updateOrderList(orders: ServiceOrder[]): void
}
export default function EditOrderPage(props: EditOrderPageProps){
    useAuth(true)
    const {orderId} = useParams<{orderId: string}>()
    const order: ServiceOrder | undefined = props.orders.find(order => order.id === orderId)

    return (!props.isFetching ?
            <>
                {order ?
                    <Box>
                        <OrderForm workshops={props.workshops}
                                   bikes={props.bikes}
                                   orders={props.orders}
                                   orderToEdit={order}
                                   updateOrderList={props.updateOrderList}
                                   mapApiKey={props.mapApiKey}/>
                    </Box>:
                    <InvalidId/>
                }
            </>:
            <LoadingScreen/>
    )
}
