const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: '*'
  }
});

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("join-room", (username, room) => {
    socket.join(room);
    socket.emit("receive-message", `${username} has joined room: ${room}.`);
    socket.to(room).emit("receive-message", `${username} has joined room: ${room}.`);
  });
  socket.on("leave-room", (username, room) => {
    socket.to(room).emit("receive-message", `${username} has left the room.`);
    socket.leave(room);
  });
  socket.on("send-message", (username, message, room) => {
    socket.to(room).emit("receive-message", `${username}: ${message}`);
  });
});;