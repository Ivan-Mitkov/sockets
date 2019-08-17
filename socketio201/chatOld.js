const express= require('express');
const socketio= require('socket.io');

const app =express();
app.use(express.static(__dirname + '/public'))

const expressServer=app.listen(3000,()=>console.log('app listen to port 3000'))
const io=socketio(expressServer,{
    path:'/socket.io',
    serveClient:true

});
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
    // The server can communicate across namespaces
    // but on the client the socket needs to be in THAT namespace
    // in order to get the event

    //down code can be executed before the connection is made because JS is asynchronous
    //that's why we are using setTimeout just to show
    setTimeout(()=>{
        io.of('/admin').emit('welcomeAdmin',{welcomeFromOtherNamespace:'Welcome to the admin chanel'})

    },10)
    
})
io.of('/admin').on('connection',(socket)=>{
    io.of('/admin').emit('welcomeAdmin',{welcome:'Welcome to the admin chanel'})
   console.log('Someone connected to the admin')
})