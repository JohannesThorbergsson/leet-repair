import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import OrderGallery from "../../Component/OrderGallery/OrderGallery";
import DashboardBottomNav from "../../Component/BottomNavBar/DashboardBottomNav";
import axios from "axios";

type WorkshopDashboardProps = {
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const [workshopLoaded, setWorkshopLoaded] = useState(false)
    const [workshop, setWorkshop] = useState()

    useEffect(()=> {
        if(user!==null) {
            axios.get("/api/workshops/" + user.id)
                .then(r => setWorkshop(r.data))
                .catch((error) => console.error(error))
                .finally(()=> setWorkshopLoaded(true))
        }
    }, [user])
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
                        <OrderGallery orders={props.orders} updateOrderList={props.updateOrderList} user={user}/>
                    </Box>
                <DashboardBottomNav user={user} workshop={workshop}/>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
