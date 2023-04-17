import {ServiceOrder} from "../../model/ServiceOrder";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Typography} from "@mui/material";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import OrderCard from "../../Component/OrderCard/OrderCard";
import HomeButtonBottomNav from "../../Component/BottomNavBar/HomeButtonBottomNav";

type OrderArchiveProps = {
    orders: ServiceOrder[]
}

export default function OrderArchive(props: OrderArchiveProps){
    const user = useAuth(true)

    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{display:'flex', flexDirection: 'column', alignContent: 'center', mt:2, pb: '80px'}}>
                {props.orders.filter(order=> order.status==="DONE").length>0?
                    <Box>
                        <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{m:2}}>
                            Completed Orders:
                        </Typography>
                        {props.orders.filter(order=> order.status==="DONE").map(order=>
                            <OrderCard key={order.id} order={order} user={user}/>)}
                    </Box>:
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70vh'}}>
                        <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{}}>
                            No Completed Orders
                        </Typography>
                    </Box>
                }
            </Box>
            <HomeButtonBottomNav/>
        </>
    )
}
