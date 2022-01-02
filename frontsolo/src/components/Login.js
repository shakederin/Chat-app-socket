import React, { useContext, useRef } from 'react'
import { context } from '../App';
import axios from "axios"
const url = "http://localhost:3005/"

export default function Login() {
    const name = useRef(null)
    const { setLogged, setUser } = useContext(context);
    return (
        <div>
            <input ref={name} type="text" />
            <button onClick={async()=>{
                const username =name.current.value;
                const response = await axios.get(`${url}`);
                if(response.data.includes(username)){
                    alert("user name is already taken")
                    return;
                }
                setUser(username);
                setLogged(true);
                }
            }>go</button>
        </div>
    )
}
