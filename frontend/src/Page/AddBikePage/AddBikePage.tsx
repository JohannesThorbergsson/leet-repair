import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import {Box, Typography} from "@mui/material";
import React from "react";
import {Bike} from "../../model/Bike";

type AddBikePageProps = {
    bikes: Bike[]
    updateBikeList(bikes: Bike[]): void
}
export default function AddBikePage(props: AddBikePageProps) {
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
            <EditBikeForm editMode={false} bikes={props.bikes} updateBikeList={props.updateBikeList}/>
        </>
    )
}