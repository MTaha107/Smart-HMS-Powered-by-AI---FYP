import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();
  const [LoginRole, setLoginRole] = useState("Patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
  }

  return (
     <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
       
        <header className="flex items-center border-b border-solid border-b-[#e7edf4] bg-white px-4 sm:px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 sm:gap-4 text-[#0d141c] ">
           <div className="flex items-center space-x-2">
                 <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                 <p className='text-black font-bold'>MediCare</p>
               </div>
           
          </div>
        </header>

       
        <div className="flex flex-1 justify-center py-5 px-4 sm:px-8 md:px-20 lg:px-40">
          <div className="flex w-full max-w-[512px] flex-col py-5">
            <h2 className="pb-3 pt-5 text-center text-black text-[22px] sm:text-[26px] md:text-[28px] font-bold leading-tight">
              Sign up 
            </h2>

            <form onSubmit={handleSubmit}>
            
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-2 sm:px-4 py-2 sm:py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="form-input flex h-12 sm:h-14 w-full resize-none rounded-lg bg-[#e7edf4] p-3 sm:p-4 text-sm sm:text-base placeholder:text-[#49739c] focus:outline-none"
                  />
                </label>
              </div>

            
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-2 sm:px-4 py-2 sm:py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-input flex h-12 sm:h-14 w-full resize-none rounded-lg bg-[#e7edf4] p-3 sm:p-4 text-sm sm:text-base placeholder:text-[#49739c] focus:outline-none"
                  />
                </label>
              </div>

             
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-2 sm:px-4 py-2 sm:py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-input flex h-12 sm:h-14 w-full resize-none rounded-lg bg-[#e7edf4] p-3 sm:p-4 text-sm sm:text-base placeholder:text-[#49739c] focus:outline-none"
                  />
                </label>
              </div>

             
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-2 sm:px-4 py-2 sm:py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="form-input flex h-12 sm:h-14 w-full resize-none rounded-lg bg-[#e7edf4] p-3 sm:p-4 text-sm sm:text-base placeholder:text-[#49739c] focus:outline-none"
                  />
                </label>
              </div>

              
{/* dropbox for farmer or owner login */}
  <div className='flex w-full flex-col flex-wrap  gap-4 px-4 py-3'>
  <label htmlFor="loginRole">Sign up as:</label>
  <select
  id="LoginRole"
  name="LoginRole"
  value={LoginRole}
  onChange={(e) => setLoginRole(e.target.value)}
  className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-12 sm:h-14 placeholder:text-[#49739c] p-3 sm:p-4 text-sm sm:text-base"
>
  <option value="farmer">Patient</option>
  <option value="requestAdmin">Request for Doctor/admin</option>
</select>

  </div>

              
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

            
              <div className="flex px-2 sm:px-4 py-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg bg-black px-3 sm:px-4 text-sm font-bold text-white disabled:bg-gray-400"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>

            <p className="px-2 sm:px-4 pt-1 pb-3 text-center text-xs sm:text-sm text-[#49739c] underline">
               <Link to="/login">
    Already have an account? Log in
  </Link>
             
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
