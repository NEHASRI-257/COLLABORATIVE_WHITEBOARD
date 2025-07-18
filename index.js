const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  // WebRTC signaling
  socket.on("propogate", (data) => {
    connections.forEach((con) => {
      if (con.id !== socket.id) {
        con.emit("onpropogate", data);
      }
    });
  });

  // 🎨 Real-time whiteboard events
  socket.on("draw", (data) => {
    socket.broadcast.emit("ondraw", data);
  });

  socket.on("mousedown", (data) => {
    socket.broadcast.emit("onmousedown", data);
  });

  socket.on("clear", () => {
    socket.broadcast.emit("onclear");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

// Serve frontend
app.use(express.static("public"));

// Start server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
