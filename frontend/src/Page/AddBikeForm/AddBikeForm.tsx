import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import React, {ChangeEvent, useState} from "react";
import {v4 as uuidv4} from "uuid"
import useAddBike from "../../Hooks/useAddBike";
import EditComponents from "../../Component/EditComponents/EditComponents";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {useNavigate} from "react-router-dom";
import AddService from "../AddService/AddService";

export default function AddBikeForm() {
    const navigate = useNavigate()
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const { mileageFieldValue, components, newComponentAge, newComponentModel, newComponentCategory,
        mileage, modelName, newComponentAgeValue, services,
        handleDeleteComponent,
        handleInputComponentAge,
        handleInputMileage,
        handleInputModelName,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleSubmitNewComponent,
        handleSubmitBike,
        handleCancel} = useAddBike()

    function handleSubmitReplacedComponent(){

    }
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

                    <EditComponents
                        components={components}
                        handleDeleteComponent={handleDeleteComponent}
                        handleSubmitNewComponent={handleSubmitNewComponent}
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
                    <AddService handleInputDate={handleInputDate}
                                handleInputDescription={handleInputDescription}
                                handleInputWorkshopName={handleInputWorkshopName}/>
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
