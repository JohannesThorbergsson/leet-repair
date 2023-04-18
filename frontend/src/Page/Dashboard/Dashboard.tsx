import {ServiceOrder} from "../../model/ServiceOrder";
import {Bike} from "../../model/Bike";
import WorkshopDashboard from "./WorkshopDashboard";
import BasicDashboard from "./BasicDashboard";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

type DashboardProps = {
    orders: ServiceOrder[]
    bikes?: Bike[]
    mapApiKey: string
    isFetching: boolean
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList? (bikes: Bike[]): void
}
export default function Dashboard(props: DashboardProps){
    const user = useAuth(true)
    const dashboard = user?.role ==="BASIC" && props.bikes && props.updateBikeList ?
        <BasicDashboard orders={props.orders}
                        updateOrderList={props.updateOrderList}
                        bikes={props.bikes}
                        updateBikeList={props.updateBikeList}
                        mapApiKey={props.mapApiKey}/>:
        <WorkshopDashboard orders={props.orders} updateOrderList={props.updateOrderList}/>
    return (
        <>
            {!props.isFetching && user ?
                dashboard : <LoadingScreen/>
            }
        </>
    )
}
