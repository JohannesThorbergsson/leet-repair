import useAuth from "../../Hooks/useAuth";
import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {ServiceOrder} from "../../model/ServiceOrder";
import OrderCard from "../../Component/OrderCard/OrderCard";

type DashboardProps = {
    orders: ServiceOrder[]
}
export default function Dashboard(props: DashboardProps) {
    const user = useAuth(true)
    const navigate = useNavigate()
    const {searchHandler, searchResults, search, closeSearch, searchTerm, handleSearchTerm} = useWorkshops()

    function handleManageBikesButton(){
        navigate("/bikes")
    }
    return (user &&
        <>
            <ResponsiveAppBar/>
            <Box sx={{
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
            <Button variant="contained" onClick={searchHandler} disabled={searchTerm.trim().length===0}>Search</Button>
            </Box>
            {!search?
                <Box>
                    <Typography variant="h4" component="h4" fontWeight={"bold"}>Active Orders:</Typography>
                    {props.orders.map(order => <OrderCard key={order.id} order={order}/>)}
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
                            (workshop) => <WorkshopCard key={workshop.id} workshop={workshop}/>)
                    }
                    <Button variant="contained" onClick={closeSearch}>Back</Button>
                </Box>
            }
        </>
    )
}
