//namespaces
const socket = io("http://localhost:3000");
const socket2 = io("http://localhost:3000/wiki");
const socket3 = io("http://localhost:3000/mozilla");
const socket4 = io("http://localhost:3000/linux");
console.log(socket.io)

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from client" });
});

socket.on('joined',(msg)=>{
  console.log(msg)
})
socket2.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
 
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
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})
