const { Server } = require("socket.io");

let io;
module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
         origin:`${process.env.ADMIN_FRONTEND_URL}`,
        methods: ["GET", "POST"], 
        allowedHeaders:"*", 
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
