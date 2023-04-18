import {Autocomplete, Box, Button, TextField} from "@mui/material";
import React from "react";
import useOrderForm from "../../Hooks/useOrderForm";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import {useNavigate} from "react-router-dom";
import DeleteOrderDialog from "../../Dialog/DeleteOrderDialog";
import WorkshopCard from "../WorkshopCard/WorkshopCard";
import FormAppBar from "../ResponsiveAppBar/FormAppBar";

type OrderFormProps = {
    workshop: Workshop
    bikes: Bike[]
    orders: ServiceOrder[]
    orderToEdit?: ServiceOrder
    mapApiKey: string
    isFetching: boolean
    updateOrderList(orders: ServiceOrder[]): void
}
export default function OrderForm(props: OrderFormProps) {
    const navigate = useNavigate()
    const {
        orderFormState,
        submitDisabled,
        componentsInStock,
        handleClickDeleteOrder,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder
    } = useOrderForm(props)

    return (
        <>
            <FormAppBar title={props.orderToEdit ? "Edit your Order" : "Book Services"}
                        orderMode
                        handleCancel={()=>navigate("/")}
                        editMode={props.orderToEdit !== undefined}
                        handleSubmit={handleSubmitOrder}
                        submitDisabled={submitDisabled}/>
            {orderFormState.workshopEditOrder ?
                <WorkshopCard workshop={orderFormState.workshopEditOrder}
                          displayMode={true}
                          mapApiKey={props.mapApiKey}/>:
                orderFormState.workshopNewOrder &&
                    <WorkshopCard workshop={orderFormState.workshopNewOrder}
                                  displayMode={true}
                                  mapApiKey={props.mapApiKey}/>
            }
            <Box sx ={{
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
                {props.orderToEdit &&
                    <Button variant={"contained"}
                            sx={{mt: 2, ml: 1,
                                width: 1/2,
                                bgcolor: 'warning.main',
                                '&:hover': {bgcolor: 'error.main'}
                            }}
                            onClick={handleClickDeleteOrder}>
                        Cancel Order
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
