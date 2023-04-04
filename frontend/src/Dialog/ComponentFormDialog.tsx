import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import {Component} from "../model/Component";
import useEditComponents from "../Hooks/useEditComponents";
import AddComponentInput from "../Component/AddComponentInput/AddComponentInput";

type ComponentFormDialogProps = {
    components: Component[]
    handleSetComponents(components: Component[]): void
    handleSetOpenAddComponentsDialog(): void
    open: boolean
    keepMounted: boolean
}
export default function ComponentFormDialog(props: ComponentFormDialogProps){
    const {
        newComponentModel,
        newComponentCategory,
        newComponentAge,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleInputComponentAge,
        handleSubmitNewComponent
    } = useEditComponents({components: props.components, handleSetComponents: props.handleSetComponents})
    function submit(){
        handleSubmitNewComponent()
        props.handleSetOpenAddComponentsDialog()
    }
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            open={props.open}
            keepMounted={props.keepMounted}
        >
            <DialogTitle>Add an Item to your Inventory</DialogTitle>
            <DialogContent dividers>
                <AddComponentInput dialogMode
                                   components={props.components}
                                   handleInputComponentAge={handleInputComponentAge}
                                   handleInputComponentCategory={handleInputComponentCategory}
                                   handleInputComponentModel={handleInputComponentModel}
                                   newComponentAge={newComponentAge}
                                   newComponentCategory={newComponentCategory}
                                   newComponentModel={newComponentModel}/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleSetOpenAddComponentsDialog}>
                    Cancel
                </Button>
                <Button onClick={submit}
                        disabled={newComponentModel==="" || newComponentCategory===""}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
