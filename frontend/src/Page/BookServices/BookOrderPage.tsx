import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useParams} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Box, Button, Typography} from "@mui/material";

type BookOrderPageProps = {
    workshops: Workshop[]
}
export default function BookOrderPage(props: BookOrderPageProps){
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)

    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                mt: 2, p: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                    Selected workshop:
                </Typography>
            </Box>
            {workshop && <WorkshopCard workshop={workshop}/>}
            <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                Book Services:
                {/*//Book services form here*/}
            </Typography>
            <Button variant={"contained"}>Back</Button>
        </>
    )
}