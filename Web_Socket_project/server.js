const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join Room
  socket.on("join-room", (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const roomSize = room ? room.size : 0;

    if (roomSize >= 2) {
      socket.emit("room-full");
      return;
    }

    socket.join(roomId);
    socket.roomId = roomId;

    console.log(`User ${socket.id} joined room: ${roomId}`);

    socket.emit("joined-room", roomId);

    // notify other user in room
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // Relay Offer
  socket.on("offer", (offer) => {
    if (!socket.roomId) return;
    socket.to(socket.roomId).emit("offer", offer);
  });

  // Relay Answer
  socket.on("answer", (answer) => {
    if (!socket.roomId) return;
    socket.to(socket.roomId).emit("answer", answer);
  });

  // Relay ICE Candidate
  socket.on("candidate", (candidate) => {
    if (!socket.roomId) return;
    socket.to(socket.roomId).emit("candidate", candidate);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.roomId) {
      socket.to(socket.roomId).emit("user-left", socket.id);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
