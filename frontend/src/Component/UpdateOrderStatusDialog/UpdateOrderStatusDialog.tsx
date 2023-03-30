import * as React from 'react';
import {useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type UpdateOrderStatusDialogProps = {
    id: string
    keepMounted: boolean
    status: string
    open: boolean
    handleUpdateStatus(newStatus: string): void
    handleUpdateStatusDialogSetOpen(): void
}
export default function UpdateOrderStatusDialog(props: UpdateOrderStatusDialogProps) {
    const radioGroupRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!props.open) {
            props.handleUpdateStatus(props.status)
        }
    }, [props])

    const options = [
        'Open',
        'In Progress',
        'Ready for Pickup',
        'Done',
    ]
    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };
    const handleCancel = () => {
        handleClose();
    };

    const handleOk = () => {
        handleClose(props.status);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleUpdateStatus((event.target as HTMLInputElement).value);
    };


    const handleClose = (newValue?: string) => {
        props.handleUpdateStatusDialogSetOpen()
        if (newValue) {
            props.handleUpdateStatus(newValue)
        }
    }

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
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
                    value={props.status}
                    onChange={handleChange}
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
