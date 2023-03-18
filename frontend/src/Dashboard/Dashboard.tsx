import Layout from "../Layout/Layout";
import useAuth from "../Hooks/useAuth";

export default function Dashboard() {
    const user = useAuth(true)
    return (user &&
        <Layout>
            <input type={"text"}/>
            <button>Search</button>
        </Layout>
    )
}