import {Bike} from "../../model/Bike";
import useAuth from "../../Hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import {Typography} from "@mui/material";

type EditBikePageProps = {
    bikes: Bike[]
}
export default function EditBikePage(props: EditBikePageProps){
    useAuth(true)
    const navigate = useNavigate()
    const { bikeId } = useParams<{ bikeId: string }>()
    const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);

    return (
        <>
            <ResponsiveAppBar/>
            <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{mt: 1}}>
                {bike?.modelName}
            </Typography>
            <EditBikeForm/>
        </>
    )
}