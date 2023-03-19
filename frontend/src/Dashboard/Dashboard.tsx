import Layout from "../Layout/Layout";
import useAuth from "../Hooks/useAuth";
import {useState} from "react";
import axios from "axios";

export default function Dashboard() {
    const user = useAuth(true)
    const [search, setSearch] = useState(false)
    const [results, setResults] = useState([])
    function searchHandler() {
        setSearch(true)
        axios.get("/api/workshops/")
            .then(r => setResults(r.data))
    }
    return (user &&
        <Layout>
            <input type={"text"}/>
            <button onClick={searchHandler}>Search</button>
            {!search?
            <h1>Dashboard</h1>:
            <div>Search results
                {results.map((e) =><h1>Workshop</h1>)} </div> }
        </Layout>
    )
}