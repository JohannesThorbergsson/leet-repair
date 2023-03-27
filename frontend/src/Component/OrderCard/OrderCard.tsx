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
import {ServiceOrder} from "../../model/ServiceOrder";

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
                            {props.order.componentsToReplace.map((component) => (
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
