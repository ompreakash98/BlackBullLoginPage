import { useState } from 'react';
import React from 'react'
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
    
      const handleSubmit =  async (e) => {
        e.preventDefault();
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
        <div style={{display:"flex", backgroundColor:"black",justifyContent:"center",alignItems:"center",height:"100vh",boxShadow:"5px 5px 5px 10px white"}}>
        <form onSubmit={handleSubmit} style={{backgroundColor:"white", padding:"10vh",borderRadius:"2vh",gap:"2vh" ,boxShadow:"2px 3px 8px 2px blue"}}>
       
          <div  style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor='username'>Username</label>
            <input
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
          <button type='submit'>Register</button>
        </form>
        </div>
   </>
  )
}

export default Register
