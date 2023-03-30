import {Autocomplete, Box, Button, TextField} from "@mui/material";
import React from "react";
import useOrderForm from "../../Hooks/useOrderForm";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import {useNavigate} from "react-router-dom";
import DeleteOrderDialog from "../../Dialog/DeleteOrderDialog";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    orderToEdit?: ServiceOrder
    updateOrderList(orders: ServiceOrder[]): void
}
export default function OrderForm(props: OrderFormProps) {
    const navigate = useNavigate()
    const {
        orderFormState,
        componentsInStock,
        handleClickDeleteOrder,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder
    } = useOrderForm(props)

    return (
        <>

            <Box component={"form"} onSubmit={handleSubmitOrder}
                 sx ={{
                     alignItems: 'center',
                     marginInline: 2,
                     p: 1,
                     boxShadow: 1
                 }}>
                <Autocomplete
                    disablePortal
                    aria-required={true}
                    id="select-bike"
                    onChange={handleInputBike}
                    value={orderFormState.selectedBike?.modelName}
                    options={props.bikes.map(bike => bike.modelName)}
                    sx={{ width: 1 }}
                    renderInput={(params) =>
                        <TextField required {...params} label="Select Bike" />}
                />
                <TextField
                    required
                    multiline
                    onChange={handleInputDescription}
                    value={orderFormState.orderDescription}
                    id="outlined-required"
                    label="Order Description"
                    fullWidth
                    sx={{mt: 2}}
                />
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    options={componentsInStock}
                    onChange={handleInputComponents}
                    defaultValue={orderFormState.orderedComponentsText}
                    id="select-components"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="(Optional) Order Components"
                            placeholder="Components"
                        />
                    )}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Button variant = "contained"
                            sx={{mt: 2, mr: 1, width: 1/2}}
                            type={"submit"}
                            disabled={orderFormState.orderDescription ==="" || !orderFormState.selectedBike}>
                        {!props.orderToEdit ? "Submit Order": "Submit Changes"}
                    </Button>
                    <Button variant={"contained"}
                            sx={{mt: 2, ml: 1,
                                width: 1/2,
                                bgcolor: 'warning.main',
                                '&:hover': {bgcolor: 'error.main'}
                            }}
                            onClick={handleClickDeleteOrder}>
                        Cancel Order
                    </Button>
                </Box>
                {props.orderToEdit &&
                    <Button variant="contained" sx={{mt: 2, width: 1}} onClick={()=>navigate("/")}>
                        Cancel Changes
                    </Button>
                }
            </Box>
            <DeleteOrderDialog handleClickDeleteOrder={handleClickDeleteOrder}
                               openDeleteDialog={orderFormState.openDeleteDialog}
                               orderToDeleteId={props.orderToEdit?.id}
                               orders={props.orders}
                               updateOrdersList={props.updateOrderList}/>
        </>
    )
}
