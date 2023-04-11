import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import {User} from "../Hooks/useAuth";
import {Component} from "../model/Component";
import {Box, TextField, Typography} from "@mui/material";
import EditComponents from "../Component/EditComponents/EditComponents";
import useUpdateOrderStatusDialog from "../Hooks/useUpdateOrderStatusDialog";

export type UpdateOrderStatusDialogProps = {
    id: string
    keepMounted: boolean
    status: string
    description: string
    components: Component[]
    open: boolean
    saveChanges: boolean
    user: User | null
    handleSave(): void
    handleSetStatus(newStatus: string): void
    handleSetDescription(newDescription: string): void
    handleSetComponents(components: Component[]): void
    handleUpdateStatusDialogSetOpen(): void
}
export default function UpdateOrderStatusDialog(props: UpdateOrderStatusDialogProps) {
    const {
        radioGroupRef,
        status,
        description,
        components,
        options,
        handleEntering,
        handleOk,
        handleChangeStatus,
        handleInputDescription,
        handleSetComponents
    } = useUpdateOrderStatusDialog(props)

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={props.open}
            id={props.id}
            keepMounted={props.keepMounted}
        >
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="Order Status"
                    name="Order Status"
                    value={status}
                    onChange={handleChangeStatus}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            value={option}
                            key={option}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>
                {(status === "Ready for Pickup" && props.user?.role === "WORKSHOP") &&
                    <Box>
                        <TextField
                            required
                            multiline
                            onChange={handleInputDescription}
                            value={description}
                            id="outlined-required"
                            label="Order Description"
                            fullWidth
                            sx={{mt: 2, mb: 1}}
                        />
                        <Typography variant="subtitle1" component="h6" fontWeight={"medium"} sx={{textAlign: 'center'}}>
                            Installed Components
                        </Typography>
                        <EditComponents components={components}
                                        handleSetComponents={handleSetComponents}/>
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleUpdateStatusDialogSetOpen}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
