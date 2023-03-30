import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ListItemButton} from "@mui/material";

type UpdateOrderStatusDialogProps = {
    id: string;
    keepMounted: boolean;
    value: string;
    open: boolean;
}
export default function UpdateOrderStatusDialog(props: UpdateOrderStatusDialogProps) {
    const [value, setValue] = useState(props.value);
    const radioGroupRef = useRef<HTMLElement>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setValue(props.value);
        }
    }, [props.value, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };
    const options = [
        'Open',
        'In Progress',
        'Ready for Pickup',
        'Done',

    ]
    const handleCancel = () => {
        handleClose();
    };

    const handleOk = () => {
        handleClose(value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            setValue(newValue)
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="div" role="group">
                <ListItemButton
                    divider
                    aria-haspopup="true"
                    aria-controls="ringtone-menu"
                    aria-label="phone ringtone"
                    onClick={handleClickListItem}
                >
                    <ListItemText primary="Phone ringtone" secondary={value} />
                </ListItemButton>
                <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                    maxWidth="xs"
                    TransitionProps={{ onEntering: handleEntering }}
                    open={open}
                    id={props.id}
                    keepMounted={props.keepMounted}
                >
                    <DialogTitle>Phone Ringtone</DialogTitle>
                    <DialogContent dividers>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={value}
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
            </List>
        </Box>
    )
}
