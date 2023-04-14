import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import {ServiceOrder} from "../../model/ServiceOrder";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Typography} from "@mui/material";
import React from "react";
import InvalidId from "../../Component/InvalidId/InvalidId";
import OrderForm from "../../Component/OrderForm/OrderForm";
import {OrderFormProps} from "../BookOrderPage/BookOrderPage";

export default function EditOrderPage(props: OrderFormProps){
    useAuth(true)
    const {orderId} = useParams<{orderId: string}>()
    const order: ServiceOrder | undefined = props.orders.find(order => order.id === orderId)
    const workshop = props.workshops.find(
        (workshop) => order?.workshop === workshop.name)

    return (
        <>
            <ResponsiveAppBar/>
            {order?
                <Box>
                    <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{mt: 1}}>
                        Edit your Order
                    </Typography>
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
