import {Component} from "./Component";

export type ServiceOrder = {
    id: string
    bikeId: string
    bikeName: string
    description: string
    workshop: string
    workshopId: string
    username: string
    status: string
    date: string
    componentsToReplace: Component[]
}
