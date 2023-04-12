import {ChangeEvent, FormEvent, SyntheticEvent, useState} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {User} from "./useAuth";
import {Workshop} from "../model/Workshop";
import {OSMSearchResult} from "../model/OSMSearchResult";
import toast from "react-hot-toast";

type EditWorkshopFormProps = {
    user: User | null
    workshops: Workshop[]
    workshopToEdit?: Workshop
    updateWorkshopList(workshops: Workshop[]): void
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
    const [location, setLocation]
        = useState(props.workshopToEdit?.coordinates ?? undefined)
    const [addComponentDialogOpen, setAddComponentDialogOpen] = useState(false)

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
    }
    function handleSetOpenAddComponentsDialog(){
        setAddComponentDialogOpen(!addComponentDialogOpen)
    }
    function getCoordinates(){
        axios.get(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${address}`)
            .then(r => r.data as OSMSearchResult[])
            .then(results => {
                if(results.length>0){
                    setLocation({lat: results[0].lat, lng: results[0].lng})
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Location not found")
            })
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(!props.workshopToEdit) {
            axios.post("/api/workshops/",
                {id: props.user?.id, name: workshopName, services: services, inventory: components})
                .then(r=> r.data)
                .then((newWorkshop)=>props.updateWorkshopList([...props.workshops, newWorkshop]))
                .then(()=> navigate("/"))
                .catch((error) => console.error(error))
        } else {
            axios.put("/api/workshops/"+ props.workshopToEdit.id,
                {id: props.user?.id, name: workshopName, services: services, inventory: components})
                .then(r=> r.data)
                .then(updatedWorkshop=> props.updateWorkshopList(
                    [...props.workshops.filter(workshop => workshop.id!==updatedWorkshop.id),
                        updatedWorkshop]))
                .then(()=> navigate("/"))
                .catch((error) => console.error(error))
        }
    }
    return {
        navigate,
        components,
        services,
        workshopName,
        address,
        location,
        addComponentDialogOpen,
        handleSubmit,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleAddressChange,
        handleWorkshopNameChange,
        handleSetComponents}
}
