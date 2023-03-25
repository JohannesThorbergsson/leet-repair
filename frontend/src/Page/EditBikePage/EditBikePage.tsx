import {Bike} from "../../model/Bike";
import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import {Box, Typography} from "@mui/material";

type EditBikePageProps = {
    bikes: Bike[]
    updateBikeList(bikes: Bike[]): void
}
export default function EditBikePage(props: EditBikePageProps){
    useAuth(true)
    const { bikeId } = useParams<{ bikeId: string }>()
    const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);
    return (
        <>
            <ResponsiveAppBar/>
            {bike?
                <Box>
                    <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{mt: 1}}>
                        {bike?.modelName}
                    </Typography>
                    <EditBikeForm editMode={true} bikes={props.bikes} updateBikeList={props.updateBikeList} bikeToEdit={bike}/>
                </Box>:
                <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{mt: 3}}>Invalid id</Typography>
            }
        </>
    )
}