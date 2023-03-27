import {useEffect, useState} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import useAuth from "./useAuth";
import {ServiceOrder} from "../model/ServiceOrder";

export default function useFetchData(){
    const [bikes, setBikes] = useState<Bike[]>([])
    const [orders, setOrders] = useState<ServiceOrder[]>([])
    const user = useAuth(false)
    useEffect(() =>fetchData(), [user])

    function updateBikeList(bikes: Bike[]){
        setBikes(bikes)
    }
    function fetchData(){
        axios.get("/api/bikes/")
            .then(r => setBikes(r.data))
            .catch((error) => console.error(error))
        axios.get("api/orders/")
            .then(r => setOrders(r.data))
            .catch((error) => console.error(error))
    }
    return {bikes, orders, updateBikeList}
}
