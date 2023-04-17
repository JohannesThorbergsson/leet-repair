import {ChangeEvent, SyntheticEvent, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {User} from "./useAuth";
import {Workshop} from "../model/Workshop";
import {OSMSearchResult} from "../model/OSMSearchResult";
import toast from "react-hot-toast";
import {Coordinates} from "../model/Coordinates";

type EditWorkshopFormProps = {
    user: User | null
    workshopToEdit?: Workshop
}
export default function useEditWorkshop(props: EditWorkshopFormProps){
    const navigate = useNavigate()
    const [components, setComponents]
        = useState<Component[]>(props.workshopToEdit?.inventory ?? [])
    const [services, setServices]
        = useState<string[]>(props.workshopToEdit?.services ?? ["Repairs"])
    const [workshopName, setWorkshopName]
        = useState<string>(props.workshopToEdit?.name ?? (props.user?.username || ""))
    const [address, setAddress] = useState(props.workshopToEdit?.location ?? "")
    const [coordinates, setCoordinates]
        = useState<Coordinates | undefined>(props.workshopToEdit?.coordinates ?? undefined)
    const [addComponentDialogOpen, setAddComponentDialogOpen] = useState(false)
    const [invalidAddress, setInvalidAddress] = useState(false)
    function handleServicesChange(event: SyntheticEvent, value: string[]) {
        setServices(value)
    }
    function handleWorkshopNameChange(event: ChangeEvent<HTMLInputElement>) {
        setWorkshopName(event.target.value)
    }
    function handleSetComponents(components: Component[]){
        setComponents(components)
    }
    function handleAddressChange(event: ChangeEvent<HTMLInputElement>){
        setAddress(event.target.value)
        setInvalidAddress(false)
    }
    function handleSetOpenAddComponentsDialog(){
        setAddComponentDialogOpen(!addComponentDialogOpen)
    }
    function getCoordinates(){
        return axios.get(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${address}`)
            .then(r => r.data as OSMSearchResult[])
            .then(results => {
                if(results.length>0){
                    setCoordinates({lat: Number(results[0].lat), lng: Number(results[0].lon)})
                } else {
                    toast.error("Invalid Address")
                    setInvalidAddress(true)
                }
                return results
            })
    }

    function handleSubmit() {
        getCoordinates()
            .then((results)=> {
                if(results.length<1){
                    return
                } else if (!props.workshopToEdit) {
                    axios.post("/api/workshops/", {
                        id: props.user?.id,
                        name: workshopName,
                        location: address,
                        coordinates: {lat: Number(results[0].lat), lng: Number(results[0].lon)},
                        services: services,
                        inventory: components
                    })
                        .then(r => r.data)
                        .then(() => navigate("/"))
                        .catch((error) => console.error(error))
                } else {
                    axios.put("/api/workshops/" + props.workshopToEdit.id, {
                        id: props.user?.id,
                        name: workshopName,
                        location: address,
                        coordinates: {lat: Number(results[0].lat), lng: Number(results[0].lon)},
                        services: services,
                        inventory: components})
                        .then(r => r.data)
                        .then(() => navigate("/"))
                        .catch((error) => console.error(error))
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Could not access location service")
            })
    }

    return {
        navigate,
        components,
        services,
        workshopName,
        address,
        coordinates,
        addComponentDialogOpen,
        invalidAddress,
        getCoordinates,
        handleSubmit,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleAddressChange,
        handleWorkshopNameChange,
        handleSetComponents}
}
