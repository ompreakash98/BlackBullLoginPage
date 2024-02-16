import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/Auth';
export default function NavBar() {
  const { isLoggedIn } = useAuth()
  return (
    <>
<div style={{position:"absolute", height:"10vh",width:"15vw",
 backgroundImage:`url("https://media.licdn.com/dms/image/C4D0BAQEVdLYlspgyQA/company-logo_200_200/0/1630454404624/blackbulltechnosoft_logo?e=2147483647&v=beta&t=RnBE1MJArsIaEisRMmI08c_84cqxYBIEEDCJnzNaazA")`
 ,backgroundRepeat:"no-repeat",backgroundPosition:"center" ,
 marginTop:"5vh"
 }}>

{/* <img src='https://media.licdn.com/dms/image/C4D0BAQEVdLYlspgyQA/company-logo_200_200/0/1630454404624/blackbulltechnosoft_logo?e=2147483647&v=beta&t=RnBE1MJArsIaEisRMmI08c_84cqxYBIEEDCJnzNaazA'>
</img> */}
</div>
    <header style={{ backgroundColor: "black", display: "flex", margin: "0", flexDirection: "column", padding: "1vh", boxShadow: "5px 5px 5px 10px white", visibility:"hidden",position:"absolute"}}>
      <nav>
        <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
          <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none" }}>
            <li >
              < Link style={{ color: "white" }} to='/home'>Home</Link>
            </li>

            <li>
              <Link style={{ color: "white" }} to='/profile'>Profile</Link>

            </li>
            {isLoggedIn ? <>
              <li>
                <Link style={{ color: "white" }} to='/logout' >Logout</Link>

              </li>
            </> : <>
              <div style={{ display: "flex", flexDirection: "" }}>
                <li><Link style={{ color: "white" }} to='/Register'>Register</Link></li>
                <li><Link style={{ color: "white" }} to='/login'>Login</Link></li>
              </div>
            </>

            }


          </ul>
        </div>
      </nav>
    </header>
    </>
  );
}
