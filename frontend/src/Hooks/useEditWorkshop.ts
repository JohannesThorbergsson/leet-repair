import {ChangeEvent, SyntheticEvent, useReducer} from "react";
import {Component} from "../model/Component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {User} from "./useAuth";
import {Workshop} from "../model/Workshop";
import {OSMSearchResult} from "../model/OSMSearchResult";
import toast from "react-hot-toast";
import workshopFormReducer, {WorkshopFormState} from "../Reducer/workshopFormReducer";

type EditWorkshopFormProps = {
    user: User | null
    workshopToEdit?: Workshop
}
export default function useEditWorkshop(props: EditWorkshopFormProps){
    const initialFormState: WorkshopFormState = {
        components: props.workshopToEdit?.inventory ?? [],
        services: props.workshopToEdit?.services ?? ["Repairs"],
        workshopName: props.workshopToEdit?.name ?? (props.user?.username || ""),
        address: props.workshopToEdit?.location ?? "",
        coordinates: props.workshopToEdit?.coordinates ?? undefined,
        addComponentDialogOpen: false,
        invalidAddress: false
    }
    const [workshopFormState, dispatch] = useReducer(workshopFormReducer, initialFormState)
    const navigate = useNavigate()

    function handleServicesChange(event: SyntheticEvent, value: string[]) {
        dispatch({type: "SET_SERVICES", payload: value})
    }
    function handleWorkshopNameChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch({type: "SET_WORKSHOP_NAME", payload: event.target.value})
    }
    function handleSetComponents(components: Component[]){
        dispatch({type: "SET_COMPONENTS", payload: components})
    }
    function handleAddressChange(event: ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_ADDRESS", payload: event.target.value})
        dispatch({type: "SET_INVALID_ADDRESS", payload: false})
    }
    function handleSetOpenAddComponentsDialog(){
        dispatch({type: "SET_ADD_COMPONENT_DIALOG_OPEN", payload: !workshopFormState.addComponentDialogOpen})
    }
    function getCoordinates(){
        return axios.get(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${workshopFormState.address}`)
            .then(r => r.data as OSMSearchResult[])
            .then(results => {
                if(results.length>0){
                    dispatch({type: "SET_COORDINATES", payload: {lat: Number(results[0].lat), lng: Number(results[0].lon)}})
                } else {
                    toast.error("Invalid Address")
                    dispatch({type: "SET_INVALID_ADDRESS", payload: true})
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
                        name: workshopFormState.workshopName,
                        location: workshopFormState.address,
                        coordinates: {lat: Number(results[0].lat), lng: Number(results[0].lon)},
                        services: workshopFormState.services,
                        inventory: workshopFormState.components
                    })
                        .then(() => navigate("/"))
                        .catch((error) => console.error(error))
                } else {
                    axios.put("/api/workshops/" + props.workshopToEdit.id, {
                        id: props.user?.id,
                        name: workshopFormState.workshopName,
                        location: workshopFormState.address,
                        coordinates: {lat: Number(results[0].lat), lng: Number(results[0].lon)},
                        services: workshopFormState.services,
                        inventory: workshopFormState.components})
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
        workshopFormState,
        getCoordinates,
        handleSubmit,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleAddressChange,
        handleWorkshopNameChange,
        handleSetComponents}
}
