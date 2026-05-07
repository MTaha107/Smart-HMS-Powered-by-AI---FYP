import { createSessionStorage, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import ChatComponent from "../components/ChatComponent";

export default function Message() {

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const searchParams = useSearchParams();
    const location = useLocation();
    const id = location.state?.id;
    const role = searchParams[0].get("role");
    const [doctors, setdoctors] = useState([]);
    const [users, setusers] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [unreadCounts, setUnreadCounts] = useState({});
    const token = localStorage.getItem("token");

     const fetchDoctors = async () => {
        try {
          const res = await axios.get(`${API}/messages/allDoctorsData`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
          setdoctors(res.data);
        } catch (err) {
          console.error(err);
        }
      };
       const fetchUsers = async () => {
        try {
          const res = await axios.get(`${API}/users/allUsers`,);
          setusers(res.data);
        }catch (err) {
          console.error(err);
        }
      };

      const fetchUnreadCounts = async () => {
        try {
          const res = await axios.get(`${API}/messages/unread/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Create a map of unread counts by user name
          const counts = {};
          // We'll populate this from message data
          setUnreadCounts(counts);
        } catch (err) {
          console.error("Error fetching unread counts:", err);
        }
      };

      const fetchUnreadPerUser = async (userName) => {
        try {
          // Fetch all messages with this user to count unread ones
          const res = await axios.get(`${API}/messages/${id}/${userName}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // Count unread messages from this user
          const unreadCount = res.data.filter(
            msg => msg.senderid === userName && msg.receiverid === id && !msg.isRead
          ).length-1;
          
          return unreadCount;
        } catch (err) {
          console.error("Error fetching messages:", err);
          return 0;
        }
      };

      const handleMessagesRead = (userName) => {
        // Reset unread count when messages are marked as read
        setUnreadCounts(prev => ({
          ...prev,
          [userName]: 0
        }));
      };

      const handleUserSelect = (user) => {
        setSelectedDoctor(user);
        // Clear unread count when opening a conversation
        setUnreadCounts(prev => ({
          ...prev,
          [user.name]: 0
        }));
      };

      useEffect(() => {
    fetchDoctors();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && id) {
      // Fetch unread count for each user
      users.forEach(async (user) => {
        const count = await fetchUnreadPerUser(user.name);
        setUnreadCounts(prev => ({
          ...prev,
          [user.name]: count
        }));
      });
    }
  }, [users, id]);

  useEffect(() => {
    // Listen for when messages are marked as read
    socket.on("messagesMarkedAsRead", (data) => {
      setUnreadCounts(prev => ({
        ...prev,
        [data.userName]: 0
      }));
    });

    return () => {
      socket.off("messagesMarkedAsRead");
    };
  }, []);

  return (
<div className="w-full h-screen bg-gray-100 flex">


{/* Sidebar */}
<div className="w-1/3 md:w-1/4 bg-white border-r overflow-y-auto">
<div className='flex justify-between border-b'>
<button onClick={() => navigate(-1)} className=" hover:bg-gray-100 cursor-pointer p-4  font-semibold text-lg ">Back</button>
<div className=" hover:bg-gray-100 cursor-pointer p-4  font-semibold text-lg">Chats</div>
</div>

{/* Chat List Item */}
{
users.filter((user) =>  role === "patient"
        ? user.role === "doctor"
        : user.role === "patient").map((user) => (
<div onClick={() => handleUserSelect(user)} key={user._id} className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b">
<div  className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">{user.name[0]}</div>
<div className="flex-1">
<div className="flex justify-between items-center">
<p className="font-medium">{user.name}</p>
{unreadCounts[user.name] > 0 && (
  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
    {unreadCounts[user.name]}
  </span>
)}
</div>
<p className="text-sm text-gray-500">Hey, what's up?</p>
</div>
</div>))
}
</div>


{/* Chat Area */}
{selectedDoctor ? (<ChatComponent selecteddoctor={selectedDoctor} onMessagesRead={handleMessagesRead} />) : (
<div className="flex-1 flex items-center justify-center">
<p className="text-gray-500 text-lg">Select a doctor to start messaging</p></div>)}


</div>
);
}
