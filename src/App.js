
import './App.css';
import Dashboard from './pages/Dashboard';
import SignUpSignIn from './pages/SignupSignin';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    
    </>
   
  );
}

export default App;
