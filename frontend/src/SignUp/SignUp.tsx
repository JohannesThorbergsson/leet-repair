import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom";


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
        axios
            .post("/api/users/", {username, password})
            .then(() => navigate("/login"))
            .catch(error => console.log(error))
    }
    return (
        <form className={"signup__form"} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>
                <span>Username:</span>
                <input type={"text"} value={username} onChange={handleUsernameChange}/>
            </label>
            <label>
                <span>Password:</span>
                <input type={"password"} value={password} onChange={handlePasswordChange}/>
            </label>
            <button type={"submit"}>Sign Up</button>
        </form>
    )
}