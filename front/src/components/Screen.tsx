import React, { useContext } from 'react'
import { chatContext } from './Chat'
import { nanoid } from 'nanoid';
export default function Screen() {
    const {chat} = useContext(chatContext);
    const renderChat = () => {
        if(!chat) return <div></div>;
        return chat.map(({ name, message }) => (
          <p key={nanoid()}>
            {name}: {message}
          </p>
        ));
      };
    return (
        <div>
            {renderChat()}
        </div>
    )
}
