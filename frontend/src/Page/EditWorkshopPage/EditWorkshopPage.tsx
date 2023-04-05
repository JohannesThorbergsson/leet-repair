import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import useAuth, {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";

type EditWorkshopPageProps = {
    user: User | null
    workshops: Workshop[]
    updateWorkshopList(workshops: Workshop[]): void
}
export default function EditWorkshopPage(props: EditWorkshopPageProps){
    useAuth(true)
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop = props.workshops.find(workshop=> workshop.id===workshopId)
    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{m:2, p: 1 }}>
                <EditWorkshopForm user={props.user}
                                  workshops={props.workshops}
                                  workshopToEdit={workshop}
                                  updateWorkshopList={props.updateWorkshopList}/>
            </Box>
        </>
    )
}
