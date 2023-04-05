import {Autocomplete, Box, Button, Paper, TextField, Typography} from "@mui/material";
import React, {FormEvent} from "react";
import ComponentFormDialog from "../../Dialog/ComponentFormDialog";
import ComponentTable from "../ComponentTable/ComponentTable";
import useEditComponents from "../../Hooks/useEditComponents";
import axios from "axios";
import useEditWorkshop from "../../Hooks/useEditWorkshop";
import {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";

type EditWorkshopFormProps = {
    user: User | null
    workshops: Workshop[]
    updateWorkshopList(workshops: Workshop[]): void
}
export default function EditWorkshopForm(props: EditWorkshopFormProps){
    const navigate = useNavigate()
    const {
        components,
        services,
        workshopName,
        addComponentDialogOpen,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleWorkshopNameChange,
        handleSetComponents}
        = useEditWorkshop({username: props.user?.username || ""})
    const {handleDeleteComponent}
        = useEditComponents({components: components, handleSetComponents: handleSetComponents})

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.post("/api/workshops/", {name: workshopName, services: services, inventory: components})
            .then(r=> r.data)
            .then((newWorkshop)=>props.updateWorkshopList([...props.workshops, newWorkshop]))
            .then(()=> navigate("/"))
            .catch((error) => console.error(error))
    }
    return (
        <>
            <Box sx={{mt: 1, mb: 1}} component="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    label={"Workshop Name"}
                    fullWidth
                    margin={"normal"}
                    onChange={handleWorkshopNameChange}
                    defaultValue={workshopName}
                />
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    freeSolo
                    aria-required={true}
                    options={[]}
                    onChange={handleServicesChange}
                    id="select-components"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Specify services you offer"
                            placeholder="Services"
                        />
                    )}
                />
                <Box sx={{mt: 2, p: 1}} component={Paper}>
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mb: 1}}>
                        Components on Offer
                    </Typography>
                    <ComponentTable components={components}
                                    handleDeleteComponent={handleDeleteComponent}
                                    showAge={false}/>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={()=>handleSetOpenAddComponentsDialog()}>
                        Add Item to Inventory
                    </Button>
                    <ComponentFormDialog components={components}
                                         handleSetComponents={handleSetComponents}
                                         open={addComponentDialogOpen}
                                         handleSetOpenAddComponentsDialog={handleSetOpenAddComponentsDialog}
                                         keepMounted />
                </Box>
                <Button type="submit"
                        variant={"contained"}
                        sx={{mt:2, width: 1}}
                        disabled={workshopName==="" || services.length<1}>
                    Register your Workshop
                </Button>
            </Box>
        </>
    )
}
