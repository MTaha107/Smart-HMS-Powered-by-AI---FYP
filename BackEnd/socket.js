const Message = require("./models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Receive message from frontend
    socket.on("sendMessage", async (data) => {
      try {
        const { userid, senderid, receiverid, messageText } = data;

        const newMessage = new Message({
          userid,
          senderid,
          receiverid,
          messageText,
        });

        const savedMessage = await newMessage.save();

        socket.join(userid);
        socket.join(receiverid);
        io.to(receiverid).emit("receiveMessage", savedMessage);
        io.to(senderid).emit("receiveMessage", savedMessage);

      } catch (error) {
        console.error("Message error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
