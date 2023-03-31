import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React, {useRef} from "react";
import AddService from "../Component/AddService/AddService";
import {ServiceEvent} from "../model/ServiceEvent";
import {EditBikeFormState} from "../Reducer/editBikeFormReducer";
import {Component} from "../model/Component";
import {v4 as uuidv4} from "uuid";
import useEditServices from "../Hooks/useEditServices";

type ServiceFormDialogProps = {
    handleSetServices(services: ServiceEvent[]): void
    editBikeFormState: EditBikeFormState
    handleSetInstalledComponents(components: Component[]): void
    handleSubmitService(): void
    editMode: boolean
    open: boolean
    keepMounted: boolean
    id: string
    scrollToBottom?: () => void
}
export default function ServiceFormDialog(props: ServiceFormDialogProps){
    const {
        handleInputWorkshopName,
        handleInputDescription,
        handleInputDate,
        handleSetNewComponents,
        clearInputFields,
        newBikeComponents,
        description,
        workshopName,
        date
    } = useEditServices()
    const radioGroupRef = useRef<HTMLElement>(null)
    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus()
        }
    }
    const handleCancel = () => {
        handleClose()
    }

    const handleSave = () => {
        props.handleSave()
        handleClose(status)
    }
    const handleClose = (newValue?: string) => {
        // props.handleUpdateStatusDialogSetOpen()
        if (newValue) {
            props.handleSetStatus(newValue)
        }
    }
    function handleSubmitService(){
        if(props.scrollToBottom){
            props.scrollToBottom()
        }
        props.handleSetServices([...props.services,
            {description: description, newComponents: newBikeComponents, workshopName:workshopName, date: date, id: uuidv4()}])
        if (props.editMode) {
            const newComponentCategories = new Set(newBikeComponents.map(component => component.category.trim().toLowerCase()))
            props.handleSetInstalledComponents([...props.components.filter(
                oldComponents => !newComponentCategories.has(oldComponents.category.trim().toLowerCase())), ...newBikeComponents])
        }
        clearInputFields()
    }
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={false}
            id={props.id}
            keepMounted={props.keepMounted}
        >
            <DialogTitle>Document a Service</DialogTitle>
            <DialogContent dividers>
                <AddService handleSetServices={props.handleSetServices}
                            services={props.editBikeFormState.services}
                            newBikeComponents={props.editBikeFormState.components}
                            handleSetInstalledComponents={props.handleSetInstalledComponents}
                            editMode={props.editMode}
                            date={date}
                            description={description}
                            workshopName={workshopName}
                            handleInputDate={handleInputDate}
                            handleInputDescription={handleInputDescription}
                            handleInputWorkshopName={handleInputWorkshopName}
                            handleSetNewComponents={handleSetNewComponents}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
