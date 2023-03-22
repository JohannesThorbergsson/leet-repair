import {useEffect, useState} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import useAuth from "./useAuth";

export default function useBikes(){
    const [bikes, setBikes] = useState<Bike[]>([])
    const user = useAuth(false)
    useEffect(() =>fetchBikes(), [user])

    function fetchBikes(){
        axios.get("api/bikes/")
            .then(r => setBikes(r.data))
            .catch((error) => console.error(error))

    }
    return {bikes}
}
