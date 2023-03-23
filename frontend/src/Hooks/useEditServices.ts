import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";

export default function useEditServices() {
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const[newBikeComponents, setNewBikeComponents] = useState<Component[]>([])

    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>){
        setWorkshopName(event.target.value)
    }
    function handleInputDate(event: ChangeEvent<HTMLInputElement>){
        setDate(event.target.value)
    }
    function handleSetNewComponents(components: Component[]){
        setNewBikeComponents(components)
    }
    return {handleInputDate, handleInputDescription, handleInputWorkshopName,
        handleSetNewComponents, description, workshopName, date, newBikeComponents}
}