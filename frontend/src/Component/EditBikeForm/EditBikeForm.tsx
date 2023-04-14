import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useLayoutEffect, useRef, useState} from "react";
import useEditBikeForm from "../../Hooks/useEditBikeForm";
import ServiceCard from "../ServiceCard/ServiceCard";
import useAuth from "../../Hooks/useAuth";
import {Bike} from "../../model/Bike";
import DeleteBikeDialog from "../../Dialog/DeleteBikeDialog";
import ServiceFormDialog from "../../Dialog/ServiceFormDialog";
import EditFormAppBar from "../ResponsiveAppBar/EditFormAppBar";
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';
import ComponentFormDialog from "../../Dialog/ComponentFormDialog";
import useEditComponents from "../../Hooks/useEditComponents";
import ComponentTable from "../ComponentTable/ComponentTable";

type EditBikeFormProps = {
    editMode: boolean
    bikes: Bike[]
    bikeToEdit?: Bike
    updateBikeList(bikes: Bike[]): void
}
export default function EditBikeForm(props: EditBikeFormProps) {
    useAuth(true)
    const bottomRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const {
        editBikeFormState,
        handleInputMileage,
        handleInputModelName,
        handleSetServices,
        handleSubmitBike,
        handleSetInstalledComponents,
        deleteService,
        handleCancel,
        handleClickDeleteBike,
        scroll
    } = useEditBikeForm(props)
    const {handleDeleteComponent}
        = useEditComponents({components: editBikeFormState.components, handleSetComponents: handleSetInstalledComponents})
    useLayoutEffect(() => {
        if (editBikeFormState.scrollToBottom && bottomRef) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' })
            scroll()
        }
    }, [editBikeFormState.scrollToBottom])

    const [serviceFormOpen, setServiceFormOpen] = useState(false)
    const [componentFormOpen, setComponentFormOpen] = useState(false)
    function handleOpenServiceFormDialog(){
        setServiceFormOpen(!serviceFormOpen)
    }
    function handleOpenComponentFormDialog(){
        setComponentFormOpen(!componentFormOpen)
    }

    return(
        <>
            <EditFormAppBar title={props.bikeToEdit?.modelName ?? "New Bike"}
                            handleCancel={handleCancel}
                            handleSubmitBike={handleSubmitBike}
                            editBikeFormState={editBikeFormState}
                            editMode={props.editMode}/>
            <Box sx={{pb: '80px'}}>
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
                            value={editBikeFormState.modelName}
                            onChange={handleInputModelName}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Mileage"
                            value={Number.isNaN(editBikeFormState.mileage)? "" : editBikeFormState.mileage}
                            error={!/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())
                                && editBikeFormState.mileageFieldValue!==""}
                            helperText={(!/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())
                                && editBikeFormState.mileageFieldValue!=="")
                                && "Must be a positive numeric value"}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">km</InputAdornment>,
                            }}
                            sx={{mt: 1}}
                            onChange={handleInputMileage}
                        />
                    </Box>
                    <Box sx={{
                        justifyContent: 'start',
                        display: 'flex',
                        flexDirection: 'column',}}>
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                            Installed Components
                        </Typography>
                        <ComponentTable components={editBikeFormState.components}
                                        handleDeleteComponent={handleDeleteComponent}
                                        showAge={true}/>
                    </Box>
                    <Box>
                        {editBikeFormState.services.length>0 &&
                            <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                                    Recorded Services
                                </Typography>
                                {editBikeFormState.services.map(service =>
                                    <ServiceCard key={service.id} service={service} deleteService={deleteService}/>)}
                            </Box>
                        }
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        mt: 1
                    }}>
                        {props.editMode &&
                            <Button variant={"contained"}
                                    onClick={handleClickDeleteBike}
                                    sx={{
                                        bgcolor: 'warning.main',
                                        width: 1,
                                            '&:hover': {bgcolor: 'error.main'}}}>
                                Delete Bike
                            </Button>
                        }
                        <ComponentFormDialog
                            components={editBikeFormState.components}
                            handleSetComponents={handleSetInstalledComponents}
                            handleSetOpenAddComponentsDialog={handleOpenComponentFormDialog}
                            open={componentFormOpen}
                            keepMounted/>
                        <ServiceFormDialog
                            handleSetServices={handleSetServices}
                            handleSetInstalledComponents={handleSetInstalledComponents}
                            editMode={props.editMode}
                            editBikeFormState={editBikeFormState}
                            scrollToBottom={scroll}
                            id={"service-form-dialog"}
                            keepMounted
                            open={serviceFormOpen}
                            handleOpenServiceFormDialog={handleOpenServiceFormDialog}/>
                        <DeleteBikeDialog
                            openDeleteDialog={editBikeFormState.openDeleteDialog}
                            handleClickDeleteBike={handleClickDeleteBike}
                            bikeToDeleteId={props.bikeToEdit?.id}
                            bikes={props.bikes}
                            updateBikeList={props.updateBikeList}/>
                    </Box>
                </Box>
                <div ref={bottomRef}></div>
            </Box>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 70}} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={handleOpenServiceFormDialog}
                                            label="Document Service"
                                            icon={<ChecklistIcon fontSize={"large"}/>}/>
                    <BottomNavigationAction onClick={handleOpenComponentFormDialog}
                                            label="Add Component"
                                            icon={<AddIcon fontSize={"large"}/>}/>
                </BottomNavigation>
            </Paper>
        </>
    )
}
