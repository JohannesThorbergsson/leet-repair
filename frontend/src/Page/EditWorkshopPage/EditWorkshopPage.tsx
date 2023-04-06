import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import useAuth, {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";
import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {useEffect, useState} from "react";

type EditWorkshopPageProps = {
    user: User | null
    workshops: Workshop[]
    isFetching: boolean
    updateWorkshopList(workshops: Workshop[]): void
}
export default function EditWorkshopPage(props: EditWorkshopPageProps){
    useAuth(true)
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop = props.workshops.find(workshop=> workshop.id===workshopId)
    const [loadComponent, setLoadComponent] = useState(false)
    useEffect(()=>{
        if(props.isFetching) {
            setLoadComponent(true)
        }}, [props.isFetching]
    )
    console.log(props.isFetching)
    return (
        <>
            {!props.isFetching && workshop ?
                <>
                    <ResponsiveAppBar/>
                    <Box sx={{m:2, p: 1 }}>
                        <Typography variant={"h4"} fontWeight={"medium"} sx={{}}>Your Workshop</Typography>
                        <EditWorkshopForm user={props.user}
                                          workshops={props.workshops}
                                          workshopToEdit={workshop}
                                          updateWorkshopList={props.updateWorkshopList}/>
                    </Box>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
