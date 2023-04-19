import {Component} from "../model/Component";
import {Coordinates} from "../model/Coordinates";

export type WorkshopFormState = {
    components: Component[]
    services: string[]
    workshopName: string
    address: string
    coordinates: Coordinates | undefined
    addComponentDialogOpen: boolean
    invalidAddress: boolean
}

type Action =
    | {type: "SET_COMPONENTS", payload: Component[]}
    | {type: "SET_SERVICES", payload: string[]}
    | {type: "SET_WORKSHOP_NAME", payload: string}
    | {type: "SET_ADDRESS", payload: string}
    | {type: "SET_COORDINATES", payload: Coordinates}
    | {type: "SET_ADD_COMPONENT_DIALOG_OPEN", payload: boolean}
    | {type: "SET_INVALID_ADDRESS", payload: boolean}

export default function workshopFormReducer(state: WorkshopFormState, action: Action){
    switch (action.type){
        case "SET_COMPONENTS":
            return {...state, components: action.payload}
        case "SET_SERVICES":
            return {...state, services: action.payload}
        case "SET_WORKSHOP_NAME":
            return {...state, workshopName: action.payload}
        case "SET_ADDRESS":
            return {...state, address: action.payload}
        case "SET_COORDINATES":
            return {...state, coordinates: action.payload}
        case "SET_ADD_COMPONENT_DIALOG_OPEN":
            return {...state, addComponentDialogOpen: action.payload}
        case "SET_INVALID_ADDRESS":
            return {...state, invalidAddress: action.payload}
        default:
            return state
    }
}
