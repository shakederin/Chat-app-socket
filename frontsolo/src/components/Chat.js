import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import { context } from '../App';

export default function Chat() {
  const { user } = useContext(context);
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [sendToUser, setSendToUser] = useState("");
  const msg = useRef(null)
  const socket = useRef(null)

    const send = () =>{
      socket.current.emit("sendMessage", ({user, msg: msg.current.value}))
      msg.current.value="";

    }
    
    const displayMsg = () =>{
      const screen = chat.map((content, i)=>{
        return <div key={i}>{content.user} : {content.msg}</div>
      })
      return screen
    }

    const sendPrivateMsg = ()=>{
      socket.current.emit("sendPrivate",
       ({name: sendToUser, msg:msg.current.value}))
       setSendToUser("")
       msg.current.value="";
    }

    const displayUsers = () =>{
      const screen = users.map((name, i)=>{
        return  <div onClick={()=>setSendToUser(name)}
                    key={i}>{name}
                </div>
      })
      return screen
    }
    
    useEffect(()=>{
      socket.current = io("http://localhost:3005");  
      socket.current.on("changeChat", ({user, msg})=>{
        setChat((pre)=>{return[...pre, {user, msg}]})
      })
      socket.current.on("showUsers", (allUsers)=>{
        setUsers([...allUsers])
      }) 
      
      socket.current.emit("join", (user))
    }, [])
  
    return (
      <div className="App">
        {displayMsg()}
        <input ref={msg} type="text" placeholder='message'/>
        {!sendToUser
        ?
        <button onClick={send}>send</button>
        :
        <button onClick={sendPrivateMsg}>send to {sendToUser}</button>
        }
        
        {displayUsers()}
      </div>
    );
}


