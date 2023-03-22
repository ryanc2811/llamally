import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { app } from './utils/firebase';

//import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
//import Courses from './pages/Courses';
import Course from './pages/Course';
//import EditCourse from './pages/EditCourse';
import TutorSignup from './pages/TutorSignup';
import ForgotPassword from './pages/forgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container" style={{ marginTop: 64, padding: 16 }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/tutorsignup" element={<TutorSignup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {/* <Route exact path="/courses" component={Courses} />*/
              <Route path="/courses/:id" element={<Course />} />

            /*<Route path="/edit-course/:id" component={EditCourse} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
