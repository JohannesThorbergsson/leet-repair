import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
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

type UpdateOrderStatusDialogProps = {
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
    const radioGroupRef = useRef<HTMLElement>(null)
    const [status, setStatus] = useState(props.status)
    const [description, setDescription] = useState<string>(props.description)
    const [components, setComponents] = useState(props.components)

    useEffect(() => {
        if (!props.open) {
            setStatus(props.status)
        }
    }, [props])

    const options = [
        'Open',
        'In Progress',
        'Ready for Pickup',
        props.user?.role === "BASIC"? 'Done': undefined,
    ].filter((option): option is string =>typeof option === 'string')
    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus()
        }
    }
    const handleCancel = () => {
        handleClose()
    }

    const handleOk = () => {
        props.handleUpdateStatusDialogSetOpen()
        props.handleSave()
        props.handleSetStatus(status)
        props.handleSetDescription(description)
        props.handleSetComponents(components)
    }

    function handleChangeStatus (event: ChangeEvent<HTMLInputElement>){
        setStatus((event.target as HTMLInputElement).value)
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleSetComponents(components: Component[]){
        setComponents(components)
    }

    const handleClose = (newValue?: string) => {
        props.handleUpdateStatusDialogSetOpen()
        if (newValue) {
            props.handleSetStatus(newValue)
        }
    }

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
                <Button autoFocus onClick={handleCancel} >
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}
