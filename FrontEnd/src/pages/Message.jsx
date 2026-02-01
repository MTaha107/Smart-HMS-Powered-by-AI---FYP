import { createSessionStorage, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatComponent from "../components/ChatComponent";

export default function Message() {

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const searchParams = useSearchParams();
    const id = searchParams[0].get("id");
    const role = searchParams[0].get("role");
    const [doctors, setdoctors] = useState([]);
    const [users, setusers] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

     const fetchDoctors = async () => {
        try {
          const res = await axios.get(`${API}/messages/allDoctorsData`,
         );
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

      useEffect(() => {
    fetchDoctors();
    fetchUsers();
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
<div onClick={() => setSelectedDoctor(user)} key={user._id} className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b">
<div  className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">{user.name[0]}</div>
<div>
<p className="font-medium">{user.name}</p>
<p className="text-sm text-gray-500">Hey, what's up?</p>
</div>
</div>))
}
</div>


{/* Chat Area */}
{selectedDoctor ? (<ChatComponent selecteddoctor={selectedDoctor} />) : (
<div className="flex-1 flex items-center justify-center">
<p className="text-gray-500 text-lg">Select a doctor to start messaging</p></div>)}


</div>
);
}
