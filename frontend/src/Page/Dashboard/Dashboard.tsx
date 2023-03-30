import useAuth from "../../Hooks/useAuth";
import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {ServiceOrder} from "../../model/ServiceOrder";
import OrderCard from "../../Component/OrderCard/OrderCard";
import {Workshop} from "../../model/Workshop";

type DashboardProps = {
    orders: ServiceOrder[]
    workshops: Workshop[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function Dashboard(props: DashboardProps) {
    const user = useAuth(true)
    const navigate = useNavigate()
    const {searchHandler, searchResults, search, closeSearch, searchTerm, handleSearchTerm}
        = useWorkshops({workshops: props.workshops})
    let OrderGallery =
        (props.orders.length>0 && props.orders.map ?
            <Box>
                <Typography variant="h4" component="h4" fontWeight={"bold"}>Active Orders:</Typography>
                {props.orders.map(order =>
                    <OrderCard key={order.id}
                               order={order}
                               orders={props.orders}
                               updateOrderList={props.updateOrderList}/>)}
            </Box>:
            <Typography variant="h4" component="h4" fontWeight={"bold"}>No Active Orders</Typography>
        )

    function handleManageBikesButton(){
        navigate("/bikes")
    }
    return (user &&
        <>
            <ResponsiveAppBar/>
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
            <TextField placeholder="Search for services" value={searchTerm}
                        onChange={handleSearchTerm} />
            <Button type={"submit"} variant="contained" disabled={searchTerm.trim().length===0}>Search</Button>
            </Box>
            {!search?
                <Box>
                    <Box>{OrderGallery}</Box>
                    <Button variant="contained" onClick={handleManageBikesButton} sx={{mt: 2}}>Manage Bikes</Button>
                </Box>
                :
                <Box>
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
