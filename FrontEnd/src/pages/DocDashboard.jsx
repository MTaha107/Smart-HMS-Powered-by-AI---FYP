import React from 'react'
import { useState, useEffect } from 'react';
import { Link,} from 'react-router-dom';
import logo from "../assets/images/logo.png";
import drpfp from "../assets/images/drpfp.jpeg";


export default function DocDashboard() {
 
     const [patient, setPatient] = useState([{name: "Unknown",
                                             appointmentDate: 200,
                                             time: 10,
                                           }] );
   
 
 
 const addpatient = async(id) => {
 };
 
 const removepatient = async (id) => {
 };
 
 
   return (
     <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
       {/* Sidebar and Main Content */}
       <div className="layout-container flex h-full grow flex-col lg:flex-row">
         {/* Sidebar */}
         <div className="layout-content-container flex flex-col w-full lg:w-80 bg-slate-50 border-r border-gray-200">
           <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between p-4">
             <div className="flex flex-col gap-4 ">
            
               <div className="flex  justify-center items-center gap-3 mb-6 mt-4">
                <div className="flex flex-col items-center space-x-2">
                      <img src={drpfp} alt="Logo" className="w-20 h-20 rounded-full mb-3" />
                      <p className='text-black font-bold'>Dr Mario</p>
                    </div>
               </div>
               
               <div className="flex flex-col gap-2">
 
                   <Link to="/message">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                   <p className="text-[#0d141c] text-[17px] font-bold">Message</p>
                   </div></Link>

                     <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                   <p className="text-[#0d141c] text-[17px] font-bold">Log out</p>
                   </div></Link>
 
               </div>
             </div>
           </div>
         </div>
 
         {/* Main Content */}
         <div className="layout-content-container flex flex-col flex-1">
           <div className="flex flex-wrap justify-between gap-3 p-4">
             <p className="text-[#0d141c] tracking-light text-2xl md:text-3xl font-bold leading-tight">Doctor's Dashboard</p>
           </div>
 
          
           {/* patients  Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
             {/* patients */}
             <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
               <p className="text-base font-bold">Appointment Requests</p>
               <p className="text-2xl font-bold">{patient.length}</p>
               <div className="space-y-2 mt-2">
                 {patient.map((p) => (
                   <div key={p.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                     <div className='text-left'>
                     <p className="text-lg font-bold">{p.name}</p>
                     <p className="text-sm font-medium">Date:{p.appointmentDate}</p>
                     <p className="text-sm font-medium">Hours: ({p.time})</p>
                 </div>
                     <div className="flex gap-3">
                       <button onClick={() => addpatient(p._id)} className="mr-4 text-green-600 hover:text-green-800 cursor-pointer">✔️</button>
                      <button onClick={() => removepatient(p._id)} className="text-green-600 hover:text-green-800 cursor-pointer">❌</button>
                   </div>
                   </div>
                 ))}
               </div>
             </div>
 
            
 
             {/* Hired  patients */}
          <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
   <p className="text-base font-bold">Today's appointmnets</p>
   {patient.map((patient) => (
     <div key={patient._id} className="flex items-center justify-between bg-gray-100 p-2 rounded border-b pb-2 last:border-none">
       <div className='text-left'>
       <p className="text-lg ">{patient.name}</p>
       <p className="text-sm text-gray-500x font-medium">Fees:{patient.fees}</p>
       </div>
       <button
         onClick={() => removepatient(patient._id)}
         className="text-red-600 hover:text-red-800 cursor-pointer"
       >
         ❌
       </button>
     </div>
   ))}
 
 </div>
  </div>
 
           
 
 
 
           {/* patient Health & Status */}
           <h2 className="text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">patient Info</h2>
           <div className="p-6">
            
 
             <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
               <p className="text-base font-medium">patient Status</p>
               {patient.map((patient) => (
                 <div key={patient._id} className="flex items-center justify-between">
                   <p className="font-medium">{patient.name}</p>
                   <div className="flex items-center gap-2">
                     <span className={`w-3 h-3 rounded-full `}></span>
                     <p>{patient.status}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
   
}
