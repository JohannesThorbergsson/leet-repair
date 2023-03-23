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
import React, {ChangeEvent, useState} from "react";
import {v4 as uuidv4} from "uuid"
import useAddBike from "../../Hooks/useAddBike";
import EditComponents from "../../Component/EditComponents/EditComponents";
import TableHeadComponentTable from "../../Component/TableHeadComponentTable/TableHeadComponentTable";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {useNavigate} from "react-router-dom";
import {ServiceEvent} from "../../model/ServiceEvent";
import {Component} from "../../model/Component";

export default function AddBikeForm() {
    const navigate = useNavigate()
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const[replacedComponentCategory, setReplacedComponentCategory] =useState<string>("")
    const[replacedComponentModel, setReplacedComponentModel] =useState<string>("")
    const[replacedComponentAge, setReplacedComponentAge] =useState<number | undefined>()
    const[replacedComponentAgeValue, setReplacedComponentAgeValue] =useState("")
    const[services, setServices] = useState<ServiceEvent[]>([])
    const[newComponents, setNewComponents] = useState<Component[]>([])
    const { mileageFieldValue, components, newComponentAge, newComponentModel, newComponentCategory,
        mileage, modelName, newComponentAgeValue,
        handleDeleteComponent,
        handleInputComponentAge,
        handleInputMileage,
        handleInputModelName,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleSubmitNewComponent,
        handleSubmitBike,
        handleCancel} = useAddBike()


    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>){
        setWorkshopName(event.target.value)
    }
    function handleInputDate(event: ChangeEvent<HTMLInputElement>){
        setDate(event.target.value)
    }
    function handleSubmitReplacedComponent(){
        setNewComponents([...components,
            {category: newComponentCategory, type: newComponentModel, age: newComponentAge}])
    }
    function handleSubmitNewService() {

    }
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
                        value={modelName}
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
                        handleSubmitNewComponent={handleSubmitReplacedComponent}
                        handleInputComponentCategory={handleInputComponentCategory}
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
                    {/*<AddService handleInputDate={handleInputDate}*/}
                    {/*            handleInputDescription={handleInputDescription}*/}
                    {/*            handleInputWorkshopName={handleInputWorkshopName}*/}
                    {/*            handleSubmitNewService={handleSubmitNewService}*/}
                    {/*            handleSubmitReplacedComponent={handleSubmitReplacedComponent}/>*/}
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
                                <EditComponents components={newComponents}
                                                handleDeleteComponent={handleDeleteComponent}
                                                handleSubmitNewComponent={handleSubmitReplacedComponent}
                                                handleInputComponentCategory={handleInputComponentCategory}
                                                handleInputComponentModel={handleInputComponentModel}
                                                handleInputComponentAge={handleInputComponentAge}
                                                newComponentCategory={replacedComponentCategory}
                                                newComponentModel={replacedComponentModel}
                                                newComponentAge={replacedComponentAge}
                                                newComponentAgeValue={replacedComponentAgeValue}/>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    mt: 1
                                }}>
                                    <Button variant={"contained"} onClick={handleSubmitNewService}>
                                        Save
                                    </Button>
                                    <Button variant={"contained"} onClick={()=> navigate("/bikes/edit-form")}>Cancel</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Button variant={"contained"} sx={{mt: 1}} >
                        Add Service
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    mt: 2
                }}>
                    <Button variant={"contained"} onClick={handleSubmitBike}
                        disabled ={modelName==="" || mileage===undefined || !/^\d+$/.test(mileageFieldValue.trim())}>
                        Save new Bike
                    </Button>
                    <Button variant={"contained"} onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}
