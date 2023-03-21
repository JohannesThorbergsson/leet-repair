import {Container, Typography} from "@mui/material";
import {Component} from "../../model/Component";
import React from "react";

type Props = {
    component: Component
}
export default function BikeComponent(props: Props){


    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'

        }}>
            <Typography variant={"body1"}>
                {props.component.category}
            </Typography>
            <Container sx={{
                justifyContent: 'start',
                p: 0
            }}>
                <Typography variant="body1">
                    Model: {props.component.type}
                </Typography>
            </Container>
            <Typography variant={"body1"}>
                {props.component.ageKm} km
            </Typography>

        </Container>
    )
}