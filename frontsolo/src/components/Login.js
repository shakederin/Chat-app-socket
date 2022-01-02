import React, { useContext, useRef } from 'react'
import { context } from '../App';

export default function Login() {
    const name = useRef(null)
    const { setLogged, setUser } = useContext(context);
    return (
        <div>
            <input ref={name} type="text" />
            <button onClick={()=>{
                setLogged(true)
                setUser(name.current.value)
                }
            }>go</button>
        </div>
    )
}
