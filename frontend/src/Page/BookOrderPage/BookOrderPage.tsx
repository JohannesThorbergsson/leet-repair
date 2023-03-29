import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import useOrderForm from "../../Hooks/useOrderForm";
import OrderForm from "../../Component/OrderForm/OrderForm";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: OrderFormProps){
    const navigate = useNavigate()
    const {workshopNewOrder} = useOrderForm(props)

    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                mt: 2, p: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                    Selected workshop:
                </Typography>
            </Box>
            {workshopNewOrder &&
                <WorkshopCard workshop={workshopNewOrder} displayMode={true}/>
            }
            <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                Book Services:
            </Typography>
            <OrderForm workshops={props.workshops} bikes={props.bikes} orders={props.orders}
                       updateOrderList={props.updateOrderList}/>
            <Button sx={{mt: 2, width: 92/100}} variant={"contained"} onClick={()=>navigate("/")}>Back</Button>
        </>
    )
}
