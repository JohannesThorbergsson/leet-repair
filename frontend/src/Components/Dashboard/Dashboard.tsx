import Layout from "../Layout/Layout";
import useAuth from "../../Hooks/useAuth";
import useWorkshops from "../../Hooks/useWorkshops";
import WorkshopCard from "../WorkshopCard/WorkshopCard";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const user = useAuth(true)
    const navigate = useNavigate()
    const {searchHandler, searchResults, search, closeSearch, searchTerm, handleSearchTerm} = useWorkshops()

    function handleManageBikesButton(){
        navigate("/bikes")
    }
    return (user &&
        <Layout>
            <input type={"text"} value={searchTerm} onChange={handleSearchTerm}/>
            <button onClick={searchHandler}>Search</button>
            {!search?
                <>
                    <h1>Dashboard</h1>
                    <button onClick={handleManageBikesButton}>Manage Bikes</button>
                </>
            :
            <div>Search results
                {searchResults.map((workshop) =><WorkshopCard key={workshop.id} workshop={workshop}/>)}
                <button onClick={closeSearch}>Back</button>
            </div> }
        </Layout>
    )
}