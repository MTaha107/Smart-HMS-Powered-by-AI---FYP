import React, { useState, useEffect } from "react";
import { useRef} from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";


const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [DoctorName, setDoctorName] = useState("Dr Shahroz Babar");
  const [doctorFees, setDoctorFees] = useState(0);
  const [startingHour, setStartingHour] = useState(9);
  const [endingHour, setEndingHour] = useState(17);
   
  const [users, setUsers] = useState([]);


const AddAdmin = async (id) => {
 
};


  // Remove Admin (demote)
const RemoveAdmin = async (id) => {
     
};



const addDoctor = async () => {
     setDoctors(prev => [
    ...prev,
    {
      name: DoctorName,
      fees: doctorFees,
      ishired: false,
      startingHour: startingHour,
      endingHour: endingHour,
    }
  ]);
};


const removeDoctor = async (id) => {
  setDoctors(prev => prev.filter(doctor => doctor.id !== id));
};


const increasePrice = async (id) => {
 
};

const decreasePrice = async (id) => {
 
};


const getHealthColor = (health) =>
  health > 70 ? "bg-green-600" : health > 40 ? "bg-yellow-500" : "bg-red-600";

const getStatusColor = (status) => {
  switch (status) {
    case "Operational":
      return "bg-green-600";
    case "Maintenance":
      return "bg-yellow-500";
    case "Repair":
      return "bg-red-600";
    case "Idle":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};



 
  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="layout-content-container flex flex-col w-full lg:w-80 bg-slate-50 border-r border-gray-200">
          <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 ">
                <div className="flex items-center space-x-2">
                      <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                      <p className='text-black font-bold'>Medi Care</p>
                    </div>
               
              </div>
              <div className="flex flex-col gap-2">
               <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                                 <p className="text-[#0d141c] text-[17px] font-bold">Go to home page</p>
                                </div></Link>
                
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d141c] tracking-light text-2xl md:text-3xl font-bold leading-tight">
              Admin Dashboard
            </p>
          </div>


          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">    
<div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Add Doctors</p>
<hr />
  {/* Add button */}
  <label htmlFor={DoctorName}>Enter Doctor's Name</label>
  <input    value={DoctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter name for Doctor" 
            type="text" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
  <hr />
  <label htmlFor={doctorFees}>Enter Doctor's Fees</label>
  <input    value={doctorFees}
            onChange={(e) => setDoctorFees(e.target.value)}
            placeholder="Enter fees for Doctor" 
            type="number" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
    <hr />
  <label htmlFor={startingHour}>Enter Starting Hour</label>
  <input    value={startingHour}
            onChange={(e) => setStartingHour(e.target.value)}
            placeholder="Enter Starting Hour" 
            type="number" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
      <hr />
  <label htmlFor={endingHour}>Enter Ending Hour</label>
  <input    value={endingHour}
            onChange={(e) => setEndingHour(e.target.value)}
            placeholder="Enter Starting Hour" 
            type="number" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
  
  <button
    onClick={addDoctor}
    className="mt-1 px-2 py-1 bg-black text-white rounded hover:bg-gray-700 text-sm"
  >
    ➕ Add Doctor
  </button>
  <hr />

  {/* Doctor list */}
  <div className="space-y-2 mt-2">
    {doctors.length === 0 ? (
      <p className="text-gray-500 text-sm italic">No doctors available</p>
    ) : (
      doctors.map((Doctor) => (
        <div
          key={Doctor._id}
          className="flex justify-between items-center bg-gray-50 p-2 rounded"
        >
          <p className="text-sm font-medium">{Doctor.name}</p>
          <button
            onClick={() => removeDoctor(Doctor._id)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            ❌
          </button>
        </div>
      ))
    )}
  </div>
</div>




            {/* Doctor Fee */}
            <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Doctor's Info</p>
              <hr />
                <p className="text-xl font-bold">{doctors.filter((doctor) => doctor.ishired === false ).length}</p>

              <hr />
              {doctors.map((Doctor) => (
                <div
                  key={Doctor._id}
                  className="flex items-center justify-center border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="text-sm font-bold">{Doctor.name}</p>
                    <p className="text-lg font-medium">Fees:${Doctor.fees}</p>
                    <p className="text-lg font-medium">Hours: ({Doctor.startingHour} to {Doctor.endingHour})</p>
                  </div>
                </div>
              ))}
            </div>




            
    {/* Admin Requests */}
            <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Admin Requests</p>
              {users.filter(user => user.role === "admin" || user.role === "requestAdmin").map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-lg font-bold">
                     {user.role}

                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => AddAdmin(user._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => RemoveAdmin(user._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
            

          </div>

          {/* Doctor Health & Status */}
          <h2 className=" text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">
            Doctor Health
          </h2>
          
          <div className="  p-6">
            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">Doctor Status</p>
              {doctors.filter((doctor) => doctor.ishired === false ).map((Doctor) => (
                <div
                  key={Doctor._id}
                  className="flex items-center justify-between"
                >
                  <p className="font-medium">{Doctor.name}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        Doctor.status
                      )}`}
                    ></span>
                    <p>{Doctor.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
