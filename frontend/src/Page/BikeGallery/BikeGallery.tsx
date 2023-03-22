import useBikes from "../../Hooks/useBikes";
import BikeCard from "../../Component/BikeCard/BikeCard";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function BikeGallery() {
    useAuth(true)
    const navigate = useNavigate()
    const {bikes} = useBikes()
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
                {bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
            </div>
            <Button variant={"contained"} onClick={()=>navigate("/")}>Dashboard</Button>
        </>
    )
}
