//namespaces
const socket = io("http://localhost:3000");
const socket2 = io("http://localhost:3000/admin");


socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from client" });
});

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log('form submitted')
    const newMessage=document.querySelector('#user-message').value;
  //   console.log(newMessage);
  socket.emit('newMessageToServer',{text:newMessage})
})
