import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import {ServiceOrder} from "../../model/ServiceOrder";
import {Box} from "@mui/material";
import React from "react";
import InvalidId from "../../Component/InvalidId/InvalidId";
import OrderForm from "../../Component/OrderForm/OrderForm";
import {OrderFormProps} from "../BookOrderPage/BookOrderPage";

export default function EditOrderPage(props: OrderFormProps){
    useAuth(true)
    const {orderId} = useParams<{orderId: string}>()
    const order: ServiceOrder | undefined = props.orders.find(order => order.id === orderId)

    return (
        <>
            {order?
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
        </>
    )
}
