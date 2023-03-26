import {Component} from "./Component";

export type ServiceEvent = {
    id: string
    description: string
    newComponents: Component[]
    workshopName: string
    date: string
}
