import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {Bike} from "../../model/Bike";
import {ServiceOrder} from "../../model/ServiceOrder";
import useOrderForm from "../../Hooks/useOrderForm";

type OrderFormProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: OrderFormProps){
    const navigate = useNavigate()
    const {
        workshop,
        selectedBike,
        orderDescription,
        handleInputComponents,
        handleInputBike,
        handleInputDescription,
        handleSubmitOrder
    } = useOrderForm(props)

    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                mt: 2, p: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                    Selected workshop:
                </Typography>
            </Box>
            {workshop && <WorkshopCard workshop={workshop} displayMode={true}/>}
            <Typography variant="h5" component="h6" fontWeight={"medium"} sx={{mt: 1}}>
                Book Services:
            </Typography>
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
                    options={props.bikes.map(bike => bike.modelName)}
                    sx={{ width: 1 }}
                    renderInput={(params) =>
                        <TextField required {...params} label="Select Bike" />}
                />
                <TextField
                    required
                    multiline
                    onChange={handleInputDescription}
                    id="outlined-required"
                    label="Order Description"
                    fullWidth
                    sx={{mt: 2}}
                />
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    options={workshop?.inventory.map(component => component.category + " " +component.type) || []}
                    onChange={handleInputComponents}
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
            <Button sx={{mt: 2}} variant={"contained"} onClick={()=>navigate("/")}>Back</Button>
        </>
    )
}
