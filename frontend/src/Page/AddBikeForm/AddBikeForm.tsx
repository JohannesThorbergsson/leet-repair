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
import ResponsiveAppBar from "../../ResponsiveAppBar";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {Component} from "../../model/Component";

export default function AddBikeForm() {
    const[components, setComponents] = useState<Component[]>([])
    const[newComponentName, setNewComponentName] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number | undefined>()

    function handleInputComponentName(event: ChangeEvent<HTMLInputElement>){
        setNewComponentName(event.target.value)
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
            {category: newComponentName, type: newComponentModel, ageKm: newComponentAge}])
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
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                        }}
                        sx={{mt: 1}}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 1
                }}>
                    <Box sx={{
                        justifyContent: 'start',
                        display: 'flex',
                        flexDirection: 'column',}}>
                        <Typography variant={"subtitle1"} fontWeight={"medium"}>Installed Components</Typography>
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
                                    {components.map((component) => (
                                        <TableRow
                                            key={component.type}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {component.category}
                                            </TableCell>
                                            <TableCell align="left">{component.type}</TableCell>
                                            <TableCell align="right">{component.ageKm}</TableCell>
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
                                    flexDirection: 'row'}}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Component"
                                    fullWidth
                                    sx={{mt: 1, mr: 1}}
                                    onChange={handleInputComponentName}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Model"
                                    fullWidth
                                    sx={{mt: 1, mr: 1}}
                                    onChange={handleInputComponentModel}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Age (km)"
                                    sx={{mt: 1}}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={handleInputComponentAge}
                                />
                            </Box>
                            <Button variant={"contained"} type={"submit"} sx={{mt: 1}}>Add Component</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}