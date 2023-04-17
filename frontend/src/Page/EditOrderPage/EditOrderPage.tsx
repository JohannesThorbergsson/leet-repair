import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import {ServiceOrder} from "../../model/ServiceOrder";
import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import InvalidId from "../../Component/InvalidId/InvalidId";
import OrderForm from "../../Component/OrderForm/OrderForm";
import {Bike} from "../../model/Bike";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";

type EditOrderPageProps = {
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
    const [workshop, setWorkshop] = useState()

    useEffect(() => {
        if(order){
            axios.get("/api/workshops/" + order?.workshopId)
                .then(r => setWorkshop(r.data))
                .catch((error) => console.error(error))
        }
    }, [order])

    return (!props.isFetching && workshop ?
            <>
                {order ?
                    <Box>
                        <OrderForm workshop={workshop}
                                   bikes={props.bikes}
                                   orders={props.orders}
                                   orderToEdit={order}
                                   updateOrderList={props.updateOrderList}
                                   mapApiKey={props.mapApiKey}
                                   isFetching={props.isFetching}/>
                    </Box>:
                    <InvalidId/>
                }
            </>:
            <LoadingScreen/>
    )
}
