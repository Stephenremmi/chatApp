import { io } from "socket.io-client";
window.onload = function(){

const messageInput = document.getElementById("message-input")
const form = document.getElementById("form")

const socket = io('http://localhost:3000');
socket.on('connect', ()=> {
    displayMessage(`You connected with id: ${socket.id}`)
})

socket.on('receive-message', message => {
    const div = document.createElement("div");
    div.textContent = message;
    div.style.border = "1px solid #cccccc";
    div.style.width="auto";
    div.style.flexDirection = "row"; 
    div.style.fontSize = "14px"; 
    div.style.color = "#202020"; 
    div.style.backgroundColor = "#fbfbfb";
    div.style.marginTop = "5px";
    document.getElementById("specific-message").append(div)
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value;
    
    
     if (message === "") return
        displayMessage(message)
        socket.emit("send-message", message)

    messageInput.value = ""
})
 function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    div.style.border = "1px solid #cccccc";
    div.style.flexDirection = "column"; 
    div.style.fontSize = "14px"; 
    div.style.color = "#202020"; 
    div.style.backgroundColor = "#25d366";
    div.style.marginTop = "5px";
    document.getElementById("specific-message").append(div)
 }
}