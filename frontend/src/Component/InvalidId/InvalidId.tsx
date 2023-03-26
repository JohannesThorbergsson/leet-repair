import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function InvalidId(){
    const navigate = useNavigate()
    return (
            <Box>
                <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{m: 3}}>Invalid Bike ID</Typography>
                <Button variant={"contained"} onClick={() => navigate("/bikes")}>Back</Button>
            </Box>
        )
}