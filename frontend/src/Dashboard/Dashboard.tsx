import Layout from "../Layout/Layout";
import useAuth from "../Hooks/useAuth";
import {useState} from "react";
import axios from "axios";

export default function Dashboard() {
    const user = useAuth(true)
    const [search, setSearch] = useState(false)
    function searchHandler() {
        setSearch(true)
        axios.get("/api/workshops/")
            .then(r => r.data)
    }
    return (user &&
        <Layout>
            <input type={"text"}/>
            <button onClick={searchHandler}>Search</button>
            {!search?
            <h1>Dashboard</h1>:
            <div>Search results</div> }
        </Layout>
    )
}