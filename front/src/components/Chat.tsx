import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { context } from '../App'
import { io } from 'socket.io-client'
import Screen from './Screen';
import Input from './Input';
import Users from './Users';

export const chatContext = createContext<Partial<solveTypes.chatContext>>({})

export default function Chat() {
    const [chat, setChat] = useState<solveTypes.chatState[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const { user } = useContext(context);
    const socket = useRef<any>(null);
    
  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.on("announce", (msg: string) => {
      setChat((prevState: solveTypes.chatState[]) => {
        return [...prevState, { name: "server", message: msg }];
      });
    });
    socket.current.on("participents", (patricipents: string[])=>{
        setUsers([...patricipents, ])
    })

    socket.current.on("messageBack", ({ name, message }: solveTypes.chatState) => {
        setChat((prevState: solveTypes.chatState[]) => {
            return [...prevState, { name, message }];
        });
    }
    );
    socket.current.emit("join", user);
  }, []);

  return (
        <div className="chat">
    <chatContext.Provider value= {{chat, setChat, socket, users}}>
        <Screen />
        <Input />
        <Users />
    </chatContext.Provider>
     
    </div>
  );
}
