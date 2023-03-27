import {Component} from "./Component";

export type ServiceOrder = {
    id: string
    bikeId: string
    description: string
    status: string
    componentsToReplace: Component[]
}
