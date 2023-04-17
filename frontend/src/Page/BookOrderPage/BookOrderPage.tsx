import {Workshop} from "../../model/Workshop";
import React from "react";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import OrderForm from "../../Component/OrderForm/OrderForm";
import useAuth from "../../Hooks/useAuth";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {useLocation, useNavigate} from "react-router-dom";

export type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    mapApiKey: string
    isFetching: boolean
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: OrderFormProps){
    useAuth(true)
    const location = useLocation()
    const navigate = useNavigate()
    if(!location.state?.workshop) {
        navigate("/")
    }

    return (
        <>
            {!props.isFetching && location.state ?
                <OrderForm workshops={props.workshops}
                           bikes={props.bikes}
                           orders={props.orders}
                           updateOrderList={props.updateOrderList}
                           mapApiKey={props.mapApiKey}
                           isFetching={props.isFetching}/>:
                <LoadingScreen/>
            }
        </>
    )
}
