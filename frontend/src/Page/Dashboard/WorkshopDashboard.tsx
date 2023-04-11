import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import OrderCardWithControls from "../../Component/OrderCard/OrderCardWithControls";
import {Bike} from "../../model/Bike";

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
                    <Box sx={{display:'flex', flexDirection: 'column', alignContent: 'center', m:2}}>
                        {props.orders.length>0?
                            <Box>
                                <Typography variant={"h4"} fontWeight={"medium"} sx={{}}>Active Orders</Typography>
                                <Box>
                                    {props.orders.filter(order=> order.status !== "DONE").map(order =>
                                        <OrderCardWithControls key={order.id}
                                                               order={order}
                                                               user={user}
                                                               bikes={props.bikes}
                                                               orders={props.orders}
                                                               updateBikeList={props.updateBikeList}
                                                               updateOrderList={props.updateOrderList}/>)}
                                </Box>
                            </Box>:
                            <Typography variant={"h4"} fontWeight={"medium"} sx={{mt: 4}}>No Active Orders</Typography>
                        }
                        <Button variant={"contained"}
                                onClick={()=> navigate("/workshops/edit/"+workshop?.id)}
                                sx={{mt: 2}}>
                            Manage Workshop
                        </Button>
                    </Box>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
