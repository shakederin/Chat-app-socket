import express from "express";  
import { createServer } from "http";
import { Server } from "socket.io"; 
import cors from "cors"
import socket from "./socket"
const port = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,);
app.use(cors());




httpServer.listen(port, ()=>{
    console.log(`runnig on port ${port}`);
    socket({io})
})