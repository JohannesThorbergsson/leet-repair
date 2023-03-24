import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import {Box, Typography} from "@mui/material";
import React from "react";

export default function AddBikePage() {
    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Typography variant={"h4"} sx={{m: 1}}>New Bike</Typography>
            </Box>
            <EditBikeForm/>
        </>
    )
}