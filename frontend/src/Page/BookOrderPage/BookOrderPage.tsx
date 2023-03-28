import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import React, {SyntheticEvent, useState} from "react";
import {Component} from "../../model/Component";
import ComponentTable from "../../Component/ComponentTable/ComponentTable";

type BookOrderPageProps = {
    workshops: Workshop[]
}
export default function BookOrderPage(props: BookOrderPageProps){
    const navigate = useNavigate()
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)
    const [orderedComponents, setOrderedComponents] = useState<Component[]>([])
    function handleInputComponents(event: SyntheticEvent, value: string[]) {
        const selectedComponent = workshop?.inventory.filter(
            component => value.includes(component.category + " " + component.type))
        if(workshop && selectedComponent) {
            setOrderedComponents([...selectedComponent])
        }
    }

    console.log(orderedComponents)
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
                {/*//Book services form here*/}
            </Typography>
            <Box sx ={{
                alignItems: 'center',
                marginInline: 2
            }}>
                    <TextField
                        required
                        multiline
                        id="outlined-required"
                        label="Order Description"
                        fullWidth
                        sx={{mt: 1}}
                    />
                    <Autocomplete
                        sx={{mt: 2}}
                        multiple
                        options={workshop?.inventory.map(component => component.category + " " +component.type) || []}
                        onChange={handleInputComponents}
                        id="demo-simple-select"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Components"
                                placeholder="Favorites"
                            />
                        )}
                    />
                    {orderedComponents.length !== 0 &&
                        <ComponentTable components={orderedComponents} showAge={false}/>
                    }
            </Box>
            <Button sx={{mt: 2}} variant={"contained"} onClick={()=>navigate("/")}>Back</Button>
        </>
    )
}