import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import React, {useEffect} from "react";
import useAuth from "../../Hooks/useAuth";
import {Box, Typography} from "@mui/material";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {useNavigate} from "react-router-dom";

type SetUpWorkshopsProps = {
    mapApiKey: string
}
export default function SetUpWorkshop(props: SetUpWorkshopsProps){
    const user = useAuth(true)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user && user?.role !== "WORKSHOP") {
            navigate("/")
        }},[user, navigate])

    return (
        <>
            {user && user?.role === "WORKSHOP" ?
                <Box>
                    <ResponsiveAppBar/>
                    <Typography variant={"h6"} sx={{mt: 1}}>
                        Welcome to LeetRepair! <br/> Tell us more about your Business
                    </Typography>
                    <EditWorkshopForm user={user} mapApiKey={props.mapApiKey}/>
                </Box>:
                <LoadingScreen/>
            }
        </>
    )
}
