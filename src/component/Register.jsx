import { useState } from 'react';
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { useNavigate,} from 'react-router-dom';
import { useAuth } from '../store/Auth';
 function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
      });
      const navigate =useNavigate()
      const {storeTokenInLS}=useAuth()

    
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
            body: JSON.stringify({ email:user.email, name:user.password }),
          });
    
          if (response.ok) {
            console.log(user.email)
            console.log(user.user.password)

            console.log('Employee added successfully');
          } else {
            const data = await response.json();
            console.error('Error adding employee:', data.error);
          }
        } catch (error) {
          console.error('Error adding employee:', error.message);
        }
      };
      const handleSubmit =  async (e) => {

        e.preventDefault();
        handleAddEmployee()
        // Handle form submission logic here
        // const api='http://localhost:5000/api/auth/register'
        const response= await fetch('http://localhost:5000/api/auth/register',{
            method :"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify(user)
        })
         if(response.ok){
          const res_data = await response.json();
          console.log("datafrom response",res_data)
          storeTokenInLS(res_data.token)
          // localStorage.setItem("token", {res_data})
           setUser({ username: '',
           email: '',
           phone: '',
           password: '',})
           navigate('/login')

         }
        console.log('Submitted user:', user);
      };
    
      return (
        <>
        <div style={{display:"flex", backgroundColor:"white",justifyContent:"center",alignItems:"center",height:"95vh",boxShadow:"5px 5px 5px 10px white"}}>
          {/* <h1>Attendance App</h1>

      <div>
        <h2>Add Employee</h2>
        <label>Email:</label>
        <input type="text" value={user.emailemail} onChange={{}} />
        <label>Name:</label>
        <input type="text" value={user.name} onChange={{}} />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div> */}
        <form onSubmit={handleSubmit} style={{backgroundColor:"white", padding:"1vh",borderRadius:"2vh",gap:"2vh" ,boxShadow:"1px 1px 6px ", display:"flex",flexDirection:"column", fontSize:"1rem"}}>
         <CgProfile />
         <span style={{ color: "blue", display:"flex"}}>Register Here</span>

          <div  style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor='username'>Username</label>
            <input
            style={{padding:"1vh" ,backgroundColor:"#f5f5f5"}}
              type='text'
              name='username'
              value={user.username}
              onChange={handleInput}
              placeholder='username'
              id='username'
              required
              autoCapitalize='off'
            />
          </div>
          <div  style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor='email'>Email</label>
            <input
            style={{padding:"1vh",backgroundColor:"#f5f5f5"}}
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
          <div  style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor='phone'>Phone</label>
            <input
            style={{padding:"1vh",backgroundColor:"#f5f5f5"}}
              type='number'
              name='phone'
              value={user.phone}
              onChange={handleInput}
              placeholder='phone'
              id='phone'
              required
              autoCapitalize='off'
            />
          </div>
          <div  style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor='password'>Password</label>
            <input
            style={{padding:"1vh", backgroundColor:"#f5f5f5"}}
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
      
          <button type='submit' style={{padding:"1vh"}}>Register Now</button>
        </form>
        </div>
   </>
  )
}

export default Register
