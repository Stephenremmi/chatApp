window.onload = function(){
const messageInput = document.getElementById("message-input")
const form = document.getElementById("form")
console.log(form)

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value;
    
    
     if (message === "") return
        displayMessage(message)

    messageInput.value = ""
})
 function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div)
 }
}