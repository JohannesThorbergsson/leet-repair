import {useEffect, useState} from "react";
import {Workshop} from "../model/Workshop";
import axios from "axios";

export default function useWorkshops() {
    const [results, setResults] = useState<Workshop[]>([])
    useEffect(fetchWorkshops, [])

    function fetchWorkshops() {
        axios.get("/api/workshops/")
            .then(r => setResults(r.data))
    }
    return {results}
}