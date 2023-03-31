import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {ServiceOrder} from "../model/ServiceOrder";
import {useNavigate} from "react-router-dom";
import axios from "axios";

type DeleteOrderDialogProps = {
    openDeleteDialog: boolean
    handleClickDeleteOrder(): void
    orderToDeleteId: string | undefined
    orders: ServiceOrder[]
    updateOrdersList(orders: ServiceOrder[]): void
}
export default function DeleteOrderDialog(props: DeleteOrderDialogProps){
    const navigate = useNavigate()

    function handleCancel(){
        props.handleClickDeleteOrder()
    }
    function handleDelete(){
        axios.delete("/api/orders/" + props.orderToDeleteId)
            .then(r=>r.data)
            .then(deletedOrder => props.updateOrdersList(props.orders.filter(
                order => order.id !== deletedOrder.id)))
            .then(() => navigate("/"))
            .catch((error) => console.error(error))
    }

    return (
        <Dialog
            open={props.openDeleteDialog}
            onClose={props.handleClickDeleteOrder}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Cancel Service Order"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel your order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Back</Button>
                <Button autoFocus sx={{color: 'error.main'}} onClick={handleDelete}>
                    Cancel Order
                </Button>
            </DialogActions>
        </Dialog>
    )
}
