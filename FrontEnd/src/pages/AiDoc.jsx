import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png"
import axios from 'axios';

const AiDoc = () => {
const navigate = useNavigate();
const API = import.meta.env.VITE_API_URL; 
const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  
const handleLogout = () => {
   localStorage.removeItem("token");
  navigate("/");
  };

   const sendMessage = async () => {
    const res = await axios.post(`${API}/api/ai/chat`, {
      message
    });

    setChat([...chat,
      { role: "User", text: message },
      { role: "Ai Doc", text: res.data.reply }
    ]);

    setMessage("");
  };;

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Roboto", Inter, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf4] px-4 sm:px-6 lg:px-10 py-3">
        <div className="flex items-center gap-2 sm:gap-4 text-[#0d141c] ">
          <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                <p className='text-black font-bold'>Medi Care</p>
              </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden sm:flex sm:flex-1 justify-end gap-8">
          <a href="/" className="text-black text-[16px] font-bold transition-colors">Home</a>
          
            <button
  onClick={handleLogout}
  className="flex items-center gap-2 text-black-700 font-bold transition-colors cursor-pointer"
>
  <span className="hidden sm:inline cursor-pointer">Logout</span>
</button>
        </nav>

       
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black-700 focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

     
      {menuOpen && (
        <div className="sm:hidden flex flex-col bg-white border-b border-gray-200 px-4 py-3 space-y-2">
          <a href="/" className="text-black text-[16px] font-bold">Home</a>
       
            <button
  onClick={handleLogout}
  className="text-black text-[16px] font-bold"
>Logout
</button>

        </div>
      )}

    
      <div className="px-4 sm:px-6 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5">
          <h2 className="text-[#0d141c] text-[22px] sm:text-[28px] font-bold text-center pb-3 pt-5">
            How can we help?
          </h2>

          <div className="flex gap-2 px-2 sm:px-4 mb-4">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your symptoms"
            />
            <button onClick={sendMessage} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
              Ask
            </button>
          </div>
         
           <div className="flex flex-col text-left ">
        {chat.map((c, i) => (
          <p className="mt-3 mb-4 bg-gray-200 m-2 p-2 rounded" key={i}><b>{c.role}:</b> {c.text} </p>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
}

export default AiDoc
