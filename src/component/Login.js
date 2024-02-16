// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [loginData, setLoginData] = useState(null);
//     const [error, setError] = useState('')
//     const navigate = useNavigate();
//     useEffect(()=>{
//      setUsername(' ')
//      setPassword('')
//     },[loginData])

//     const handleLogin = () => {
//         // Get the current date and time

//         const currentDate = new Date();
//         const date = currentDate.toLocaleDateString(); // Convert the date to a string
//         const time = currentDate.toLocaleTimeString(); // Convert the date to a string

//         // console.log(timestamp)
//         // const [date, time] = timestamp.split('T');
//         // Store the login data along with the timestamp
//         if (!username || !password) {
//             setError('Username and password are required.');
//             return; // Stop the function if validation fails
//           }
//         const newLoginData = {
//             username,
//             password,
//             date,
//             time
//         };

//         // Set the login data in the state
//         setLoginData(newLoginData);
//         setError('');
//         navigate('/profile');
//         // Log the login data

//     };
//     console.log(loginData)
//     return (
//         <div style={{display:"flex",flexDirection:"column",backgroundColor:"black", justifyContent:'center',alignItems:"center",height:'100vh'}}>
//             <h2 style={{color:"white"}}>Login</h2>
//             {/* <form style={{display:"flex",backgroundColor:"white",flexDirection:"column",padding:"10vh",borderRadius:"2vw"}}>
//                 <label style={{color:"black",fontSize:"2vw",marginRight:'1vw'}}>
//                     Username:
//                     <input
//                     style={{padding:"2vh", borderRadius:"2vh"}} 
//                         type="text"
//                         required
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </label>
//                 <br />
//                 <label style={{color:"black",fontSize:"2vw",marginRight:'1vw'}}>
//                     Password:
//                     <input
//                     style={{padding:"2vh", borderRadius:"2vh"}} 
//                         type="password"
//                         placeholder='Enter Your Password'
//                         required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                 </label>
//                 <Link to="/Register">Sign Up</Link>

//                 <br />
//                 <button style={{padding:"2vh", borderRadius:"2vh"}} type="button" onClick={handleLogin}>
//                     Login
//                 </button>
//             </form> */}

//             <div style={{}}>


//             </div>
//             {/* {error && <p style={{ color: 'red' }}>{error}</p>}
//             {loginData && (
//                 <div>
//                     <p style={{color:"white"}}>Logged in as: {loginData.username}</p>
//                     <p style={{color:"white"}}>Login Time%Date: {loginData.time}</p>
//                     <p style={{color:"white"}}>Login Time%Date: {loginData.date}</p>

//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default Login;


function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [location, setLocation] = useState({});

  const navigate = useNavigate()
  const { storeTokenInLS } = useAuth();
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
   
  }

  function error() {
    console.log("Unable to retrieve your location");
  } 



  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, name: user.password }),
      });

      if (response.ok) {
        // console.log('Employee added successfully');
      } else {
        const data = await response.json();
        console.error('Error adding employee:', data.error);
      }
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      // const api='http://localhost:5000/api/auth/register'
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(user)
      })
      console.log(response)
      if (response.ok) {
        handleAddEmployee();


        const res_data = await response.json();
        // console.log("datafrom login response", res_data.token)

        storeTokenInLS(res_data.token)
        // localStorage.setItem("token",res_data.token)
        console.log(localStorage.token)
        toast.success("login Sucessfull");
        navigate('/private/AttendanceDashboard')
        setUser({
          email: '',
          password: '',
        })
        
          window.location.reload()
      

      }
      else {
        toast.error("invalid credential")
        // console.log('invalid credential')
      }
    } catch (error) {

    }
    // Handle form submission logic here
    // console.log('Submitted user:', user);
  };

  useEffect(()=>{
    handleLocationClick()
  },[])
const locationurl=`https://maps.google.com/?q=${location.latitude},${location.longitude}`
  return (
    <>
    <div>
        
      
   
    </div>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "white", justifyContent: "center", alignItems: "center", height: "95vh", boxShadow: "5px 5px 5px 10px white" }}>

        <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "1vh", borderRadius: "2vh", gap: "2vh", boxShadow: "1px 1px 10px black", display:"flex", flexDirection:"column", justifyContent:"flex-start" }}>
        <CgProfile />
          
          <span style={{ color: "blue", display:"flex"}}>Login</span>
          

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor='email'>Email</label>
            <input
            style={{padding:"1vh", backgroundColor:"#f5f5f5"}}
              type='email'
              name='email'
              placeholder='Enter your email'
              id='email'
              value={user.email}
              onChange={handleInput}
              required
              autoCapitalize='off'
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor='password'>Password</label>
            <input
            style={{padding:"1vh" ,backgroundColor:"#f5f5f5"}}
              type='password'
              name='password'
              placeholder='Enter password'
              id='password'
              value={user.password}
              onChange={handleInput}
              required
              autoCapitalize='off'
            />
          </div>
          <div style={{display:"flex", justifyContent:"end"}}>
            <Link to='/Register' style={{textDecoration:"none", color:"red"}}>Not Resister?</Link>
          </div>
         <a href='/private/AttendanceDashboard'><button type='submit' style={{padding:"1vh",} }>Login Now</button></a> 
        </form>
      </div>

    </>
  )
}

export default Login

