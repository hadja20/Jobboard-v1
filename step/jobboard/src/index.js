import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Advertisements from './components/AdvertisementsPage';
import Login from './components/Login';
import Login1 from './components/Login1';
import SignUp from './components/SignUp';
import Apply from './components/Apply';
import Recruteur from './components/RegisterRecruiter';
import JobseekerProfile from './components/User Profile/JobseekerProfile';
import AdminProfile from './components/User Profile/AdminProfile';
import RecruiterProfile from './components/User Profile/RecruiterProfile';

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="login1" element={<Login1 />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="/" element={<Advertisements/>} />
          <Route path="recruteur" element={<Recruteur />} />
          <Route path="postuler" element={<Apply />} />
          <Route path="user-profile" element={<JobseekerProfile />} />
          <Route path="Login/admin-profile" element={<AdminProfile />} />
          <Route path="Login/recruiter-profile" element={<RecruiterProfile />} />
        </Routes>
  </BrowserRouter>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();