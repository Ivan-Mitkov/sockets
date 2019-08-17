//namespaces
const socket = io("http://localhost:3000");
const socket2 = io("http://localhost:3000/admin");

socket.on('connect',()=>{
console.log(socket.id)
})
socket2.on('connect',()=>{
console.log(socket2.id)
})

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from client" });
});
socket2.on("welcomeAdmin", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: dataFromServer });
});

socket.on("ping", () => {
//   console.log("ping was received from the server");
});
socket.on("pong", latency => {
//   console.log(`pong was sent to the server latency ${latency}`);
});

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log('form submitted')
    const newMessage=document.querySelector('#user-message').value;
  //   console.log(newMessage);
  socket.emit('newMessageToServer',{text:newMessage})
})
socket.on('messageToClients',(msg)=>{
    console.log(msg)
    document.querySelector('#messages').innerHTML+=`<li>${msg.text}</li>`
})