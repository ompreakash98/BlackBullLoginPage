import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    console.log("token from auth",token)
    const[user,setUser]=useState("")
    const storeTokenInLS = (serverToken) => {

        return localStorage.setItem("token", serverToken)
    }
    let isLoggedIn = !!token;
    //taklink the logout functionality 

    const LogOutUser = () => {
        setToken("");
        return localStorage.removeItem(token)

    }

    ///to get the currently logged in user data  
    const userAuthantication= async ()=>{
        try {
            const response= await fetch('http://localhost:5000/api/auth/user',{
             method:"GET"   ,
             headers:{
               Authorization:`Bearer ${token}`,
             },

            });
            if(response.ok){
                const data =await response.json()
                setUser(data);
                console.log("user data from Auth ",data)
            }
        } catch (error) {
           console.error('error fetching user data') 
        }
    }
    useEffect(()=>{
        userAuthantication()
    },[])

    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogOutUser,user }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("Auth from outside provider")
    }
    return authContextValue
}