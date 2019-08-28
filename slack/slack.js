const express= require('express');
const socketio= require('socket.io');

const app =express();
const expressServer=app.listen(3000,()=>console.log('app listen to port 3000'))

const io=socketio(expressServer,{
    path:'/socket.io',
    serveClient:true

});

let namespaces=require('./data/namespaces.js')
// console.log(namespaces)


app.use(express.static(__dirname + '/public'))


// io.on e = na io.of('/').on
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:'Welcome to socket.io Server'});
    socket.on('dataToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        io.emit('messageToClients',{text:msg.text})
    })
    socket.join('level1')
    socket.to('level1').emit('joined',`${socket.id} I have joined the level1 room`)
    io.of('/').to('level1').emit('joined',`${socket.id} I have joined the level2 room`)
   
})

namespaces.forEach((n)=>{
    io.of(n.endpoint).on('connection',(socket)=>{
        console.log(`socket id from slack ${socket.id}`)
    })
 })
 