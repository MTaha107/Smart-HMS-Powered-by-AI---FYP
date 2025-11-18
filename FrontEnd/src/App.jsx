import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AiDoc from './pages/AiDoc';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route index element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Routes>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>

      <Routes>
        <Route path="/patientDashboard" element={<PatientDashboard />} />
      </Routes>

      <Routes>
        <Route path="/aiDoc" element={<AiDoc />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
