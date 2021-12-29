import React, { useContext } from 'react'
import { chatContext } from './Chat'
import { nanoid } from 'nanoid'
export default function Users() {
    const {users} = useContext(chatContext)

    const counter = users?.length

    const showUsers = () =>{
        if(!users) return;
        return users.map((user)=>{
            return <p key={nanoid()}>{user}</p>
        })
    }

    return (
        <div>
            {counter}
            {showUsers()}
        </div>
    )
}
