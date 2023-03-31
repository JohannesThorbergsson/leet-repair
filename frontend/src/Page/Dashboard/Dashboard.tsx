import useAuth from "../../Hooks/useAuth";
import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {ServiceOrder} from "../../model/ServiceOrder";
import OrderCardWithControls from "../../Component/OrderCard/OrderCardWithControls";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";

type DashboardProps = {
    orders: ServiceOrder[]
    workshops: Workshop[]
    bikes: Bike[]
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}
export default function Dashboard(props: DashboardProps) {
    const user = useAuth(true)
    const navigate = useNavigate()
    const {searchHandler, searchResults, search, closeSearch, searchTerm, handleSearchTerm}
        = useWorkshops({workshops: props.workshops})
    let OrderGallery =
        (props.orders.length>0 ?
            <Box>
                <Typography variant="h4" component="h4" fontWeight={"bold"}>Active Orders:</Typography>
                {props.orders.filter(order=> order.status !== "DONE").map(order =>
                    <OrderCardWithControls key={order.id}
                                           order={order}
                                           orders={props.orders}
                                           updateOrderList={props.updateOrderList}
                                           bikes={props.bikes}
                                           updateBikeList={props.updateBikeList}/>)}
            </Box>:
            <Typography variant="h4" component="h4" fontWeight={"bold"}>No Active Orders</Typography>
        )

    function handleManageBikesButton(){
        navigate("/bikes")
    }
    return (user &&
        <>
            <ResponsiveAppBar/>
            <Box sx={{m: 2}}>
                <Typography variant={"body1"}>
                    Need services or parts for your bike? <br/> Our workshops got you covered!
                </Typography>
            </Box>
            <Box component={'form'} onSubmit={searchHandler} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 2,
                '&:hover': {
                    backgroundColor: '',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}>
                <TextField placeholder="Search for workshops" value={searchTerm}
                            onChange={handleSearchTerm} />
                <Button type={"submit"} variant="contained" disabled={searchTerm.trim().length===0}>Search</Button>
            </Box>
            {!search?
                <Box>
                    <Box>{OrderGallery}</Box>
                    <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            mr: 2, ml: 2, mb: 3}}>
                        <Button variant="contained" onClick={handleManageBikesButton} sx={{mt: 2, mr: 1, width: 1/2}}>
                            Manage Bikes
                        </Button>
                        <Button variant={"contained"}
                                sx={{mt: 2, ml: 2, width: 1/2}}
                                onClick={()=>navigate("/orders/archive")}>
                            Archieved Orders
                        </Button>
                    </Box>
                </Box>
                :
                <Box sx={{mb: 3}}>
                    <Typography variant="h6" fontWeight={"medium"}>Search results:</Typography>
                    {searchResults.length === 0 ?
                        <Typography variant="h6" fontWeight={"medium"}>
                            No workshops matching your search term found
                        </Typography> :
                        searchResults.map(
                            (workshop) =>
                                <WorkshopCard key={workshop.id} workshop={workshop} displayMode={false}/>)
                    }
                    <Button variant="contained" onClick={closeSearch} sx={{width: 92/100}}>Back</Button>
                </Box>
            }
        </>
    )
}
