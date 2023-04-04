import {Component} from "./Component";

export type Workshop = {
    id: string
    name: string
    username: string
    services: [string]
    inventory: [Component]
}
