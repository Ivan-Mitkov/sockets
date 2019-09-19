//namespaces
const socket = io("http://localhost:3000");



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
  joinNs('/wiki')
  
});


