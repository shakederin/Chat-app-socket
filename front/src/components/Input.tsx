import React, { useContext, useRef } from 'react'
import { context } from '../App';
import { chatContext } from './Chat';

export default function Input() {
    const {socket} = useContext(chatContext);
    const {user} = useContext(context);
    const inputMsg = useRef<HTMLInputElement>(null);

    const sendMsg = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputMsg.current) return;
        const message = inputMsg.current?.value;
        if(!socket) return;
        socket.current.emit("message", { name: user, message });
        inputMsg.current.value = ""
    };

    return (
        <div>
             <form onSubmit={sendMsg}>
                <input ref={inputMsg} placeholder="msg"></input>
                <button type="submit">send</button>
            </form>
        </div>
    )
}
