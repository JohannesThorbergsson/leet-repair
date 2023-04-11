import {ServiceOrder} from "../../model/ServiceOrder";
import {Card} from "@mui/material";
import React from "react";
import OrderCardContent from "./OrderCardContent";
import {User} from "../../Hooks/useAuth";

type OrderCardProps = {
    order: ServiceOrder
    user: User | null
}

export default function OrderCard(props: OrderCardProps){
    return (
        <Card variant={"outlined"} sx={{
            m: 2,
            boxShadow: 1}}>
            <OrderCardContent order={props.order} user={props.user}/>
        </Card>
    )
}
