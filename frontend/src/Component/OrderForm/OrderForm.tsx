import {Autocomplete, Box, Button, TextField} from "@mui/material";
import React from "react";
import useOrderForm from "../../Hooks/useOrderForm";
import {Workshop} from "../../model/Workshop";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    orderToEdit?: ServiceOrder
    updateOrderList(orders: ServiceOrder[]): void
}
export default function OrderForm(props: OrderFormProps) {
    const {
        workshop,
        selectedBike,
        orderDescription,
        orderedComponents,
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
                    value={selectedBike?.modelName}
                    options={props.bikes.map(bike => bike.modelName)}
                    sx={{ width: 1 }}
                    renderInput={(params) =>
                        <TextField required {...params} label="Select Bike" />}
                />
                <TextField
                    required
                    multiline
                    onChange={handleInputDescription}
                    value={orderDescription}
                    id="outlined-required"
                    label="Order Description"
                    fullWidth
                    sx={{mt: 2}}
                />
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    options={workshop?.inventory.map(
                        component => component.category + " " +component.type) || []}
                    onChange={handleInputComponents}
                    value={orderedComponents.map(component => component.category + " " +component.type)}
                    id="select-components"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="(Optional) Order Components"
                            placeholder="Components"
                        />
                    )}
                />
                <Button variant = "contained"
                        sx={{mt: 2}}
                        type={"submit"}
                        disabled={orderDescription ==="" || !selectedBike}>
                    Submit Order
                </Button>
            </Box>
        </>
    )
}
