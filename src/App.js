// App.js
import React, { Profiler, useEffect, useState } from 'react';
import CalendarComponent from './component/CalendarComponent';
import Login from './component/Login';
import Profile from './component/Profile'
import HomePage from './component/HomePage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './component/Register';
import NavBar from './component/NavBar';
import LogOut from './component/LogOut';
import ErrorPageForMobile from './pages/ErrorPageForMobile';
import axios from 'axios';

const App = () => {
  const [myIpAddress, setMyIpAddress] = useState(['2401:4900:1c5d:63e6:5c7d:bcb6:42b8:5854','2401:4900:1c5d:3bdb:6cfd:1202:b977:256','2401:4900:1c5d:3bdb:516:10ac:c464:b658','2401:4900:1c5d:63e6:b0d1:2c11:aff5:75ab']);
  const[ip,setIp]=useState('');
  const[isDesktop,setIsDesktop]=useState(false);
   useEffect(()=>{
    const checkScreenSize=()=>{
      setIsDesktop(window.innerWidth > 700 && window.innerHeight > 500 && myIpAddress.includes(ip))
    }
    //Initial check 
    checkScreenSize();
    //Listen for th window resize events
    window.addEventListener('resize',checkScreenSize);
    // CleanUp the event listener on component unmount
    return ()=>{
      window.removeEventListener('resize',checkScreenSize)

    };
   },[]);
   useEffect(()=>{
    getUserIP();

   },[])
   const getUserIP= async ()=>{
    const ip= await axios.get('https://ipapi.co/json');
    console.log(ip.data);
    setIp(ip.data.ip)

   }
   useEffect(() => {
    // Check if user's IP is included in the allowed list
    const isUserAllowed = myIpAddress.includes(ip);
    
    setIsDesktop(isUserAllowed && window.innerWidth > 700 && window.innerHeight > 500);
  }, [ip, myIpAddress]);
  return (
    <>
      {isDesktop?(
        <>
        <Router>
        <div>
        
          <NavBar/>
          <Routes>
            <Route path="/" element={< Login />} />
            <Route path="/home" element={< HomePage />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
        
        </>
      ):(
        <>  
        <ErrorPageForMobile/>
        </>
      )}
       <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
      <h1 style={{fontSize:"2vh"}}>IP Address:{ip}</h1>
      </div>
    </>
  );
};

export default App;
