import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";

export default function InvalidId(){
    const navigate = useNavigate()
    return (
            <Box>
                <ResponsiveAppBar/>
                <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{m: 3}}>Invalid ID</Typography>
                <Button variant={"contained"} onClick={() => navigate("/bikes")}>Back</Button>
            </Box>
        )
}