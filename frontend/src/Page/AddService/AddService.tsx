import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditComponents from "../../Component/EditComponents/EditComponents";
import useAddBike from "../../Hooks/useAddBike";
import TableHeadComponentTable from "../../Component/TableHeadComponentTable/TableHeadComponentTable";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddService() {
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const {components,
        handleDeleteComponent,
        handleSubmitNewComponent,
        handleInputComponentName,
        handleInputComponentAge,
        handleInputComponentModel,
        newComponentCategory,
        newComponentAge,
        newComponentModel,
        newComponentAgeValue} = useAddBike()

    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>){
        setWorkshopName(event.target.value)
    }
    function handleInputDate(event: ChangeEvent<HTMLInputElement>){
        setDate(event.target.value)
    }
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Typography variant={"h4"} sx={{m: 1}}>Document a service</Typography>
            </Box>
            <Box sx={{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                m: 1,
                p: 2
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
                        onChange={handleInputDescription}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Workshop name"
                        fullWidth
                        onChange={handleInputWorkshopName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        onChange={handleInputDate}
                        sx={{mt: 1}}
                    />
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Installed Components</Typography>
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
                                    handleSubmitNewComponent={handleSubmitNewComponent}
                                    handleInputComponentName={handleInputComponentName}
                                    handleInputComponentModel={handleInputComponentModel}
                                    handleInputComponentAge={handleInputComponentAge}
                                    newComponentCategory={newComponentCategory}
                                    newComponentModel={newComponentModel}
                                    newComponentAge={newComponentAge}
                                    newComponentAgeValue={newComponentAgeValue}/>
                </Box>
            </Box>
        </>
    )
}
