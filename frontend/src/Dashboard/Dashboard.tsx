import Layout from "../Layout/Layout";
import useAuth from "../Hooks/useAuth";
import {useState} from "react";
import useWorkshops from "../Hooks/useWorkshops";
import WorkshopCard from "../WorkshopCard/WorkshopCard";

export default function Dashboard() {
    const user = useAuth(true)
    const [search, setSearch] = useState(false)
    const {results} = useWorkshops()

    function searchHandler() {
        setSearch(true)
    }

    return (user &&
        <Layout>
            <input type={"text"}/>
            <button onClick={searchHandler}>Search</button>
            {!search?
            <h1>Dashboard</h1>:
            <div>Search results
                {results.map((workshop) =><WorkshopCard key={workshop.id} workshop={workshop}/>)}
            </div> }
        </Layout>
    )
}