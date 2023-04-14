import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import React from "react";
import {ServiceOrder} from "../../model/ServiceOrder";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import OrderGallery from "../../Component/OrderGallery/OrderGallery";

type BasicDashboardProps = {
    orders: ServiceOrder[]
    workshops: Workshop[]
    bikes: Bike[]
    mapApiKey: string
    updateOrderList(orders: ServiceOrder[]): void
    updateBikeList(bikes: Bike[]): void
}
export default function BasicDashboard(props: BasicDashboardProps) {
    const {
        searchHandler,
        handleSearchTerm,
        closeSearch,
        user,
        searchResults,
        isSearch,
        searchTerm,
        navigate,
    } = useWorkshops({workshops: props.workshops})

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
                <TextField placeholder="Search for workshops"
                           value={searchTerm}
                           onChange={handleSearchTerm}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       {searchTerm !=="" && (
                                           <IconButton onClick={closeSearch}>
                                               <ClearIcon />
                                           </IconButton>
                                       )}
                                   </InputAdornment>
                               ),
                           }}/>
                <Button type={"submit"} variant="contained" disabled={searchTerm.trim().length===0}>Search</Button>
            </Box>
            {!isSearch?
                <Box>
                    <OrderGallery bikes={props.bikes}
                                  orders={props.orders}
                                  updateBikeList={props.updateBikeList}
                                  updateOrderList={props.updateOrderList}
                                  user={user}
                    />
                    <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            mr: 2, ml: 2, mb: 3}}>
                        <Button variant="contained" onClick={()=> navigate("/bikes")} sx={{mt: 2, mr: 1, width: 1/2}}>
                            Manage Bikes
                        </Button>
                        <Button variant={"contained"}
                                sx={{mt: 2, ml: 2, width: 1/2}}
                                onClick={()=>navigate("/orders/archive")}>
                            Archived Orders
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
                                <WorkshopCard key={workshop.id}
                                              searchTerm={searchTerm}
                                              workshop={workshop}
                                              displayMode={false}
                                              mapApiKey={props.mapApiKey}/>)
                    }
                    <Button variant="contained" onClick={closeSearch} sx={{width: 92/100}}>Back</Button>
                </Box>
            }
        </>
    )
}
