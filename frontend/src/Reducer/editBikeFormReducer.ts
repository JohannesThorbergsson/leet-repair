import {ServiceEvent} from "../model/ServiceEvent";
import {Component} from "../model/Component";

type State = {
    modelName: string
    mileage: number | undefined
    mileageFieldValue: string
    components: Component[]
    services: ServiceEvent[]
    openDeleteDialog: boolean
}
type Action =
    | {type: "SET_MODEL_NAME", payload: string}
    | {type: "SET_MILEAGE", payload: number | undefined}
    | {type: "SET_MILEAGE_FIELD_VALUE", payload: string}
    | {type: "SET_COMPONENTS", payload: Component[]}
    | {type: "SET_SERVICES", payload: ServiceEvent[] }
    | {type: "SET_OPEN_DELETE_DIALOG", payload: boolean}

export default function editBikeFormReducer(state: State, action: Action) {
    switch (action.type) {
        case "SET_MODEL_NAME":
            return {...state, modelName: action.payload}
        case "SET_MILEAGE":
            return {...state, mileage: action.payload}
        case "SET_MILEAGE_FIELD_VALUE":
            return {...state, mileageFieldValue: action.payload}
        case "SET_COMPONENTS":
            return {...state, components: action.payload}
        case "SET_SERVICES":
            return {...state, services: action.payload}
        case "SET_OPEN_DELETE_DIALOG":
            return {...state, openDeleteDialog: action.payload}
        default:
            return state
    }
}
