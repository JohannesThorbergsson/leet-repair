import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";
import DeleteIcon from "@mui/icons-material/Delete";

type ComponentTableProps = {
    components: Component[]
    handleDeleteComponent? (component: Component): void
}
export default function ComponentTable(props: ComponentTableProps) {
    const deleteFunction = props.handleDeleteComponent || (() => {})
    return (
        <TableContainer component={Paper}>
            {props.components.length>0?
                <Table sx={{ }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Component</TableCell>
                            <TableCell align="left">Model</TableCell>
                            <TableCell align="right">Age (km)</TableCell>
                            {props.handleDeleteComponent &&
                                <TableCell align="right"></TableCell>
                            }
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
                                {props.handleDeleteComponent &&
                                    <TableCell align="right" sx={{
                                    p: 0,
                                    width: 20
                                    }}>
                                        <DeleteIcon onClick={() =>deleteFunction(component)} sx={{
                                        alignSelf: 'end',
                                        cursor: 'pointer',
                                        color: '#2196f3',
                                        mr: 1
                                        }}/>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>:
            <Typography variant={"subtitle2"} fontWeight={"small"} sx={{mt: 1}}>No Components</Typography>
            }
        </TableContainer>
    )
}