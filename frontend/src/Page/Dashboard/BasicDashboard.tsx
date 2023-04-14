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
import DashboardBottomNav from "../../Component/BottomNavBar/DashboardBottomNav";

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
    } = useWorkshops({workshops: props.workshops})

    return (user &&
        <>
            <ResponsiveAppBar/>
            <Box sx={{pb: '80px'}}>
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
                    <OrderGallery bikes={props.bikes}
                                  orders={props.orders}
                                  updateBikeList={props.updateBikeList}
                                  updateOrderList={props.updateOrderList}
                                  user={user}
                    />
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
                    </Box>
                }
            </Box>
            <DashboardBottomNav user={user} isSearch={isSearch} closeSearch={closeSearch}/>
        </>
    )
}
