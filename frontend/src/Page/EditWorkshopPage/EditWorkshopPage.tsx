import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import useAuth, {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {useEffect} from "react";

type EditWorkshopPageProps = {
    user: User | null
    workshops: Workshop[]
    isFetching: boolean
    mapApiKey: string
    updateWorkshopList(workshops: Workshop[]): void
}
export default function EditWorkshopPage(props: EditWorkshopPageProps){
    const user = useAuth(true)
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop = props.workshops.find(workshop=> workshop.id===workshopId)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user && user?.role !== "WORKSHOP") {
            navigate("/")
        }},[user, navigate])

    return (
        <>
            {!props.isFetching && workshop && user && user?.role === "WORKSHOP" ?
                <>
                    <ResponsiveAppBar/>
                    <Box sx={{m:2, p: 1 }}>
                        <Typography variant={"h4"} fontWeight={"medium"} sx={{}}>Your Workshop</Typography>
                        <EditWorkshopForm user={props.user}
                                          workshops={props.workshops}
                                          workshopToEdit={workshop}
                                          updateWorkshopList={props.updateWorkshopList}
                                          mapApiKey={props.mapApiKey}/>
                    </Box>
                </>:
                <LoadingScreen/>
            }
        </>
    )
}
