import useAuth from "../../Hooks/useAuth";
import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";

export default function Dashboard() {
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
                <div>
                    <h1>Dashboard</h1>
                    <Button variant="contained" onClick={handleManageBikesButton}>Manage Bikes</Button>
                </div>
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
