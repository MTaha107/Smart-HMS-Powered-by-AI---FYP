import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AiDoc from './pages/AiDoc';
import Message from './pages/Message';
import DocDashboard from './pages/DocDashboard';
import Protectedroute from './components/ProtectedRoute';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/aiDoc" element={<AiDoc />} />
        <Route path="/message" element={<Protectedroute><Message /></Protectedroute>} />
        <Route path="/docDashboard" element={<DocDashboard />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
