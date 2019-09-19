//namespaces
const socket = io("http://localhost:3000");

console.log("from script.js", socket.io);

//listen for nsList, which is a list of all namespaces
socket.on("nsList", nsData => {
  console.log("The list of namespaces has arrived: ", nsData);
  //take this nsData and update the DOM
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div> `;
  });
  //add a click listeners fo each namespace
  Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
    elem.addEventListener("click", event => {
      // console.dir(event.target)
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go now`);
    });
  });
  const nsSocket = io("http://localhost:3000/wiki");
  nsSocket.on("nsRoomLoad", nsRooms => {
    // console.log(nsRooms)
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
   
  
    nsRooms.forEach(room => {
      let gliph='';
      if(room.privateRoom){
        gliph='lock'
      }else{
        gliph='globe'
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${gliph}"></span>${room.roomTitle}</li>`;
    });
    //add click listener to each room
    let roomNodes=document.getElementsByClassName('room');
    Array.from(roomNodes).forEach(elem=>{
      elem.addEventListener('click',e=>{
        console.log(`somone click on ${e.target.innerText}`)
      })
    })
  });
});

socket.on("messageFromServer", dataFromServer => {
  console.log("from script.js", dataFromServer);
  socket.emit("dataToServer", { data: "Data from client" });
});

socket.on("joined", msg => {
  console.log("from script.js", msg);
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  // console.log('form submitted')
  const newMessage = document.querySelector("#user-message").value;
  //   console.log(newMessage);
  socket.emit("newMessageToServer", { text: newMessage });
});
socket.on("messageToClients", msg => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
