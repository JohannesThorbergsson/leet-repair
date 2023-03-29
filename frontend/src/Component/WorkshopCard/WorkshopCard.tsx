import {Workshop} from "../../model/Workshop";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";

type WorkshopCardProps = {
    workshop: Workshop
    displayMode: boolean
}

export default function WorkshopCard(props: WorkshopCardProps) {
    const navigate = useNavigate()
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" fontWeight={"medium"}>
                    {props.workshop.name}
                </Typography>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    Services offered:
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly'
                }} >
                    {props.workshop.services.map(s =>
                        <Box key={s} sx={{
                            m: 0.4,
                            p: 0.4,
                            boxShadow: 2,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            borderColor: 'primary.main',}}>
                            <Typography color={'white'} variant="body1">{s}</Typography>
                        </Box>
                    )}
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    Components in Stock:
                </Typography>
                <ComponentTable components={props.workshop.inventory} showAge={false}/>
                {!props.displayMode &&
                    <Button variant={"contained"} sx={{mt: 1}}
                            onClick={() => navigate("/workshops/orders/"+props.workshop.id)}>
                        Book Services
                    </Button>
                }
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
