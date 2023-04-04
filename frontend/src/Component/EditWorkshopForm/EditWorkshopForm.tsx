import {Autocomplete, Box, Button, Paper, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, SyntheticEvent} from "react";
import {Component} from "../../model/Component";
import ComponentFormDialog from "../../Dialog/ComponentFormDialog";
import ComponentTable from "../ComponentTable/ComponentTable";
import useEditComponents from "../../Hooks/useEditComponents";

type EditWorkshopFormProps = {
    username: string
    components: Component[]
    addComponentDialogOpen: boolean
    handleSetComponents(components: Component[]): void
    handleSetOpenAddComponentsDialog(): void
    handleServicesChange(event: SyntheticEvent, value: string[]): void
    handleWorkshopNameChange(event: ChangeEvent<HTMLInputElement>): void
}
export default function EditWorkshopForm(props: EditWorkshopFormProps){
    const {handleDeleteComponent}
        = useEditComponents({components: props.components, handleSetComponents: props.handleSetComponents})

    return (
        <>
            <Box sx={{mt: 1, mb: 1}}>
                <Typography variant={"h6"}>Tell us more about your Business</Typography>
                <TextField
                    required
                    label={"Workshop Name"}
                    fullWidth
                    margin={"normal"}
                    onChange={props.handleWorkshopNameChange}
                    defaultValue={props.username}
                />
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    freeSolo
                    options={[]}
                    onChange={props.handleServicesChange}
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
                    <ComponentTable components={props.components}
                                    handleDeleteComponent={handleDeleteComponent}
                                    showAge={false}/>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={()=>props.handleSetOpenAddComponentsDialog()}>
                        Add Item to Inventory
                    </Button>
                    <ComponentFormDialog components={props.components}
                                         handleSetComponents={props.handleSetComponents}
                                         open={props.addComponentDialogOpen}
                                         handleSetOpenAddComponentsDialog={props.handleSetOpenAddComponentsDialog}
                                         keepMounted />
                </Box>
            </Box>
        </>
    )
}
