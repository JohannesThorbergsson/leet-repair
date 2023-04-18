import {useEffect, useRef, useState} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import useAuth from "./useAuth";
import {ServiceOrder} from "../model/ServiceOrder";

export default function useFetchData(){
    const [bikes, setBikes] = useState<Bike[]>([])
    const [orders, setOrders] = useState<ServiceOrder[]>([])
    const [mapApiKey, setMapApiKey] = useState<string>("")
    const [isFetching, setIsFetching] = useState(false)
    const user = useAuth(false)
    const prevUser = useRef(user);

    useEffect(() => {
        if (user !== null && prevUser.current === null) {
            setIsFetching(true);
            fetchData()
                .then(([ordersResponse, bikesResponse, secretsResponse]) => {
                    setOrders(ordersResponse.data)
                    setBikes(bikesResponse.data)
                    setMapApiKey(secretsResponse.data)
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => setIsFetching(false))
        }
        prevUser.current = user
        //eslint-disable-next-line
    }, [user])
    function updateBikeList(bikes: Bike[]){
        setBikes(bikes)
    }
    function updateOrderList(orders: ServiceOrder[]){
        setOrders(orders)
    }
    function fetchData() {
        const ordersResponse = user?.role === "BASIC"
            ?  axios.get("/api/orders/")
            :  axios.get("/api/orders/" + user?.id);
        const bikesResponse = user?.role === "BASIC"
            ? axios.get("/api/bikes/")
            : Promise.resolve({data: []})
        const secretsResponse =  axios.get("/api/secrets/")
        return Promise.all([ordersResponse, bikesResponse, secretsResponse])
    }
    return {bikes, orders, isFetching, mapApiKey, updateBikeList, updateOrderList}
}
