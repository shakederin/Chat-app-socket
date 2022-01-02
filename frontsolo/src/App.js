import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

import Chat from './components/Chat';
import Login from './components/Login';

export const context = createContext({});


function App() {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);

  return (
    <context.Provider value={{ setLogged, user, setUser }}>
      {logged ? <Chat /> : <Login />}
    </context.Provider>
  );
}

export default App;
