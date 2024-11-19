import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Doctor from './pages/doctor';
import Login from './pages/login';
import Contact from './pages/contact';
import About from './pages/about';
import Profile from './pages/profile';
import MyAppointment from './pages/myappointment';
import Appointment from './pages/Appointment';
import Navbar from './components/navbar';
import Footer from './components/Footer';
 // Capitalize to follow React component naming convention

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/doctor' element={<Doctor/>} /> 
        <Route path='/doctor/:speciality' element={<Doctor/>} /> 
        <Route path='/login' element={<Login />} />  
        <Route path='/contact' element={<Contact />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/profile' element={<Profile />} /> 
        <Route path='/myappointment' element={<MyAppointment />} /> 
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
