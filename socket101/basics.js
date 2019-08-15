const http = require('http');
const socketio=require('socket.io')

const server = http.createServer((req,res)=>{
    res.end("i'm connected")
})

const io=socketio(server);

io.on('connection',(socket,req)=>{
    // ws.send('welcome to the websocket server');
    socket.emit('welcome','welcome to the websocket server');

    // ws.on('message',(msg)=>{
    //     console.log(msg)
    // })
    socket.on('message',(msg)=>{
        console.log(msg)
    })
})

server.listen(8000)