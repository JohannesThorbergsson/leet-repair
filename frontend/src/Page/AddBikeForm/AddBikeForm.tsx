import {
    Box,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveAppBar from "../../ResponsiveAppBar";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {Component} from "../../model/Component";
import axios from "axios";

export default function AddBikeForm() {
    const[mileage, setMileage] = useState<number | undefined>()
    const[mileageFieldValue, setMileageFieldValue] = useState("")
    const[modelName, setModelName] = useState("")
    const[components, setComponents] = useState<Component[]>([])
    const[newComponentCategory, setNewComponentCategory] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number | undefined>()

    function handleInputModelName(event: ChangeEvent<HTMLInputElement>){
        setModelName(event.target.value)
    }
    function handleInputMileage(event: ChangeEvent<HTMLInputElement>) {
        setMileageFieldValue(event.target.value)
        if(/^\d+$/.test(event.target.value)) {
            setMileage(Number(event.target.value))
        }
    }
    function handleInputComponentName(event: ChangeEvent<HTMLInputElement>){
        setNewComponentCategory(event.target.value)
    }
    function handleInputComponentModel(event: ChangeEvent<HTMLInputElement>) {
        setNewComponentModel(event.target.value)
    }
    function handleInputComponentAge(event: ChangeEvent<HTMLInputElement>){
        if(/^\d+$/.test(event.target.value)) {
            setNewComponentAge(Number(event.target.value))
        }
    }
    function handleSubmitNewComponent(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        setComponents([...components,
            {category: newComponentCategory, type: newComponentModel, ageKm: newComponentAge}])
        setNewComponentAge(0)
        setNewComponentModel("")
        setNewComponentCategory("")
    }
    function handleDeleteComponent(component: Component) {
        setComponents(components.filter((c => c.type !== component.type)))
    }
    function handleSubmitBike(){
        axios.post("/api/bikes/",
            {modelName: modelName, mileage: mileage, components: components})
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
                        onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        error={!/^\d+$/.test(mileageFieldValue)}
                        helperText={!/^\d+$/.test(mileageFieldValue) && "Must be a numeric value"}
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
                            <TableHead>
                                <TableRow>
                                    <TableCell>Component</TableCell>
                                    <TableCell align="left">Model</TableCell>
                                    <TableCell align="right">Age (km)</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {components.map((component) => (
                                    <TableRow
                                        key={Math.random().toString(16).slice(2)}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {component.category}
                                        </TableCell>
                                        <TableCell align="left">{component.type}</TableCell>
                                        <TableCell align="right">{component.ageKm}</TableCell>
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
                    <Box component={"form"} onSubmit={handleSubmitNewComponent} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                mt: 1}}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Component"
                                fullWidth
                                error = {components.filter(c => c.category === newComponentCategory).length!==0}
                                helperText={components.filter(c => c.category === newComponentCategory).length!==0
                                    && "Must be unique"}
                                value={newComponentCategory}
                                sx={{mt: 1, mr: 1}}
                                onChange={handleInputComponentName}
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
                                value={newComponentAge}
                                sx={{mt: 1}}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={handleInputComponentAge}
                            />
                        </Box>
                        <Button variant={"contained"} type={"submit"} sx={{mt: 1}}
                            disabled={components.filter(c => c.category === newComponentCategory).length!==0}
                        >Add Component</Button>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    mt: 1
                }}>
                    <Button variant={"contained"} onClick={handleSubmitBike}
                        disabled ={modelName==="" || mileage===undefined || !/^\d+$/.test(mileageFieldValue)}
                    >Save</Button>
                    <Button variant={"contained"}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}