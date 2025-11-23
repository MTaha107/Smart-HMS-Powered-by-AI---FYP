import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Message() {

    const navigate = useNavigate();

  return (
<div className="w-full h-screen bg-gray-100 flex">


{/* Sidebar */}
<div className="w-1/3 md:w-1/4 bg-white border-r overflow-y-auto">
<div className='flex justify-between border-b'>
<button onClick={() => navigate(-1)} className=" hover:bg-gray-100 cursor-pointer p-4  font-semibold text-lg ">Back</button>
<div className=" hover:bg-gray-100 cursor-pointer p-4  font-semibold text-lg">Chats</div>
</div>

{/* Chat List Item */}
<div className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b">
<div className="w-10 h-10 rounded-full bg-green-400"></div>
<div>
<p className="font-medium">John Doe</p>
<p className="text-sm text-gray-500">Hey, what's up?</p>
</div>
</div>


<div className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b">
<div className="w-10 h-10 rounded-full bg-blue-400"></div>
<div>
<p className="font-medium">Sarah</p>
<p className="text-sm text-gray-500">Are we meeting today?</p>
</div>
</div>
</div>


{/* Chat Area */}
<div className="flex-1 flex flex-col">
{/* Top Bar */}
<div className="w-full bg-white shadow p-4 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-green-400"></div>
<div>
<p className="font-semibold">John Doe</p>
<p className="text-sm text-gray-500">online</p>
</div>
</div>


{/* Messages Section */}
<div className="flex-1 overflow-y-auto p-4 space-y-4  bg-cover">
{/* Received message */}
<div className="flex">
<div className="max-w-xs bg-white p-3 rounded-xl shadow text-gray-800">
Hey! How are you?
</div>
</div>


{/* Sent message */}
<div className="flex justify-end">
<div className="max-w-xs bg-gray-200 p-3 rounded-xl shadow text-gray-800">
I’m good! What about you?
</div>
</div>
</div>


{/* Input Section */}
<div className="w-full bg-white p-3 flex items-center gap-3 border-t">
<input
type="text"
placeholder="Type a message..."
className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
<button className="p-3 bg-black hover:bg-gray-900 rounded-full text-white shadow">
{'>'}
</button>
</div>
</div>


</div>
);
}
