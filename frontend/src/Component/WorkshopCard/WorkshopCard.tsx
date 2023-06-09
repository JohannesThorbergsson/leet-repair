import {Workshop} from "../../model/Workshop";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";
import Map, {Popup} from 'react-map-gl';

type WorkshopCardProps = {
    workshop: Workshop
    displayMode: boolean
    searchTerm?: string
    mapApiKey: string
}

export default function WorkshopCard(props: WorkshopCardProps) {
    const navigate = useNavigate()

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" fontWeight={"medium"}>
                    {props.workshop.name}
                </Typography>
                <Box>
                    <Map
                        id={"workshop-location"}
                        initialViewState={{
                        longitude: props.workshop.coordinates.lng,
                        latitude: props.workshop.coordinates.lat,
                        zoom: 12.5
                    }}
                        maxZoom={15.5}
                        style={{width: "100%", height: '200px'}}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        mapboxAccessToken={props.mapApiKey}
                        >
                        <Popup longitude={props.workshop.coordinates.lng}
                               latitude={props.workshop.coordinates.lat}
                               closeButton={false}
                               children={
                                    <Typography variant="subtitle2" component="h6" fontWeight={"medium"}>
                                        {props.workshop.location}
                                    </Typography>}
                        />
                    </Map>
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    Services offered:
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly'
                }} >
                    {props.workshop.services.map(s =>
                        <Box key={s} sx={{
                            m: 0.4,
                            p: 0.4,
                            boxShadow: 2,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            borderColor: 'primary.main',}}>
                            <Typography color={'white'} variant="body1">{s}</Typography>
                        </Box>
                    )}
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    Components in Stock:
                </Typography>
                <ComponentTable components={props.workshop.inventory} showAge={false}/>
                {!props.displayMode &&
                    <Button variant={"contained"} sx={{mt: 1}}
                            onClick={() => navigate("/workshops/orders/",
                                {state: {searchTerm: props.searchTerm, workshop: props.workshop}})}>
                        Book Services
                    </Button>
                }
            </CardContent>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                p: 0,
                boxShadow: 1
            }}>{card}</Card>
        </div>
    )
}
