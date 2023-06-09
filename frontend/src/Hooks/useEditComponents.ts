import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";

type useEditComponentsProps =  {
    components: Component[]
    handleSetComponents(components: Component[]): void

}
export default function useEditComponents(props: useEditComponentsProps){
    const[newComponentCategory, setNewComponentCategory] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number>(0)
    let submitDisabled =
        props.components.filter(c => c.category === newComponentCategory.trim()) === undefined
        || Number.isNaN(newComponentAge)
        || newComponentModel.trim()===""
        || newComponentCategory.trim()===""
        || props.components.filter(c =>
            c.category+c.type === newComponentCategory.trim()+newComponentModel.trim()).length!==0
    function handleInputComponentCategory(event: ChangeEvent<HTMLInputElement>){
        setNewComponentCategory(event.target.value)
    }
    function handleInputComponentModel(event: ChangeEvent<HTMLInputElement>) {
        setNewComponentModel(event.target.value)
    }
    function handleInputComponentAge(event: ChangeEvent<HTMLInputElement>){
        setNewComponentAge(Number(event.target.value))
    }
    function handleSubmitNewComponent(){
        props.handleSetComponents([...props.components,
            {category: newComponentCategory.trim(), type: newComponentModel.trim(), age: newComponentAge}])
        setNewComponentAge(0)
        setNewComponentModel("")
        setNewComponentCategory("")
    }
    function handleDeleteComponent(component: Component) {
        props.handleSetComponents(props.components.filter((c =>
            c.type+c.category !== component.type+component.category)))
    }
    return {
        handleInputComponentAge,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleSubmitNewComponent,
        handleDeleteComponent,
        newComponentAge,
        newComponentCategory,
        newComponentModel,
        submitDisabled
    }
}
