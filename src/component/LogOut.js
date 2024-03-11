import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'
export default function LogOut() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { LogOutUser } = useAuth()
     
  useEffect(() => {
    // console.log("this is from logout")
    LogOutUser();

  },[LogOutUser,token])
  return (
    <Navigate to="/" />
  )
}
