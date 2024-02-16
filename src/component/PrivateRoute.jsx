// import React from 'react'
// import { Navigate, Outlet ,Link} from 'react-router-dom'
// import { useAuth } from '../store/Auth';

//  const  PrivateRoute=() =>{
//     const {isLoggedIn}=useAuth()
//    if(isLoggedIn){
//     return (
//         <Outlet/>
//       )
//    }
//    else{(
//     <>hello</>
//     )
//    }
// }

// export default PrivateRoute;
import React  from 'react'
import { Navigate, Outlet ,Link} from 'react-router-dom';
import { useAuth } from '../store/Auth';
import Login from './Login';
import { useState ,useEffect} from 'react';
const PrivateRoute = () => {
    const {isLoggedIn}=useAuth()
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  
 if(isLoggedIn){
    return <>
    <Outlet/></>
 }
 else{
   return <>    
     <div  style={{display:"flex",justifyContent:"center",alignItems:"center", height:window.innerHeight}}>
        Plesse login first
        <Link to="/">Go to login</Link>
        
      </div>          
   </>
 }
}
export default PrivateRoute

