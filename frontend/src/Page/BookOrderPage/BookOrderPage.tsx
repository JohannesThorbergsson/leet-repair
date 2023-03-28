import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {Workshop} from "../../model/Workshop";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import {Box, Button, FormControl, InputLabel, Select, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {v4 as uuidv4} from "uuid"
import ComponentTable from "../../Component/ComponentTable/ComponentTable";

type BookOrderPageProps = {
    workshops: Workshop[]
}
export default function BookOrderPage(props: BookOrderPageProps){
    const navigate = useNavigate()
    const {workshopId} = useParams<{workshopId: string}>()
    const workshop: Workshop | undefined = props.workshops.find(workshop => workshop.id === workshopId)
    const [orderedComponents, setOrderedComponents] = useState([])

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
            <Box sx={{
                boxShadow: 1,
                m: 1,
                p: 2
            }}>
                <TextField
                    required
                    multiline
                    id="outlined-required"
                    label="Order Description"
                    fullWidth
                    sx={{mt: 1}}
                />
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel id="demo-simple-select-label">Order components</InputLabel>
                    <Select sx={{textAlign: 'left'}}
                        id="demo-simple-select"
                        labelId="demo-simple-select-label"
                        label="Order components"
                    >
                        {workshop && workshop.inventory.map((inventoryItem) =>
                        <MenuItem key={uuidv4()} value={10}>{inventoryItem.category + " " +inventoryItem.type}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <ComponentTable components={orderedComponents}/>
            </Box>
            <Button variant={"contained"} onClick={()=>navigate("/")}>Back</Button>
        </>
    )
}