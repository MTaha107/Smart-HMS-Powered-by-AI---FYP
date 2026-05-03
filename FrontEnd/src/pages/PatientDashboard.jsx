import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import logo from "../assets/images/logo.png";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const PatientDashboard = () => {
  
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [doctors, setdoctors] = useState([] );
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState('');
    const [popUp, setPopUp] = useState(false);
    const location = useLocation();
    const id = location.state?.name;
    const [requeststatus, setRequeststatus] = useState("pending");

      const fetchDoctors = async () => {
        try {
          const res = await axios.get(`${API}/doctorsData/allDoctorsData`,);
          setdoctors(res.data);
        } catch (err) {
          console.error(err);
        }
      };

  useEffect(() => {
    fetchDoctors();
  }, []);

// Helper function to generate 15-minute time slots
const generateTimeSlots = (start, end) => {
  const slots = [];
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    return `${displayHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${meridiem}`;
  };

  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);

  for (let time = startMinutes; time < endMinutes; time += 15) {
    slots.push(formatTime(time));
  }

  return slots;
};

const adddoctor = async(id) => {
  setSelectedDoctor(id);
  setPopUp(true);
};

const bookappointment = async(slotTime) => {
  if (!date) {
    alert("Please select a date first!");
    return;
  }
   try {
          const res = await axios.post(`${API}/doctorsData/register`, {
            userName: selectedDoctor.name,
            desc: selectedDoctor.desc,
            startingHour: selectedDoctor.startingHour,
            endingHour: selectedDoctor.endingHour,
            role: selectedDoctor.role, 
            fees: selectedDoctor.fees,
            requestTime: slotTime,
            appointmentDate: date,
            requeststatus: requeststatus,
            requestBy: id,
          }); 
         } catch (err) {
          console.error("Appointment error:", err.response?.data || err.message);
        } 
        fetchDoctors(); 
  setPopUp(false);
}

const removedoctor = async (id) => {
  axios.delete(`${API}/doctorsData/delete/${id}`, {})
  .then(() => {
    setdoctors(prev => prev.filter(doctor => doctor._id !== id));
  })
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
              <div className="flex items-center gap-3  ">
               <div className="flex items-center space-x-2">
                     <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                     <p className='text-black font-bold'>Medi Care</p>
                   </div>
              </div>
              <div className="flex flex-col gap-2">

                  <Link to={`/message?role=patient`} state={{ id: id }}>   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Message</p>
                  </div></Link>

                  <Link to="/aiDoc">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Ai Doc</p>
                  </div></Link>

                  <button onClick={()=>LogOut()}>   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Log Out</p>
                  </div></button>
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
              <p className="text-base font-bold">Request Appointments</p>
              <p className="text-2xl font-bold">{doctors.filter((doctor) => doctor.requeststatus === "none").length}</p>
              <div className="space-y-2 mt-2">
                {doctors.filter((doctor) => doctor.requeststatus === "none").map((doctor) => (
                  <div key={doctor._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <div className='text-left'>
                    <p className="text-lg font-bold">Name:{doctor.name}</p>
                    <p className="text-lg font-bold">Description:{doctor.desc}</p>
                    <p className="text-sm font-medium">Fees:{doctor.fees}</p>
                    <p className="text-sm font-medium">Hours: ({doctor.startingHour} to {doctor.endingHour})</p>
                </div>
                    <div className="flex gap-3">
                      <button onClick={() => adddoctor(doctor)} className="text-green-600 hover:text-green-800 cursor-pointer">➕</button>


{
  popUp?
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
    {/* Box For Date and time slots */}
    <div className="flex flex-col gap-4 fixed bg-gray-500 rounded-lg p-4 shadow-lg w-80 max-h-[80vh] overflow-y-auto">
      <button className="text-green-600 hover:text-green-800 cursor-pointer text-xl" onClick={()=> setPopUp(false)}>❌</button>
      
      <label className="text-white font-semibold">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded text-gray-800"
      />

      <label className="text-white font-semibold mt-2">Select Time Slot:</label>
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
        {selectedDoctor && generateTimeSlots(selectedDoctor.startingHour, selectedDoctor.endingHour).map((slot, index) => (
          <button
            key={index}
            onClick={() => bookappointment(slot)}
            className="bg-white text-gray-800 py-2 px-2 rounded hover:bg-green-400 hover:text-white transition duration-200 font-medium text-sm"
          >
            {slot}
          </button>
        ))}
      </div>
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
  <p className="text-base font-bold">Your appointment request</p>
  {doctors.filter((doctor) => doctor.requestBy === id && (doctor.requeststatus === "accepted" || doctor.requeststatus === "pending")).map((doctor) => (
    <div key={doctor._id} className="flex items-center justify-between bg-gray-100 p-2 rounded border-b pb-2 last:border-none">
      <div className='text-left'>
      <p className="text-lg ">{doctor.name}</p>
      <p className="text-sm text-gray-500x font-medium">Fees:  {doctor.fees}</p>
      <p className="text-sm text-gray-500x font-medium">Your requested time:  {doctor.requestTime}</p>
      <p className="text-sm text-gray-500x font-medium">Your requested data:  {doctor.appointmentDate}</p>
      <p className={`text-sm font-medium ${doctor.requeststatus === "accepted" ? "text-green-600" : "text-yellow-600" }`}>Request Status:  (  {doctor.requeststatus} )</p>
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
 
       <div className="m-4 rounded-lg border border-[#cedbe8] bg-white shadow h-[50px] overflow-hidden relative flex items-center">
  {/* The "Track" that holds the content */}
  <div className="flex absolute whitespace-nowrap animate-marquee">
    
    {/* Section 1 */}
    <div className="flex items-center">
      <p className="px-4 text-gray-700">
        Experience 24/7 virtual care — Input your symptoms and let our AI provide immediate analysis.
      </p>
      <span className="text-blue-400 font-bold">•</span>
      <p className="px-4 text-gray-700">
        Your AI Doctor is ready — Get instant medical insights and guidance 24/7.
      </p>
      <span className="text-blue-400 font-bold">•</span>
      <p className="px-4 text-gray-700">
        Fast and secure virtual support — Describe how you feel to get started.
      </p>
      <span className="text-blue-400 font-bold mx-4">•</span>
    </div>

    {/* Section 2 (Identical copy for seamless looping) */}
    <div className="flex items-center">
      <p className="px-4 text-gray-700">
        Experience 24/7 virtual care — Input your symptoms and let our AI provide immediate analysis.
      </p>
      <span className="text-blue-400 font-bold">•</span>
      <p className="px-4 text-gray-700">
        Your AI Doctor is ready — Get instant medical insights and guidance 24/7.
      </p>
      <span className="text-blue-400 font-bold">•</span>
      <p className="px-4 text-gray-700">
        Fast and secure virtual support — Describe how you feel to get started.
      </p>
      <span className="text-blue-400 font-bold mx-4">•</span>
    </div>
    
  </div>
</div>     
        </div>
      </div>
      
    </div>
  );
  
}

export default PatientDashboard
