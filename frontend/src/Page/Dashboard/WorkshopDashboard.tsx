import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {Bike} from "../../model/Bike";
import OrderGallery from "../../Component/OrderGallery/OrderGallery";
import DashboardBottomNav from "../../Component/BottomNavBar/DashboardBottomNav";

type WorkshopDashboardProps = {
    workshops: Workshop[]
    orders: ServiceOrder[]
    bikes: Bike[]
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const [workshopLoaded, setWorkshopLoaded] = useState(false)
    const [workshop, setWorkshop]
        = useState(props.workshops.find(workshop=>workshop.username=== user?.username))

    useEffect(()=> {
        if(user!==null) {
            setWorkshop(props.workshops.find(workshop=>workshop.id=== user.id))
            setWorkshopLoaded(true)
        }
    }, [props.workshops, user, workshop])
    useEffect(()=>{
        if(user && workshopLoaded && !workshop) {
            navigate("/workshops/setup")
        }
    }, [user, workshop, navigate, workshopLoaded])

    return(
        <>
            {workshop ?
                <>
                <ResponsiveAppBar/>
                    <Box sx={{display:'flex', flexDirection: 'column', alignContent: 'center', m:2, pb: '80px'}}>
                        <OrderGallery bikes={props.bikes}
                                      orders={props.orders}
                                      updateBikeList={props.updateBikeList}
                                      updateOrderList={props.updateOrderList}
                                      user={user}/>
                    </Box>
                <DashboardBottomNav user={user} workshop={workshop}/>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
