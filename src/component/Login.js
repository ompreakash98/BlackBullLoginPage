// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import {  toast } from 'react-toastify';

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
  const navigate = useNavigate()
  const { storeTokenInLS } = useAuth()

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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

      
        const res_data = await response.json();
        console.log("datafrom login response", res_data.token)

        storeTokenInLS(res_data.token)
        // localStorage.setItem("token",res_data.token)
        console.log(localStorage.token)
        toast.success("login Sucessfull");
        navigate('/profile')
        setUser({
          email: '',
          password: '',
        })

      }
      else {
        toast.error("invalid credential")
        console.log('invalid credential')
      }
    } catch (error) {

    }
    // Handle form submission logic here
    console.log('Submitted user:', user);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "black", justifyContent: "center", alignItems: "center", height: "100vh", boxShadow: "5px 5px 5px 10px white" }}>

        <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "10vh", borderRadius: "2vh", gap: "2vh", boxShadow: "5px 2px 10px 7px blue" }}>
          <p style={{ color: "blue" }}>Login</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor='email'>Email</label>
            <input
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
          <br />
          <button type='submit'>Login Now</button>
          <div>
            <Link to='/Register'>Not Resister?</Link>
          </div>
        </form>
      </div>

    </>
  )
}

export default Login

