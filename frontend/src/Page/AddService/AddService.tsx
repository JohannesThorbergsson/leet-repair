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
import React, {ChangeEvent} from "react";
import EditComponents from "../../Component/EditComponents/EditComponents";
import useAddBike from "../../Hooks/useAddBike";
import TableHeadComponentTable from "../../Component/TableHeadComponentTable/TableHeadComponentTable";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {Component} from "../../model/Component";

type AddServiceProps = {
    handleInputDescription(event: ChangeEvent<HTMLInputElement>): void
    handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>): void
    handleInputDate(event: ChangeEvent<HTMLInputElement>): void
    handleSubmitNewService(): void
    handleSubmitReplacedComponent(): void
}
export default function AddService(props: AddServiceProps) {
    const navigate = useNavigate()
    const {components,
        handleDeleteComponent,
        handleInputComponentCategory,
        handleInputComponentAge,
        handleInputComponentModel,
        newComponentCategory,
        newComponentAge,
        newComponentModel,
        newComponentAgeValue} = useAddBike()


    return(
        <>
            <Box sx = {{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                p: 1,
                mt: 2
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}>
                    <Typography variant={"h6"} sx={{m: 1}}>Document a service</Typography>
                </Box>
                <Box sx={{

                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            fullWidth
                            onChange={props.handleInputDescription}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Workshop name"
                            fullWidth
                            onChange={props.handleInputWorkshopName}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Date"
                            onChange={props.handleInputDate}
                            sx={{mt: 1}}
                        />
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Replaced Components</Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHeadComponentTable cells={[{cellName:"Component", align: undefined},
                                    {cellName:"Model", align:"left"}, {cellName:"Age (km)", align:"right"},
                                    {cellName:"", align: "right"}]}/>
                                <TableBody>
                                    {components.map((component) => (
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
                            </Table>
                        </TableContainer>
                        <EditComponents components={components}
                                        handleDeleteComponent={handleDeleteComponent}
                                        handleSubmitNewComponent={props.handleSubmitReplacedComponent}
                                        handleInputComponentCategory={handleInputComponentCategory}
                                        handleInputComponentModel={handleInputComponentModel}
                                        handleInputComponentAge={handleInputComponentAge}
                                        newComponentCategory={newComponentCategory}
                                        newComponentModel={newComponentModel}
                                        newComponentAge={newComponentAge}
                                        newComponentAgeValue={newComponentAgeValue}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            mt: 1
                        }}>
                            <Button variant={"contained"} onClick={props.handleSubmitNewService}>
                                Save
                            </Button>
                            <Button variant={"contained"} onClick={()=> navigate("/bikes/edit-form")}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
