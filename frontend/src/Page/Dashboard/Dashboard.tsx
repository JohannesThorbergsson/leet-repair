import {ServiceOrder} from "../../model/ServiceOrder";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import WorkshopDashboard from "./WorkshopDashboard";
import BasicDashboard from "./BasicDashboard";
import React from "react";
import useAuth from "../../Hooks/useAuth";

type DashboardProps = {
    orders: ServiceOrder[]
    workshops: Workshop[]
    bikes: Bike[]
    isFetching: boolean
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}
export default function Dashboard(props: DashboardProps){
    const user = useAuth(true)
    const dashboard = user?.role ==="WORKSHOP"?
        <WorkshopDashboard workshops={props.workshops} orders={props.orders}/>:
        <BasicDashboard orders={props.orders}
                        workshops={props.workshops}
                        updateOrderList={props.updateOrderList}
                        bikes={props.bikes}
                        updateBikeList={props.updateBikeList}/>
    return (
        <>
            {props.isFetching && user ?
                dashboard :
                <>Loading</>
            }
        </>
    )
}
