import BikeCard from "../../Component/BikeCard/BikeCard";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Bike} from "../../model/Bike";

type Props = {
    bikes: Bike[]
}
export default function BikeGallery(props: Props) {
    useAuth(true)
    const navigate = useNavigate()
    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                p: 2
            }}>
                <Typography variant="h4" component="h4" fontWeight={"bold"}>Your Bikes:</Typography>
                <Button variant={"contained"} onClick={()=>navigate("/bikes/edit-form")}>
                    Add new bike
                </Button>
            </Box>
            <div>
                {props.bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
            </div>
            <Button variant={"contained"} onClick={()=>navigate("/")}>Dashboard</Button>
        </>
    )
}
