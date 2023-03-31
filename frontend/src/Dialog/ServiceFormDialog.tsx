import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React, {useRef} from "react";
import AddService from "../Component/AddService/AddService";
import {ServiceEvent} from "../model/ServiceEvent";
import {EditBikeFormState} from "../Reducer/editBikeFormReducer";
import {Component} from "../model/Component";

type ServiceFormDialogProps = {
    handleSetServices(services: ServiceEvent[]): void
    editBikeFormState: EditBikeFormState
    handleSetInstalledComponents(components: Component[]): void
    editMode: boolean
}
export default function ServiceFormDialog(props: ServiceFormDialogProps){
    const radioGroupRef = useRef<HTMLElement>(null)
    const handleCancel = () => {
        // handleClose()
    }

    const handleOk = () => {
        // props.handleSave()
        // handleClose(status)
    }
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            // TransitionProps={{ onEntering: handleEntering }}
            open={false}
            // id={props.id}
            // keepMounted={props.keepMounted}
        >
            <DialogTitle>Document a Service</DialogTitle>
            <DialogContent dividers>
                <AddService handleSetServices={props.handleSetServices}
                            services={props.editBikeFormState.services}
                            components={props.editBikeFormState.components}
                            handleSetInstalledComponents={props.handleSetInstalledComponents}
                            editMode={props.editMode}/>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="Order Status"
                    name="Order Status"
                    // value={status}
                    // onChange={handleChange}
                >
                    {/*{options.map((option) => (*/}
                    {/*    <FormControlLabel*/}
                    {/*        value={option}*/}
                    {/*        key={option}*/}
                    {/*        control={<Radio />}*/}
                    {/*        label={option}*/}
                    {/*    />*/}
                    {/*))}*/}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}