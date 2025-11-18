import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import feature1 from "../assets/images/feature1.jpg";
import feature2 from "../assets/images/feature2.jpg";
import feature3 from "../assets/images/feature3.jpg";
import introduction from "../assets/images/introduction.jpg";
import testimonial from "../assets/images/testimonial.jpg";
import benifits from "../assets/images/benifits.jpg";
import hero1 from "../assets/images/hero1.png";

const Home = () => {
   const [isOpen, setIsOpen] = useState(false);
  
  return (
    
  <div className="bg-gray-200  max-w-auto overflow-x-hidden font-roboto mx-5">
   
  <header className=" bg-gray-200 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
  <div className=" max-w-7xl  flex justify-between items-center py-4 px-3 md:px-8">
    
   
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
      <p className='text-black font-bold'>Medi Care</p>
    </div>

    
    <nav className="hidden md:flex items-center space-x-6 font-medium">
      <Link to="/" className="text-black font-bold hover:underline">Home</Link>
      <Link to="/aiDoc" className="text-black font-bold hover:underline">Ai Doc</Link>
<Link
  to="/login"
  className="flex items-center justify-center bg-black px-4 py-2 rounded text-white hover:bg-gray-500"
>
  <p>Login</p>
  <svg xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5" fill="none" viewBox="0 0 24 24" 
    stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" 
      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" 
      d="M20 8v6m3-3h-6" />
  </svg>
</Link>

    </nav>

   
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden text-2xl p-4 text-green-700 focus:outline-none"
    >
      ☰
    </button>
  </div>

 
  {isOpen && (
    <div className="md:hidden flex flex-col space-y-4 px-4 pb-4 bg-white shadow">
      <Link to="/" className="block py-2 text-green-700">Home</Link>
      <Link to="/aiDoc" className="block py-2 text-green-700">Ai Doc</Link>

     
     

     
     <Link
  to="/login"
  className="flex items-center justify-center bg-green-700 px-4 py-2 rounded text-white hover:bg-green-800"
>
  <p>Login</p>
  <svg xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5" fill="none" viewBox="0 0 24 24" 
    stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" 
      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" 
      d="M20 8v6m3-3h-6" />
  </svg>
</Link>
    </div>
  )}
</header>

    <div className="containerhero">
      <img src={hero1} alt="farming pics" className='w-auto rounded-lg responsiveimg'/>
      <div className="centeredhero mt-10 md:mt-0">
        <p className='text-xl font-[1000] text-white '>WELCOME TO </p>
        <h1 className='text-6xl m-6 font-[1000]'>Medi Care</h1>
        <p className='text-lg text-gray-200 font-[1000]'>Your personal AI healthcare assistant — book doctor appointments, get smart medicine suggestions, and chat with certified doctors instantly.</p>
        <button className='bg-gray-900  text-white p-3 m-5 rounded-lg'>Discover More</button>
      </div>
    </div>


    <section
      className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 -mt-16 relative z-10"
    >
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 1</h3>
        <p className="mt-2 text-black font-bold">AI-powered diagnosis system that analyzes symptoms and suggests possible treatments instantly.</p>
        <div className="flex justify-center">
          <img
            src={feature1}
            alt="dot"
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 2</h3>
        <p className="mt-2 text-black font-bold">Smart appointment scheduling with real-time doctor availability and instant confirmation.</p>
        <div className="flex justify-center">
          <img
            src={feature2}
            alt="dot2"
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 3</h3>
        <p className="mt-2 text-black font-bold">24/7 AI Chatbot that connects patients with doctors and recommends medicines for common health issues.</p>
        <div className="flex justify-center">
          <img
            src={feature3}
            alt="dot3"
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>


    <section
      id="about"
      className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="md:w-1/2 flex justify-center" data-aos="fade-right">
        <img
          src={introduction}
          alt="Farm"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/3" data-aos="fade-left">
        <p className="text-[17px] font-semibold text-orange-400">Our Introduction</p>
        <h2 className="text-3xl font-bold text-black">
          Medical Care using Ai
        </h2>
        <p className="mt-4 text-sm">
          MediCare is an AI-driven hospital management platform designed to simplify healthcare. 
Our system helps users easily book doctor appointments, consult with AI for early diagnosis, and receive personalized medicine suggestions. 
By combining AI technology with real doctors, we ensure faster, smarter, and more accessible medical care for everyone.

        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-5">
        </div>
        <a
          href="#"
          className="mt-6 inline-block bg-black px-6 py-3 rounded text-white font-medium"
          >Learn More</a
        >
      </div>
    </section>

    
    <section id="services" className="bg-orange-50 py-16">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-[17px] font-bold mb-4 text-orange-400" data-aos="fade-up">
          Our Services
        </h2>
        <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
          What We Offer
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto mb-10">
At MediCare, we combine advanced artificial intelligence with expert medical care to make healthcare simple, fast, and reliable. 
Our platform allows patients to instantly book doctor appointments, consult with an AI medical assistant for symptom analysis, 
and get personalized medicine suggestions. From digital prescriptions to secure doctor chats, 
we’re creating a smarter way to manage your health — anytime, anywhere.
</p>

      </div>
    </section>
    
    <div
      className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -mt-30 relative z-10"
    >
    </div>
    <section
      id="about"
      className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-center bg-orange-50"
    >
      <div className="md:w-1/4 mb-6 md:mb-0" data-aos="fade-left">
        <p className="text-lg font-semibold text-orange-400">Our Testimonial</p>
        <h2 className="text-3xl font-bold text-black">
          What they are talking about
        </h2>
        <p className="mt-4 text-sm">
          Our users love how easy it is to get medical help. From AI symptom analysis to direct doctor chats, 
MediCare makes healthcare more accessible and efficient than ever before.
        </p>
        <a
          href="#"
          className="mt-6 inline-block bg-black px-6 py-3 rounded text-white font-medium"
          >View all testimonial</a
        >
      </div>
      <div className="md:w-1/2 flex justify-center" data-aos="fade-right">
        <img
          src={testimonial}
          alt="Farm"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover rounded-lg"
        />
      </div>
    </section>

   
    <section className="py-16">
      <div
        className="container mx-auto md:px-8 flex flex-col md:flex-row items-center justify-center gap-10"
      >
        <div className="md:w-1/3" data-aos="fade-right">
          <img
            src={benifits}
            className="rounded-lg shadow-lg w-full h-auto"
            alt=""
          />
        </div>
        <div className="md:w-1/3" data-aos="fade-left">
          <p className="text-[17px] font-bold text-orange-400">Our Benefits</p>
          <h2 className="text-3xl font-bold">Why Choose Us </h2>
         <p className="text-sm text-gray-600">
We blend artificial intelligence and healthcare expertise to deliver a seamless patient experience. 
</p>
<ul className="mt-4 space-y-2 text-gray-600">
  <li>✔ AI-based health diagnosis and suggestions</li>
  <li>✔ Instant Appointment Booking</li>
  <li>✔ Secure Doctor-Patient Chat</li>
</ul>

          <a
            href="#"
            className="mt-6 inline-block bg-black px-6 py-3 rounded text-white font-medium"
            >Discover More</a
          >
        </div>
      </div>
    </section>

  
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[17px] font-bold text-orange-400">From the Blog</p>
        <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
          News & Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow w-full" data-aos="fade-up">
            <img src="" alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                The Future of AI in Healthcare
              </h3>
              <p className="text-sm text-gray-600">
                Discover how AI is revolutionizing medical care and improving patient outcomes.
              </p>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow w-full"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img src="" alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                5 Ways AI Chatbots Improve Hospital Efficiency
              </h3>
              <p className="text-sm text-gray-600">
                How automation and AI save time for both doctors and patients.
              </p>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img src="" alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                Smart Appointments: The New Era of Digital Healthcare
              </h3>
              <p className="text-sm text-gray-600">
                Why booking a doctor through AI is faster and safer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="bg-orange-50">
      <footer className="bg-neutral-700 text-white py-12 text-sm">
        <div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <p className="mb-4">
              Your company’s short description goes here. It can be two lines
              long to explain your mission.
            </p>
            <div className="flex space-x-4 text-yellow-400 text-xl">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Explore</h3>
            <div className="w-12 h-1 bg-orange-400 mb-4"></div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#">About</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#">Service</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#">Our Project</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#">Latest News</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">News</h3>
            <div className="w-12 h-1 bg-orange-400 mb-4"></div>
            <div className="mb-6">
              <p>Bringing food production back to cities</p>
              <p className="text-gray-400 text-sm">July 5 2022</p>
            </div>
            <div>
              <p>Another headline here</p>
              <p className="text-gray-400 text-sm">August 12 2022</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <div className="w-12 h-1 bg-orange-400 mb-4"></div>
            <p className="flex items-center space-x-2">
              <span>📞</span> <span>02020202</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>✉️</span> <span>swen221101043@kfuiet.edu.pk</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>📍</span> <span>RYK</span>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              />
              <button
                className="bg-orange-400 px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="bg-gray-950 flex flex-col sm:flex-row justify-between text-white text-sm py-5 px-4 sm:px-20"
      >
        <p>© All Copyright 2025 by m_taha_wrch</p>
        <p>Terms of Use Privacy Policy</p>
      </div>
    </section>

 </div>

  )
}

export default Home
