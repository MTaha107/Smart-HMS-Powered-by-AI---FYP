import React from 'react'
import { useState, useEffect } from 'react';
import { Link,} from 'react-router-dom';
import drpfp from "../assets/images/drpfp.jpeg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


export default function DocDashboard() {
 
  const [patient, setPatient] = useState([{name: "Unknown",
                                             appointmentDate: 200,
                                             time: 10,
                                           }] );
  const [doctors, setDoctors] = useState([]);
  const [staringHour, setStartingHour] = useState("");
  const [endingHour, setEndingHour] = useState("");
  const [fees, setFees] = useState(0);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const [role, setRole] = useState("doctor");
  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
   

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API}/doctorsData/doctorsPersonalData`,
       { params: { name: id } }
    );
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };
 
  useEffect(() => {
    fetchDoctors();
  }, []);
                                          
 const setTime = async() => {
   try {
        const res = await axios.post(`${API}/doctorsData/register`, {
          userName: id,
          startingHour: staringHour,
          endingHour: endingHour,
          role: role, 
          fees: fees
        }); 
       } catch (err) {
        console.error("Signup error:", err.response?.data || err.message);
      } 
      fetchDoctors(); 
 }

 const removeHours = async(id) => {
   axios.delete(`${API}/doctorsData/delete/${id}`, {})
  .then(() => {
    setDoctors(prev => prev.filter(doctor => doctor._id !== id));
  })
  .catch(err => console.error(err.response?.data || err.message));
 }

 const addpatient = async(id) => {
    try {
    await axios.patch(`${API}/doctorsData/updateStatus/${id}`, {
      requeststatus: "accepted"
    });
    fetchDoctors(); 
  } catch (err) {
    console.error(err);
  }
 };
 
 const removepatient = async (id) => {
    axios.delete(`${API}/doctorsData/delete/${id}`, {})
  .then(() => {
    setDoctors(prev => prev.filter(doctor => doctor._id !== id));
  })
  .catch(err => console.error(err.response?.data || err.message));
 };
 
 const LogOut = () => {
  localStorage.removeItem("token");
  navigate("/login");
}
 
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
                      <p className='text-black font-bold'>{id}</p>
                    </div>
               </div>
               
               <div className="flex flex-col gap-2">
 
                   <Link to={`/message?id=${id}&role=doctor`}>   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                   <p className="text-[#0d141c] text-[17px] font-bold">Message</p>
                   </div></Link>

                     <button onClick={()=>LogOut()}>   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                   <p className="text-[#0d141c] text-[17px] font-bold">Log out</p>
                   </div></button>
 
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
               <p className="text-base font-bold">Select time slot</p>
               <hr />

               <div className="space-y-2 mt-2 flex flex-col align-center justify-center">
                <label htmlFor="startingHour">Enter Starting Hour</label>
                <input 
                id='startingHour'
                value={staringHour}
                type="time" 
                className='bg-gray-200 rounded-l p-2'
                onChange={(e)=> {setStartingHour(e.target.value)}}  />
                <hr />

                <label htmlFor="endingHour">Enter Ending Hour</label>
                <input 
                id='endingHour'
                value={endingHour} 
                type="time" 
                className='bg-gray-200 rounded-l p-2'
                onChange={(e)=>{setEndingHour(e.target.value)}}  />
                <hr />
                <label htmlFor="fees">Enter Fees</label>
                <input 
                id='fees'
                value={fees} 
                type="number" 
                className='bg-gray-200 rounded-l p-2'
                onChange={(e)=>{setFees(e.target.value)}}  />
                <hr />
                <button className='bg-gray-200 p-2 rounded-l hover:bg-gray-300' onClick={() => setTime()}>Set Info</button>
               </div>
             </div>
 
            
 
             {/* Hired  patients */}
          <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
   <p className="text-base font-bold">Your Info</p>
   <hr />
  {doctors.filter((e) => e.name === id && e.requeststatus === "none").map((e)=>{
    return (<div className='bg-gray-200  p-2 rounded-l flex justify-between'>
    <div className='flex flex-col items-start gap-2'>
    <p className='text-l font-bold'>Starting Hour:{e.startingHour}</p>
    <p className='text-l font-bold'>Ending Hour:{e.endingHour}</p>
    <p className='text-l font-bold'>Fees:{e.fees}Rs</p>
    </div>
    
    <button onClick={()=>removeHours(e._id)} className='hover:bg-gray-300 rounded-xl p-2'>❌</button>
   </div>);
  })} 
 
 </div>
  </div>
 
           
 
 
 
           {/* patient Health & Status */}
           <h2 className="text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">patient Info</h2>
            
           {/* patients  Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
             {/* patients */}
             <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
               <p className="text-base font-bold">Appointment Requests</p>
               <p className="text-2xl font-bold">{patient.filter((e) => e.name === id && e.requeststatus === "pending").length}</p>
               <div className="space-y-2 mt-2">
                 {doctors.filter((e) => e.name === id && e.requeststatus === "pending").map((p) => (
                   <div key={p._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                     <div className='text-left'>
                     <p className="text-lg font-bold">{p.requestBy}</p>
                     <p className="text-sm font-medium">Date:{p.appointmentDate}</p>
                     <p className="text-sm font-medium">Time: ({p.requestTime})</p>
                     <p className={`text-sm font-medium ${p.requeststatus === "accepted" ? "text-green-600" : "text-yellow-600" }`}>Status: ({p.requeststatus})</p>
                 </div>
                     <div className="flex gap-3">
                       <button onClick={() => addpatient(p._id)} className='hover:bg-gray-300 rounded-xl p-2'>✔️</button>
                      <button onClick={() => removepatient(p._id)} className='hover:bg-gray-300 rounded-xl p-2'>❌</button>
                   </div>
                   </div>
                 ))}
               </div>
             </div>
 
            
 
             {/* Hired  patients */}
          <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
   <p className="text-base font-bold">Appointmnets</p>
   {doctors.filter((e) => e.name === id && e.requeststatus === "accepted").map((patient) => (
     <div key={patient._id} className="flex items-center justify-between bg-gray-100 p-2 rounded border-b pb-2 last:border-none">
       <div className='text-left'>
       <p className="text-lg ">{patient.requestBy}</p>
       <p className="text-sm text-gray-500x font-medium">Fees:{patient.fees}</p>
                     <p className="text-sm font-medium">Date:{patient.appointmentDate}</p>
                     <p className="text-sm font-medium">Time: ({patient.requestTime})</p>
                     <p className={`text-sm font-medium ${patient.requeststatus === "accepted" ? "text-green-600" : "text-yellow-600" }`}>Status: ({patient.requeststatus})</p>
       </div>
       <button onClick={() => removepatient(patient._id)} className='hover:bg-gray-300 rounded-xl p-2'> ❌ </button>
     </div>
   ))}
 
 </div>
  </div>
 
           
 
         </div>
       </div>
     </div>
   );
   
}
