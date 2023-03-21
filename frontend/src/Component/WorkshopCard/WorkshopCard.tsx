import {Workshop} from "../../model/Workshop";
import {Card, CardContent, Typography} from "@mui/material";
import React from "react";

type Props = {
    workshop: Workshop
}
export default function WorkshopCard(props: Props) {
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" fontWeight={"medium"}>
                    {props.workshop.name}
                </Typography>
                <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                    Services offered:
                </Typography>
                {props.workshop.services.map(s =>
                    <Typography variant="body1" key={s}>{s}</Typography>
                )}
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