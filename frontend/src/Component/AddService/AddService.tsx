import {Box, Typography} from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";

export default function AddService() {
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                    <Typography variant={"h4"} sx={{m: 1}}>Document a service</Typography>
                </Box>
            <Box sx={{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                m: 1,
                p: 2
            }}>

            </Box>
        </>
    )
}