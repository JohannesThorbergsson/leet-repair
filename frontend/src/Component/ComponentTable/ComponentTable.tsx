import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";

type ComponentTableProps = {
    components: Component[]
}
export default function ComponentTable(props: ComponentTableProps) {
    return (
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
                    {props.components.map((component) => (
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
    )
}