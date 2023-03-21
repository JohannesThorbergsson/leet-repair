import useBikes from "../../Hooks/useBikes";
import BikeCard from "../../Component/BikeCard/BikeCard";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {Box, Button, Typography} from "@mui/material";

export default function BikeGallery() {
    useAuth(true)
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
                <Button variant={"contained"}>Add new bike</Button>
            </Box>
            <div>
                {bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
            </div>
        </>
    )
}