import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/Auth';
export default function NavBar() {
  const { isLoggedIn } = useAuth()
  return (
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
                <Link style={{ color: "white" }} to='/Logout'>Logout</Link>

              </li>
            </> : <>
              <div style={{ display: "flex", flexDirection: "" }}>
                <li><Link style={{ color: "white" }} to='/Register'>Register</Link></li>
                <li><Link style={{ color: "white" }} to='/Login'>Login</Link></li>
              </div>
            </>

            }


          </ul>
        </div>
      </nav>
    </header>
  );
}
