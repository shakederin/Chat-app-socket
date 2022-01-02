import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import { context } from '../App';

export default function Chat() {
  const { user } = useContext(context);
  const [chat, setChat] = useState([]);
  const msg = useRef(null)
  const socket = useRef(null)

    const send = () =>{
      socket.current.emit("sendMessage", ({user, msg: msg.current.value}))
      console.log(user, msg.current.value);
    }
    
    const displayMsg = () =>{
      const screen = chat.map((content, i)=>{
        return <div key={i}>{content.user} : {content.msg}</div>
      })
      return screen
    }
    // socket.on("reciveMsg", (user: string, message: string)=>{
      //   setChat([...chat, {user, message}])
      // })
      
      useEffect(()=>{
        socket.current = io("http://localhost:3005");  
        
        socket.current.on("changeChat", ({user, msg})=>{
          setChat((pre)=>{return[...pre, {user, msg}]})
      })
    }, [])
  
    return (
      <div className="App">
        <input ref={msg} type="text" placeholder='message'/>
        <button onClick={send}>send</button>
        {displayMsg()}
      </div>
    );
}


