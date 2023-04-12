import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import {Box, Typography} from "@mui/material";
import {Workshop} from "../../model/Workshop";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

type SetUpWorkshopsProps = {
    workshops: Workshop[]
    updateWorkshopList(workshops: Workshop[]): void

}
export default function SetUpWorkshop(props: SetUpWorkshopsProps){
    const user = useAuth(true)

    return (
        <>
            {user ?
                <>
                    <ResponsiveAppBar/>
                    <Box sx={{m: 2, p: 1}}>
                        <Typography variant={"h6"}>Welcome to LeetRepair! <br/> Tell us more about your Business</Typography>
                        <EditWorkshopForm  workshops={props.workshops} updateWorkshopList={props.updateWorkshopList}
                                           user={user}/>
                    </Box>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
