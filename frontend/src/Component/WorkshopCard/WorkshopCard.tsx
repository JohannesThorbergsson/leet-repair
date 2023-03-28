import {Workshop} from "../../model/Workshop";
import {Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";

type Props = {
    workshop: Workshop
}

export default function WorkshopCard(props: Props) {
    const navigate = useNavigate()
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
                <ComponentTable components={props.workshop.inventory} showAge={false}/>
                <Button variant={"contained"} sx={{mt: 1}}
                        onClick={() => navigate("/workshops/orders/"+props.workshop.id)}>
                    Book Services
                </Button>
            </CardContent>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                p: 0,
                boxShadow: 1
            }}>{card}</Card>
        </div>
    )
}
