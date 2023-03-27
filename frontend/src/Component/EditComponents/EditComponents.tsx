import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";
import TableHeadComponentTable from "../TableHeadComponentTable/TableHeadComponentTable";
import DeleteIcon from "@mui/icons-material/Delete";
import useEditComponents from "../../Hooks/useEditComponents";

type EditComponentsProp = {
    components: Component[]
    handleSetComponents(components: Component[]): void
}

export default function EditComponents(props: EditComponentsProp) {
    const {
        handleInputComponentAge,
        handleInputComponentCategory,
        handleInputComponentModel,
        handleDeleteComponent,
        handleSubmitNewComponent,
        newComponentModel,
        newComponentCategory,
        newComponentAge,
        newComponentAgeValue
    } = useEditComponents(props)
    return (
        <>
            <Box sx={{
                justifyContent: 'start',
                display: 'flex',
                flexDirection: 'column',}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <TableContainer component={Paper}>
                        {props.components.length>0?
                            <Table aria-label="simple table">
                                <TableHeadComponentTable cells={[{cellName:"Component", align: undefined},
                                    {cellName:"Model", align:"left"}, {cellName:"Age (km)", align:"right"},
                                    {cellName:"", align: "right"}]}/>
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
                                            <TableCell align="right" sx={{
                                                p: 0,
                                                width: 20
                                            }}>
                                                <DeleteIcon onClick={() =>handleDeleteComponent(component)} sx={{
                                                    alignSelf: 'end',
                                                    cursor: 'pointer',
                                                    color: '#2196f3',
                                                    mr: 1
                                                }}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>:
                            <Typography variant={"subtitle2"} fontWeight={"small"} sx={{mt: 1}}>No Components</Typography>
                        }
                    </TableContainer>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 1}}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Component"
                            fullWidth
                            error = {props.components.filter(c => c.category === newComponentCategory).length!==0}
                            helperText={props.components.filter(c => c.category === newComponentCategory).length!==0
                                && "Must be unique"}
                            value={newComponentCategory}
                            sx={{mt: 1, mr: 1}}
                            onChange={handleInputComponentCategory}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Model"
                            fullWidth
                            value={newComponentModel}
                            sx={{mt: 1, mr: 1}}
                            onChange={handleInputComponentModel}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Age (km)"
                            value={Number.isNaN(newComponentAge)? 0 : newComponentAge}
                            error={!/^\d+$/.test(newComponentAgeValue.trim()) && newComponentAgeValue!==""}
                            helperText={(!/^\d+$/.test(newComponentAgeValue.trim()) && newComponentAgeValue!=="") && "NaN"}
                            sx={{mt: 1}}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={handleInputComponentAge}
                        />
                    </Box>
                    <Button variant={"contained"} onClick={handleSubmitNewComponent} sx={{mt: 1}}
                            disabled={props.components.filter(c => c.category === newComponentCategory).length!==0
                                || newComponentModel===""
                                || newComponentCategory===""}>
                        Add Component
                    </Button>
                </Box>
            </Box>
        </>
    )
}