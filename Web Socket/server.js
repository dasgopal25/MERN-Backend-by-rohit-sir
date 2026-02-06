// const express = require("express");
// const app = express();
// const {Server} = require("socket.io");
// const http = require("http");
// const path = require("path");

// const server = http.createServer(app);
// const io = new Server(server);

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'));
// });
// io.on("connection",(socket)=>{
//     socket.on("message",(data)=>{
//         socket.broadcast.emit("new-message",data);
//         // socket.broadcast.emit('new-message',data);
//     });
//     socket.on("disconnect",()=>{
//         console.log("Disconnect from server");
//     });
// });

// server.listen(3000,()=>{
//     console.log("Listening server");
// })

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

let users = {}; // socket.id => username

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>WhatsApp Chat</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #111b21;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .chat-container {
  width: 95%;
  max-width: 1000px;
  height: 90vh;
  background: #0b141a;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}


    /* Left users panel */
    .users-panel {
  width: 30%;
  min-width: 220px;
  background: #202c33;
  padding: 15px;
  box-sizing: border-box;
  color: white;
  border-right: 2px solid #111b21;
  overflow-y: auto;
}


    .users-panel h2 {
      margin: 0;
      margin-bottom: 15px;
      font-size: 18px;
    }

    .user-item {
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 8px;
      background: #111b21;
      font-size: 15px;
    }

    /* Right chat area */
    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .chat-header {
      background: #202c33;
      padding: 15px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
    }

    .status {
      font-size: 13px;
      font-weight: normal;
      color: #aebac1;
      margin-top: 5px;
      height: 16px;
    }

    .chat-body {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      background: #111b21;
    }

    .message {
      max-width: 75%;
      padding: 10px 12px;
      border-radius: 12px;
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 1.4;
      word-wrap: break-word;
      position: relative;
    }

    .you {
      background: #005c4b;
      color: white;
      margin-left: auto;
      border-bottom-right-radius: 2px;
    }

    .friend {
      background: #202c33;
      color: white;
      margin-right: auto;
      border-bottom-left-radius: 2px;
    }

    .sender {
      font-size: 12px;
      font-weight: bold;
      opacity: 0.8;
      margin-bottom: 5px;
    }

    .msg-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
      font-size: 11px;
      opacity: 0.8;
    }

    .ticks {
      font-size: 12px;
      margin-left: 8px;
    }

    .separator {
      width: 100%;
      height: 6px;
      background-color: rgba(0, 255, 100, 0.20);
      border-radius: 20px;
      margin: 10px 0;
    }

    .chat-footer {
      display: flex;
      gap: 10px;
      padding: 12px;
      background: #202c33;
    }

    .chat-footer input {
      flex: 1;
      padding: 12px;
      border-radius: 20px;
      border: none;
      outline: none;
      font-size: 15px;
      background: #111b21;
      color: white;
    }

    .chat-footer button {
      padding: 10px 18px;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      background: #00a884;
      color: black;
      font-size: 15px;
      font-weight: bold;
    }

    .chat-footer button:hover {
      background: #00c896;
    }

    /* Username popup */
    .popup {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .popup-box {
      background: #202c33;
      padding: 20px;
      border-radius: 12px;
      width: 300px;
      text-align: center;
      color: white;
      box-shadow: 0 5px 20px rgba(0,0,0,0.7);
    }

    .popup-box input {
      width: 90%;
      padding: 10px;
      margin-top: 10px;
      border-radius: 10px;
      border: none;
      outline: none;
      font-size: 15px;
    }

    .popup-box button {
      margin-top: 12px;
      padding: 10px 15px;
      border: none;
      border-radius: 10px;
      background: #00a884;
      font-weight: bold;
      cursor: pointer;
    }
      @media (max-width: 768px) {

  body {
    align-items: stretch;
  }

  .chat-container {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  .users-panel {
    width: 100%;
    min-width: 100%;
    height: 120px;
    border-right: none;
    border-bottom: 2px solid #111b21;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .user-item {
    min-width: 120px;
    text-align: center;
  }

  .chat-footer input {
    font-size: 14px;
  }

  .chat-footer button {
    padding: 8px 14px;
    font-size: 14px;
  }
}

  </style>
</head>

<body>

  <div class="popup" id="popup">
    <div class="popup-box">
      <h2>Enter Your Name</h2>
      <input type="text" id="usernameInput" placeholder="Your name...">
      <button onclick="setUsername()">Join Chat</button>
    </div>
  </div>

  <div class="chat-container">

    <div class="users-panel">
      <h2>Online Users</h2>
      <div id="usersList"></div>
    </div>

    <div class="chat-area">
      <div class="chat-header">
        Error Unlimited
        <div class="status" id="typingStatus"></div>
      </div>

      <div id="messageDisplay" class="chat-body"></div>

      <div class="chat-footer">
        <input type="text" id="message" placeholder="Type a message..." disabled>
        <button onclick="sendMessage()" disabled id="sendBtn">Send</button>
      </div>
    </div>

  </div>

<script src="/socket.io/socket.io.js"></script>

<script>
  const socket = io();
  const messageBox = document.getElementById("messageDisplay");
  const messageInput = document.getElementById("message");
  const typingStatus = document.getElementById("typingStatus");
  const popup = document.getElementById("popup");
  const usernameInput = document.getElementById("usernameInput");
  const sendBtn = document.getElementById("sendBtn");
  const usersList = document.getElementById("usersList");

  let username = "";
  let typingTimeout;

  // store message element by msgId
  let myMessages = {};

  function getTime(){
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    if(m < 10) m = "0" + m;
    return h + ":" + m;
  }

  function setUsername(){
    username = usernameInput.value.trim();
    if(!username) return alert("Enter a valid name");

    socket.emit("join", username);

    popup.style.display = "none";
    messageInput.disabled = false;
    sendBtn.disabled = false;
  }

  function updateUsersList(users){
    usersList.innerHTML = "";
    users.forEach(u => {
      const div = document.createElement("div");
      div.className = "user-item";
      div.textContent = u;
      usersList.appendChild(div);
    });
  }

  function addSeparator(){
    const separator = document.createElement("div");
    separator.className = "separator";
    messageBox.appendChild(separator);
  }

  function sendMessage(){
    const msg = messageInput.value.trim();
    if(!msg) return;

    const msgId = Date.now() + "-" + Math.random().toString(36).substring(2, 8);

    socket.emit("message", {
      msgId,
      username,
      msg,
      time: getTime()
    });

    const element = document.createElement("div");
    element.className = "message you";
    element.innerHTML = \`
      <div class="sender">You</div>
      <div>\${msg}</div>
      <div class="msg-footer">
        <span>\${getTime()}</span>
        <span class="ticks" id="tick-\${msgId}">✓</span>
      </div>
    \`;

    messageBox.appendChild(element);
    myMessages[msgId] = document.getElementById("tick-" + msgId);

    addSeparator();
    messageBox.scrollTop = messageBox.scrollHeight;
    messageInput.value = "";

    socket.emit("stop-typing");
  }

  socket.on("new-message", (data) => {
    const element = document.createElement("div");
    element.className = "message friend";
    element.innerHTML = \`
      <div class="sender">\${data.username}</div>
      <div>\${data.msg}</div>
      <div class="msg-footer">
        <span>\${data.time}</span>
        <span></span>
      </div>
    \`;

    messageBox.appendChild(element);
    addSeparator();
    messageBox.scrollTop = messageBox.scrollHeight;

    // receiver got message -> send seen event
    socket.emit("seen", data.msgId);
  });

  // Delivered event (receiver got message)
  socket.on("delivered", (msgId) => {
    if(myMessages[msgId]){
      myMessages[msgId].textContent = "✓✓"; // delivered
    }
  });

  // Seen event
  socket.on("seen-status", (msgId) => {
    if(myMessages[msgId]){
      myMessages[msgId].textContent = "✓✓"; 
      myMessages[msgId].style.color = "#00c2ff"; // blue tick
    }
  });

  // Typing system
  messageInput.addEventListener("input", () => {
    socket.emit("typing", username);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop-typing");
    }, 1000);
  });

  socket.on("typing-status", (data) => {
    typingStatus.textContent = data;
  });

  // online users list update
  socket.on("users-list", (data) => {
    updateUsersList(data);
  });

  // Enter press send
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
</script>

</body>
</html>
  `);
});

function getOnlineUsers() {
  return Object.values(users);
}

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("users-list", getOnlineUsers());
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("new-message", data);

    // sender gets delivered tick when message broadcasted
    socket.emit("delivered", data.msgId);
  });

  socket.on("seen", (msgId) => {
    // send seen status to all (only sender will update because msgId exists only sender side)
    io.emit("seen-status", msgId);
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing-status", username + " is typing...");
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("typing-status", "");
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users-list", getOnlineUsers());
    socket.broadcast.emit("typing-status", "");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
