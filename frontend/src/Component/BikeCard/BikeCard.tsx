import {Bike} from "../../model/Bike";
import React from "react";
import {
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
                <TableContainer component={Paper}>
                    <Table sx={{ }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Component</TableCell>
                                <TableCell align="left">Model</TableCell>
                                <TableCell align="right">Age (km)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.bike.components.map((component) => (
                                <TableRow
                                    key={component.type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {component.category}
                                    </TableCell>
                                    <TableCell align="left">{component.type}</TableCell>
                                    <TableCell align="right">{component.ageKm}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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