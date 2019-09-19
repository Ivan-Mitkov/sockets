const express = require("express");
const socketio = require("socket.io");

const app = express();
const expressServer = app.listen(3000, () =>
  console.log("app listen to port 3000")
);

const io = socketio(expressServer, {
  path: "/socket.io",
  serveClient: true
});

let namespaces = require("./data/namespaces.js");
// console.log(namespaces)

app.use(express.static(__dirname + "/public"));

// io.on e = na io.of('/').on
io.on("connection", socket => {
  //    build an array to send back with the img and endpoint for each ns
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    };
  });
//   console.log(nsData)
//send the nsData back to the client
//we need to use socket NOT io because we wanted it to go to just this client
socket.emit('nsList',nsData)
});

namespaces.forEach(namespace => {
//   console.log(namespace);
  io.of(namespace.endpoint).on("connection", nsSocket => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    //a socket has connected to one of our chatgroup namespaces
    //send that ns group info back
    nsSocket.emit('nsRoomLoad',namespaces[0].rooms)
  });
});
