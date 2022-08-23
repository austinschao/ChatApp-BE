const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: '*'
  }
});

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("joinRoom", (username, room) => {
    socket.join(room);
    socket.to(room).emit("receiveMessage", `${username} has joined room: ${room}.`);

  });
  socket.on("send-message", (username, message, room) => {
    socket.to(room).emit("receiveMessage", `${username}: ${message}`);
  });
});;