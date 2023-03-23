import {
    Box,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import React from "react";
import {v4 as uuidv4} from "uuid"
import useAddBike from "../../Hooks/useAddBike";
import EditComponents from "../../Component/EditComponents/EditComponents";
import TableHeadComponentTable from "../../Component/TableHeadComponentTable/TableHeadComponentTable";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {useNavigate} from "react-router-dom";

export default function AddBikeForm() {
    const navigate = useNavigate()
    const { mileageFieldValue, components, newComponentAge, newComponentModel, newComponentCategory,
        mileage, modelName, newComponentAgeValue, services,
        handleDeleteComponent,
        handleInputComponentAge,
        handleInputMileage,
        handleInputModelName,
        handleInputComponentModel,
        handleInputComponentName,
        handleSubmitNewComponent,
        handleSubmitBike,
        handleCancel} = useAddBike()
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Typography variant={"h4"} sx={{m: 1}}>New Bike</Typography>
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
                        label="Model Name"
                        fullWidth
                        onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        error={!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!==""}
                        helperText={(!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!=="")
                            && "Must be a numeric value"}
                        onChange={handleInputMileage}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                        }}
                        sx={{mt: 1}}
                    />
                </Box>
                <Box sx={{
                    justifyContent: 'start',
                    display: 'flex',
                    flexDirection: 'column',}}>
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
                    <EditComponents
                        components={components}
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
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {services.map(service => <ServiceCard key={uuidv4()} service={service}/>)}
                    <Button variant={"contained"} sx={{mt: 1}} onClick={()=> navigate("/bikes/edit-form/add-service")}>
                        Add Service
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    mt: 1
                }}>
                    <Button variant={"contained"} onClick={handleSubmitBike}
                        disabled ={modelName==="" || mileage===undefined || !/^\d+$/.test(mileageFieldValue.trim())}
                    >Save</Button>
                    <Button variant={"contained"} onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}
