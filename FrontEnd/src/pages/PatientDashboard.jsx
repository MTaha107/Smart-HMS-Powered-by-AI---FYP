import React from 'react'
import { useState, useEffect } from 'react';
import { Link,} from 'react-router-dom';
import logo from "../assets/images/logo.png";

const PatientDashboard = () => {
  
    const [doctors, setdoctors] = useState([{name: "Unknown",
                                            fees: 200,
                                            ishired: false,
                                            startingHour: 10,
                                            endingHour: 18,
                                          }] );
    const [date, setDate] = useState('');
    const [time, setTime] = useState(''); 
    const [popUp, setPopUp] = useState(false);



const adddoctor = async(id) => {
  setPopUp(true);
};

const bookappointment = async(id) => {
  setPopUp(false);
}

const removedoctor = async (id) => {
};


  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Sidebar and Main Content */}
      <div className="layout-container flex h-full grow flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="layout-content-container flex flex-col w-full lg:w-80 bg-slate-50 border-r border-gray-200">
          <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between p-4">
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center gap-3  ">
               <div className="flex items-center space-x-2">
                     <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                     <p className='text-black font-bold'>Medi Care</p>
                   </div>
              </div>
              <div className="flex flex-col gap-2">

                  <Link to="/message">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Message</p>
                  </div></Link>

                  <Link to="/aiDoc">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Ai Doc</p>
                  </div></Link>

                  <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Log Out</p>
                  </div></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d141c] tracking-light text-2xl md:text-3xl font-bold leading-tight">Patient's Dashboard</p>
          </div>

         
          {/* doctors  Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            {/* doctors */}
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Request/Book Appointments</p>
              <p className="text-2xl font-bold">{doctors.filter((d) => d.ishired === false ) .length}</p>
              <div className="space-y-2 mt-2">
                {doctors.filter((d) => d.ishired === false ) 
   .map((doctor) => (
                  <div key={doctor.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <div className='text-left'>
                    <p className="text-lg font-bold">{doctor.name}</p>
                    <p className="text-sm font-medium">Fees:{doctor.fees}</p>
                    <p className="text-sm font-medium">Hours: ({doctor.startingHour} to {doctor.endingHour})</p>
                </div>
                    <div className="flex gap-3">
                      <button onClick={() => adddoctor(doctor._id)} className="text-green-600 hover:text-green-800 cursor-pointer">➕</button>


{
  popUp?
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
{/* Box For Date and time */}
    <div className="flex flex-col gap-4 fixed bg-gray-500 rounded-lg p-4 shadow-lg">
      <button className="text-green-600 hover:text-green-800 cursor-pointer" onClick={()=> setPopUp(false)}>❌</button>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded text-white"
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 rounded text-white"
      />

      <p className='text-white'>You selected: {date} {time}</p>
      <button className="text-white bg-black rounded-lg p-2 hover:text-gray-800 cursor-pointer" onClick={()=> bookappointment()}> OK </button>
    </div>
</div>
:null
}

                    </div>
                  </div>
                ))}
              </div>
            </div>

           

            {/* Hired  doctors */}
         <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Your Appointments</p>
  {doctors.map((doctor) => (
    <div key={doctor._id} className="flex items-center justify-between bg-gray-100 p-2 rounded border-b pb-2 last:border-none">
      <div className='text-left'>
      <p className="text-lg ">{doctor.name}</p>
      <p className="text-sm text-gray-500x font-medium">Fees:{doctor.fees}</p>
      </div>
      <button
        onClick={() => removedoctor(doctor._id)}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        ❌
      </button>
    </div>
  ))}

</div>
 </div>

          



          {/* doctor Health & Status */}
          <h2 className="text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">Doctor Info</h2>
          <div className="p-6">
           

            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">doctor Status</p>
              {doctors.map((doctor) => (
                <div key={doctor._id} className="flex items-center justify-between">
                  <p className="font-medium">{doctor.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full `}></span>
                    <p>{doctor.status}</p>
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

export default PatientDashboard
