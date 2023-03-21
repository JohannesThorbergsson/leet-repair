import {Bike} from "../../model/Bike";
import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import BikeComponent from "./BikeComponent";

type Props = {
    bike: Bike
}

export default function BikeCard(props: Props) {
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
                {props.bike.components.map(c =>
                    <BikeComponent key={c.type} component={c}/>
                )}
            </CardContent>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2
            }}>{card}</Card>
        </div>
    )
}