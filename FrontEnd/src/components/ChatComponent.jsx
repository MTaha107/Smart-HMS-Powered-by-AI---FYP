import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { socket } from "../socket";
import { useLocation } from "react-router-dom";

export default function ChatComponent({selecteddoctor}) {

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

    return () => {
      socket.off("receiveMessage");
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
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();
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
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formatTime(msg.createdAt || msg.timestamp)}
              </p>
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
