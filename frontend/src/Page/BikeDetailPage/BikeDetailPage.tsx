import {useNavigate, useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {BottomNavigation, BottomNavigationAction, Box, Paper, Typography} from "@mui/material";
import React from "react";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {v4 as uuidv4} from "uuid"
import InvalidId from "../../Component/InvalidId/InvalidId";
import ComponentTable from "../../Component/ComponentTable/ComponentTable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    bikes: Bike[]
}
export default function BikeDetailPage(props: Props) {
    useAuth(true)
    const navigate = useNavigate()
    const { bikeId } = useParams<{ bikeId: string }>()
    const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);
    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{pb: '80px'}}>
                {bike?
                    <Box sx={{
                        border: 2,
                        borderRadius: 1,
                        borderColor: 'primary.main',
                        m: 1,
                        p: 2}}>
                        <Box sx={{
                            display:'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            }}>
                            <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>{bike?.modelName}</Typography>
                            <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>{bike?.mileage + " km"}</Typography>
                        </Box>
                        <Box sx={{
                            justifyContent: 'start',
                            display: 'flex',
                            flexDirection: 'column',}}>
                            <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                                Installed Components
                            </Typography>
                            <ComponentTable components={bike?.components} showAge={true}/>
                        </Box>
                        <Box>
                            <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 2}}>Service history</Typography>
                            {(bike?.services.length === undefined || bike?.services.length<1)?
                                <Typography variant={"h6"}>No services recorded</Typography>:
                            bike.services.map(service =>
                                <ServiceCard key={uuidv4()} service={service} />)}
                        </Box>
                    </Box>:
                    <InvalidId/>
                }
            </Box>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 70}} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={()=>navigate("/bikes")}
                                            label="Back"
                                            icon={<ArrowBackIcon fontSize={"large"}/>}/>
                </BottomNavigation>
            </Paper>
        </>
    )
}
