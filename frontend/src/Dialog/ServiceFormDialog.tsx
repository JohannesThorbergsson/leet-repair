import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import AddService from "../Component/AddService/AddService";
import {ServiceEvent} from "../model/ServiceEvent";
import {EditBikeFormState} from "../Reducer/editBikeFormReducer";
import {Component} from "../model/Component";
import useEditServices from "../Hooks/useEditServices";

export type ServiceFormDialogProps = {
    handleSetServices(services: ServiceEvent[]): void
    editBikeFormState: EditBikeFormState
    handleSetInstalledComponents(components: Component[]): void
    handleOpenServiceFormDialog(): void
    editMode: boolean
    open: boolean
    keepMounted: boolean
    id: string
    scrollToBottom? (): void
}
export default function ServiceFormDialog(props: ServiceFormDialogProps){
    const {
        handleInputWorkshopName,
        handleInputDescription,
        handleInputDate,
        handleSetNewComponents,
        handleSubmitService,
        newBikeComponents,
        description,
        workshopName,
        date
    } = useEditServices(props)

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            open={props.open}
            id={props.id}
            keepMounted={props.keepMounted}
        >
            <DialogTitle>Document a Service</DialogTitle>
            <DialogContent dividers>
                <AddService services={props.editBikeFormState.services}
                            newBikeComponents={newBikeComponents}
                            date={date}
                            description={description}
                            workshopName={workshopName}
                            handleSetServices={props.handleSetServices}
                            handleSetNewComponents={handleSetNewComponents}
                            handleInputDate={handleInputDate}
                            handleInputDescription={handleInputDescription}
                            handleInputWorkshopName={handleInputWorkshopName}
                            handleSubmitService={handleSubmitService}/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleOpenServiceFormDialog}>
                    Cancel
                </Button>
                <Button onClick={handleSubmitService}
                        disabled={description==="" || workshopName==="" || date ===""}>
                            Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
