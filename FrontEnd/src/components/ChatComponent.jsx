import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { socket } from "../socket";
import { useLocation } from "react-router-dom";

export default function ChatComponent({selecteddoctor, onMessagesRead}) {

  const API = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesBottomRef = useRef(null);
  const location = useLocation();
  const id = location.state?.id;
  const token = localStorage.getItem("token");

  // Format timestamp to HH:MM AM/PM
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Mark messages as read
  const markMessagesAsRead = async (messageIds) => {
    try {
      for (const msgId of messageIds) {
        await axios.put(`${API}/messages/markRead/${msgId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  // Mark all messages from other user as read
  const markAllAsRead = async () => {
    try {
      const response = await axios.put(`${API}/messages/markAllRead/${id}/${selecteddoctor.name}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update local state to show messages as read
      setMessages(prev =>
        prev.map(msg =>
          msg.senderid === selecteddoctor.name && msg.receiverid === id && !msg.isRead
            ? { ...msg, isRead: true, readAt: new Date().toISOString() }
            : msg
        )
      );

      // Notify parent component that messages have been read
      if (onMessagesRead) {
        onMessagesRead(selecteddoctor.name);
      }

      // Emit socket event to notify other users
      socket.emit("messagesMarkedAsRead", {
        userName: selecteddoctor.name,
        userId: id
      });
      
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

    // ---------------- connect socket ----------------
  useEffect(() => {
    socket.connect();

    socket.emit("join", id);

    socket.on("receiveMessage", (msg) => {
      // prevent duplicates
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    // Listen for read status updates
    socket.on("messageRead", (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, isRead: true, readAt: data.readAt }
            : msg
        )
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageRead");
      socket.disconnect();
    };
  }, [id]);

 // ---------------- load chat history ----------------
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API}/messages/${id}/${selecteddoctor.name}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
        setMessages(res.data);
        
        // Mark unread messages from other user as read
        const unreadMessages = res.data.filter(
          msg => msg.receiverid === id && msg.senderid === selecteddoctor.name && !msg.isRead
        );
        if (unreadMessages.length > 0) {
          await markAllAsRead();
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (selecteddoctor && id) {
      loadMessages();
    }
  }, [id, selecteddoctor.name]);
  
  // ---------------- auto-scroll to bottom ----------------
  useEffect(() => {
    messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
   // ---------------- send message ----------------
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      userid: id,
      senderid: id,
      receiverid: selecteddoctor.name,
      messageText: message,
    });

    setMessage("");
  };

  // Get read status indicator
  const getReadIndicator = (msg) => {
    if (msg.senderid !== id) return null; // Only show for sent messages
    
    return (
      <span className="ml-1">
        {msg.isRead ? (
          <span className="text-blue-500 font-bold">✓✓</span>
        ) : (
          <span className="text-gray-400">✓</span>
        )}
      </span>
    );
  };

  return (
      <div className="flex-1 flex flex-col">
{/* Top Bar */}
<div className="w-full bg-white shadow p-4 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">{selecteddoctor.name[0]}</div>
<div>
<p className="font-semibold">{selecteddoctor.name}</p>
<p className="text-sm text-gray-500">online</p>
</div>
</div>

{/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cover">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderid === id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl shadow ${
                msg.senderid === id
                  ? "bg-gray-200"
                  : "bg-white"
              }`}
            >
              <p className="text-gray-800 text-left">{msg.messageText}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  {formatTime(msg.createdAt || msg.timestamp)}
                </p>
                {getReadIndicator(msg)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesBottomRef} />
      </div>


{/* Input Section */}
<div className="w-full bg-white p-3 flex items-center gap-3 border-t">
 <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
<button onClick={sendMessage} className="p-3 bg-black hover:bg-gray-900 rounded-full text-white shadow">
{'>'}
</button>
</div>
</div>
  )
}
