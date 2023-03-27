import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import ComponentTable from "../ComponentTable/ComponentTable";

type OrderCardProps = {
    order: ServiceOrder
}
export default function OrderCard(props: OrderCardProps){
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h4" fontWeight={"medium"}>
                    {props.order.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        Contractor: {props.order.workshop}
                    </Typography>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        Status: {props.order.status}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    New Components:
                </Typography>
                <ComponentTable components={props.order.componentsToReplace}/>
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
