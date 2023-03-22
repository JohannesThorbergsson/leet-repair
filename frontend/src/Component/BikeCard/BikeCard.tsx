import {Bike} from "../../model/Bike";
import React from "react";
import {
    Box,
    Button,
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
import {useNavigate} from "react-router-dom";

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
                <Typography variant="subtitle2" component="h6" fontWeight={"small"} sx={{mt: 1}}>
                    {"Recorded services: " + props.bike.components.length}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 1
                }}>
                    <Button variant="contained" onClick={()=> navigate("/")}>
                        Show details
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
