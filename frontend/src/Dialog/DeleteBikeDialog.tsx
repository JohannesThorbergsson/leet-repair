import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import axios from "axios";
import {Bike} from "../model/Bike";
import {useNavigate} from "react-router-dom";

type DeleteBikeDialogProps = {
    openDeleteDialog: boolean
    handleClickDeleteBike(): void
    bikeToDeleteId: string | undefined
    bikes: Bike[]
    updateBikeList(bikes: Bike[]): void
}
export default function DeleteBikeDialog(props: DeleteBikeDialogProps) {
    const navigate = useNavigate()

    function handleCancel(){
        props.handleClickDeleteBike()
    }
    function handleDelete(){
        axios.delete("/api/bikes/" + props.bikeToDeleteId)
            .then(r => r.data)
            .then(deletedBike => props.updateBikeList([...props.bikes.filter(bike => bike.id !== deletedBike.id)]))
            .then(() => navigate("/bikes"))
            .catch((error) => console.error(error))
    }

    return (
        <Dialog
            open={props.openDeleteDialog}
            onClose={props.handleClickDeleteBike}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Permanently delete bike?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to permanently delete this bike?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button autoFocus sx={{color: 'error.main'}} onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
