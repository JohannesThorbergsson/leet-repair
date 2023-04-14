import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useLocation, useNavigate} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import useOrderForm from "../../Hooks/useOrderForm";
import OrderForm from "../../Component/OrderForm/OrderForm";
import useAuth from "../../Hooks/useAuth";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    mapApiKey: string
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: OrderFormProps){
    useAuth(true)
    const location = useLocation()
    const navigate = useNavigate()
    const {orderFormState} = useOrderForm(props)

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
            {orderFormState.workshopNewOrder &&
                <WorkshopCard workshop={orderFormState.workshopNewOrder}
                              displayMode={true}
                              mapApiKey={props.mapApiKey}/>
            }
            <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                Book Services:
            </Typography>
            <OrderForm workshops={props.workshops} bikes={props.bikes} orders={props.orders}
                       updateOrderList={props.updateOrderList}/>
            <Button sx={{mt: 2, width: 92/100}}
                    variant={"contained"}
                    onClick={()=>navigate("/", {state: {searchTerm: location.state.searchTerm}})}>
                Back
            </Button>
        </>
    )
}
