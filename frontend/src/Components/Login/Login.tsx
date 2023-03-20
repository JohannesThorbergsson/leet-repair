import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import Layout from "../Layout/Layout";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const authorization = window.btoa(`${username}:${password}`)
        axios
            .post("/api/users/login", {},
            {headers: {Authorization: `Basic ${authorization}`}})
            .then(() => {
                navigate(window.sessionStorage.getItem('signInRedirect') || '/')
            })
            .catch(error => console.log(error))
    }
    return (
        <Layout>
            <form className={"login__form"} onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <label>
                    <span>Username:</span>
                    <input type={"text"} value={username} onChange={handleUsernameChange}/>
                </label>
                <label>
                    <span>Password:</span>
                    <input type={"password"} value={password} onChange={handlePasswordChange}/>
                </label>
                <button type={"submit"}>Log in</button>
            </form>
            <Link to={"/signup"}>Sign Up here</Link>
        </Layout>
    )
}