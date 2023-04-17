import {Workshop} from "../../model/Workshop";
import React from "react";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import OrderForm from "../../Component/OrderForm/OrderForm";
import useAuth from "../../Hooks/useAuth";

export type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    mapApiKey: string
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: OrderFormProps){
    useAuth(true)

    return (
        <OrderForm workshops={props.workshops} bikes={props.bikes} orders={props.orders}
                   updateOrderList={props.updateOrderList} mapApiKey={props.mapApiKey}/>
    )
}
