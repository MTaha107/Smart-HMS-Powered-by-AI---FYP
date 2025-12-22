import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const AdminDashboard = () => {

  const API = import.meta.env.VITE_API_URL;
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API}/users/doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDoctors(res.data);
  } catch (err) {
    console.error(err);
  }
};


 useEffect(() => {
  fetchDoctors();
 }, []);




const addDoctor = async () => {

   setLoading(true);
   setError("");

        try {
        const res = await axios.post(`${API}/users/register`, {
          username: doctorName,
          password: doctorPassword,
          role: role, 
        });
       fetchDoctors();

    setDoctorName("");
    setDoctorPassword("");

      } catch (err) {
        console.error("Signup error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
};


const removeDoctor = (id) => {
  const token = localStorage.getItem("token");

  axios.delete(`${API}/users/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(() => {
    setDoctors(prev => prev.filter(doctor => doctor._id !== id));
  })
  .catch(err => console.error(err.response?.data || err.message));
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
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">    
<div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Add Doctors</p>
<hr />
  {/* Add button */}
  <label htmlFor={doctorName}>Enter Doctor's Name/Username</label>
  <input    value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter name for Doctor" 
            type="text" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
  <hr />
    <label htmlFor={doctorPassword}>Enter Doctor's Password</label>
  <input    value={doctorPassword}
            onChange={(e) => setDoctorPassword(e.target.value)}
            placeholder="Enter Password for Doctor" 
            type="text" 
            className="bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" />
  
  <button
    onClick={addDoctor}
    className="mt-1 px-2 py-1 bg-black text-white rounded hover:bg-gray-700 text-sm"
  >
    ➕ Add Doctor
  </button>
  {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  <hr />
</div>

            {/* Doctor Fee */}
            <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Doctor's Info</p>
              <hr />
                <p className="text-xl font-bold">{doctors.length}</p>

              <hr />
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

        
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
