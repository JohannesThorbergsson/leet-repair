import {Bike} from "../../model/Bike";
import React from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ComponentTable from "../ComponentTable/ComponentTable";

type Props = {
    bike: Bike
}

export default function BikeCard(props: Props) {
    const navigate = useNavigate()
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" fontWeight={"medium"}>
                    {props.bike.modelName}
                </Typography>
                <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                    Mileage: {props.bike.mileage} km
                </Typography>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    Installed Components:
                </Typography>
                <ComponentTable components={props.bike.components}/>
                <Typography variant="subtitle2" component="h6" fontWeight={"small"} sx={{mt: 1}}>
                    {"Recorded services: " + props.bike.services.length}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    pt: 1
                }}>
                    <Button variant="contained" onClick={()=> navigate("/bikes/details/"+props.bike.id)}>
                        Show details
                    </Button>
                    <Button variant="contained" onClick={()=> navigate("/bikes/edit-bike/"+props.bike.id)}>
                        Manage Bike
                    </Button>
                </Box>
            </CardContent>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                boxShadow: 1
            }}>{card}</Card>
        </div>
    )
}
