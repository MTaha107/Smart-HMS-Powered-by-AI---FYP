const Message = require("./models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

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

    // Handle messages marked as read
    socket.on("messagesMarkedAsRead", (data) => {
      try {
        // Broadcast to all clients including the sender
        io.emit("messagesMarkedAsRead", data);
      } catch (error) {
        console.error("Mark read broadcast error:", error);
      }
    });

    // Handle individual message read status
    socket.on("markMessageRead", async (data) => {
      try {
        const { messageId, senderid } = data;
        
        const message = await Message.findByIdAndUpdate(
          messageId,
          { isRead: true, readAt: new Date() },
          { new: true }
        );

        // Notify the sender that message was read
        io.to(senderid).emit("messageRead", {
          messageId,
          isRead: true,
          readAt: message.readAt
        });
      } catch (error) {
        console.error("Mark read error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
