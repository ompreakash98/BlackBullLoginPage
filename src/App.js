

// export default App;
import React, {  useEffect, useState ,Image} from 'react';
// import CalendarComponent from './component/CalendarComponent';
import Login from './component/Login';
import Profile from './component/Profile'
import HomePage from './component/HomePage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './component/Register';
import NavBar from './component/NavBar';
import LogOut from './component/LogOut';
import ErrorPageForMobile from './pages/ErrorPageForMobile';
import axios from 'axios';
import AttendanceDashboard from './component/AttendanceDashboard';
import PrivateRoute from './component/PrivateRoute';
import PageNoteFaund from './pages/PageNoteFaund';
// import LogoImage from "./assets/LogoDesign.jpg.png"
import AdminPage from'./pages/AdminPage'
const App = () => {
  const [myIpAddress, setMyIpAddress] = useState(['2401:4900:1c5c:bd0e:855e:eca:4909:c299','2401:4900:1c5a:a03c:fd95:1c0c:1383:1020','2401:4900:1c5a:eb12:8562:5d31:4c30:9806','2401:4900:1c5a:eb12:888d:2d6c:4bf6:8c77','2401:4900:1c5d:63e6:5c7d:bcb6:42b8:5854','2401:4900:1c5d:3bdb:6cfd:1202:b977:256','2401:4900:1c5d:3bdb:516:10ac:c464:b658','2401:4900:1c5d:63e6:b0d1:2c11:aff5:75ab']);
  const[ip,setIp]=useState('');
  const[isDesktop,setIsDesktop]=useState(false);
   useEffect(()=>{
    const checkScreenSize=()=>{
      setIsDesktop(window.innerWidth > 400 && window.innerHeight > 300 && myIpAddress.includes(ip))
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
    // console.log(ip.data);
    setIp(ip.data.ip)

   }
   useEffect(() => {
    // Check if user's IP is included in the allowed list
    // const isUserAllowed = true;
    const isUserAllowed = myIpAddress.includes(ip);
// 
    
    setIsDesktop(isUserAllowed && window.innerWidth > 400 && window.innerHeight > 300);
  }, [ip, myIpAddress]);
  
  const handleSubmitte=(e)=>{
  
  }


  
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
           
            <Route path='/private' element={<PrivateRoute/>}>             
            <Route path="AttendanceDashboard" element={<AttendanceDashboard/>} />
            <Route path='admin' element={<AdminPage/>}/>

            </Route>

            <Route path="*" element={<PageNoteFaund />} />

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
