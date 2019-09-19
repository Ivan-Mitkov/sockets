function joinNs(endpont) {
  const nsSocket = io(`http://localhost:3000${endpont}`);
  nsSocket.on("nsRoomLoad", nsRooms => {
    // console.log(nsRooms)
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";

    nsRooms.forEach(room => {
      let gliph = "";
      if (room.privateRoom) {
        gliph = "lock";
      } else {
        gliph = "globe";
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${gliph}"></span>${room.roomTitle}</li>`;
    });
    //add click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach(elem => {
      elem.addEventListener("click", e => {
        console.log(`somone click on ${e.target.innerText}`);
      });
    });
  });
 
  nsSocket.on("messageToClients", msg => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
  });
  document.querySelector(".message-form").addEventListener("submit", event => {
    event.preventDefault();
    // console.log('form submitted')
    const newMessage = document.querySelector("#user-message").value;
    //   console.log(newMessage);
    socket.emit("newMessageToServer", { text: newMessage });
  });
}
