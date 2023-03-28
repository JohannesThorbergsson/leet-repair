import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, FormEvent, SyntheticEvent, useState} from "react";
import {Component} from "../../model/Component";
import {Bike} from "../../model/Bike";
import axios from "axios";
import {ServiceOrder} from "../../model/ServiceOrder";

type BookOrderPageProps = {
    workshops: Workshop[]
    bikes: Bike[]
    orders: ServiceOrder[]
    updateOrderList(orders: ServiceOrder[]): void
}
export default function BookOrderPage(props: BookOrderPageProps){
    const navigate = useNavigate()
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)
    const [orderedComponents, setOrderedComponents] = useState<Component[]>([])
    const [selectedBike, setSelectedBike] = useState<Bike>()
    const [orderDescription, setOrderDescription] = useState<string>("")
    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponent = workshop?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        if(workshop && selectedComponent) {
            setOrderedComponents([...selectedComponent])
        }
    }
    function handleInputBike(event: SyntheticEvent<Element, Event>, value: string | null){
        setSelectedBike(props.bikes.find(bike => bike.modelName===value))
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>) {
        setOrderDescription(event.target.value)
    }
    function handleSubmitOrder(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.post("/api/orders/",
            {bikeId: selectedBike?.id,
                description: orderDescription,
                workshop: workshop?.id,
                componentsToReplace: orderedComponents})
            .then(r => props.updateOrderList([...props.orders, r.data]))
            .then(()=> navigate("/"))
            .catch((error) => console.error(error))
    }

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
            {workshop && <WorkshopCard workshop={workshop}/>}
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
                            label="(Optional) order Components"
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