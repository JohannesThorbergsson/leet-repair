import {Workshop} from "../../model/Workshop";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import React, {useMemo} from "react";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

type WorkshopCardProps = {
    workshop: Workshop
    displayMode: boolean
    searchTerm?: string
}

export default function WorkshopCard(props: WorkshopCardProps) {
    const navigate = useNavigate()
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    const position = { lat: 18.52043, lng: 73.856743 }
    const mapContainerStyle = {
        width: '100%',
        height: '200px'
    };
    const options = {
        center: center,
        zoom: 12,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
    };
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" fontWeight={"medium"}>
                    {props.workshop.name}
                </Typography>
                <LoadScript  googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        mapContainerClassName="map-container"
                        center={center}
                        options={options}
                        zoom={10}
                    >
                            <Marker position={position} />
                    </GoogleMap>
                </LoadScript>
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
                            onClick={() => navigate("/workshops/orders/"+props.workshop.id,
                                {state: {searchTerm: props.searchTerm}})}>
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
