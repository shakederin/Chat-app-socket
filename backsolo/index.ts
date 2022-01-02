import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors"
const PORT = 3005
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)

app.get("/", (_req,res)=>{
  res.send(getAllNames())
})

const USERS=[]

function getAllNames(){
  return USERS.map((userInfo)=>{
    return userInfo.userName
  })
}


io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("sendMessage", ({user, msg})=>{  
    io.emit("changeChat", ({user, msg}))
  })
  socket.on("sendPrivate", ({name, msg})=>{
    const res = USERS.find((userInfo)=>{
      return userInfo.userName === name
    })
    socket.broadcast.to(res.id).emit("changeChat",
     {user: socket.data.username, msg})
  })

  socket.on("join", (userName)=>{   
    USERS.push({userName, id:socket.id})
    socket.data.username = userName;
    io.emit("showUsers", (getAllNames()))
    io.emit("changeChat", ({user: userName, msg:"join the room"}))
  })
  socket.on('disconnect', (sockett) => {
    const name = socket.data.username;
    io.emit("changeChat", ({user: name, msg:"left the room"}));
    const index = USERS.findIndex((userInfo)=>{
      return userInfo.userName === name
    })
    USERS.splice(index, 1);
    io.emit("showUsers", (getAllNames()))
    console.log(`${name} disconnected`);
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