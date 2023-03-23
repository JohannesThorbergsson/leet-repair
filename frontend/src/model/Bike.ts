import {Component} from "./Component";
import {ServiceEvent} from "./ServiceEvent";

export type Bike = {
    id: string
    modelName: string
    mileage: number
    components: Component[]
    services: ServiceEvent[]
}
