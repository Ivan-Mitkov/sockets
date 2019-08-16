const express= require('express');
const socketio= require('socket.io');

const app =express();
app.use(express.static(__dirname + '/public'))

const expressServer=app.listen(3000,()=>console.log('app listen to port 3000'))
const io=socketio(expressServer,{
    path:'/socket.io',
    serveClient:true

});
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:'Welcome to socket.io Server'});
    socket.on('dataToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        io.emit('messageToClients',{text:msg.text})
    })
})