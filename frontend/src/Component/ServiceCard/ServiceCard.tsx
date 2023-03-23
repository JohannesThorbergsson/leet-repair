import {ServiceEvent} from "../../model/ServiceEvent";
import React from "react";
import {
    Box,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

type ServiceCardProps = {
    service: ServiceEvent
}

export default function ServiceCard(props: ServiceCardProps){
    const card = (
        <React.Fragment>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    pt: 1
                }}>
                    <Typography variant="h6" fontWeight={"medium"}>
                        {props.service.description}
                    </Typography>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"} sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {props.service.date}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    New parts installed:
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Component</TableCell>
                                <TableCell align="left">Model</TableCell>
                                <TableCell align="right">Age (km)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.service.newComponents.map((component) => (
                                <TableRow
                                    key={component.category}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {component.category}
                                    </TableCell>
                                    <TableCell align="left">{component.type}</TableCell>
                                    <TableCell align="right">{component.age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                    {"Serviced by: " + props.service.workshopName}
                </Typography>
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