import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors"
const PORT = 3005
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)


// const usersArr = [];


io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("sendMessage", ({user, msg})=>{  
    console.log(socket);
    io.emit("changeChat", ({user, msg}))
  })

  // usersArr.push(socket);
  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
    // usersArr.splice(usersArr.indexOf(socket),1)
  });
});

httpServer.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})














// //The data attribute is an arbitrary object that can be used to share information between Socket.IO servers:

// // server A
// io.on("connection", (socket) => {
//   socket.data.username = "alice";
// });

// // server B
// const sockets = await io.fetchSockets();
// console.log(sockets[0].data.username); // "alice"