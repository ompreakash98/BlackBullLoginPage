// src/App.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
// const currentdate = new Date()
import {  toast } from 'react-toastify';

function Profile() {
  const[currentdate,setCurrentDate]=useState(new Date())
  const { user } = useAuth()
  const [email, setEmail] = useState(user.userData.email);
  const [showData, setShowData] = useState(true)
  const [name, setName] = useState(user.userData.userId);
  const [date, setDate] = useState(currentdate.toLocaleDateString())
  const [checkIn, setCheckIn] = useState(currentdate.toLocaleTimeString());
  const [checkOut, setCheckOut] = useState(currentdate.toLocaleTimeString());
  const [userAtendenceData, setUserAtendencedATA] = useState([])
  const navigate = useNavigate()

  // console.log("user from Profile",)
  // console.log(`${currentdate.toLocaleDateString()}`+`${currentdate.toLocaleTimeString()}`)

  // console.log(currentdate.toLocaleString().split(",")[1]);
  // console.log(currentdate.toLocaleString().split(",")[0])
  // console.log(currentdate.toLocaleTimeString())
  // const handleCheckIn = async () => {
  //   setCheckIn(currentdate.toLocaleString().split(",")[1])
  //   setDate(date)
  //   try {


  //     const response = await fetch('http://localhost:3001/api/attendance', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date, checkIn }),
  //     });

  //     if (response.ok) {
  //       alert('Check-in successful');
  //       setShowData(!showData)
  //       // setEmail("")
  //       // setName("")
  //     } else {
  //       alert('Check-in failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during check-in:', error);
  //   }
  // };

  useEffect(()=>{
    setCurrentDate(new Date());
  },[checkIn,checkOut])
  const handleCheckIn = async () => {
    setCurrentDate(new Date())

    try {
      const response = await fetch('http://localhost:3001/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date, checkIn: currentdate.toLocaleString().split(",")[1] }),
      });
  
      if (response.ok) {
        toast.success('Check-in successful');
        setShowData(!showData);
        setCheckIn(currentdate.toLocaleString().split(",")[1]);
      } else {
        toast.error('Check-in failed');
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };
  
  const handleCheckOut = async () => {
    setCurrentDate(new Date());

    try {
      const response = await fetch('http://localhost:3001/api/attendance/checkOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date, checkOut: currentdate.toLocaleString().split(",")[1] }),
      });
  
      if (response.ok) {
        toast.success('Check-out successful');
        navigate('/logout');
        
        setCheckOut(currentdate.toLocaleString().split(",")[1]);
      } else {
        toast.success
        ('Check-out failed');
      }
    } catch (error) {
      console.error('Error during check-out:', error);
    }
  };
  


  // const handleCheckOut = async () => {
  //   setCheckOut(currentdate.toLocaleString().split(",")[1]);
  //   setDate(date)
  //   try {


  //     const response = await fetch('http://localhost:3001/api/attendance/checkOut', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date, checkOut }),
  //     });

  //     if (response.ok) {
  //       navigate('/logout')
  //       alert('Check-out successful');
  //       setEmail("")
  //       setName("")
  //     } else {
  //       alert('Check-out failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during check-out:', error);
  //   }
  // };


  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/attendance/${email}`);
      if (response.ok) {
        const data = await response.json();
        setUserAtendencedATA(data)
        console.log('Attendance data:', data);
      } else {
        alert('Failed to fetch attendance data');
      }
    } catch (error) {
      error('Error during attendance data fetch:', error);
    }
  };
  const fetchAllAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/attendance/all', { methodL: "GET" });
      if (response.ok) {
        const data2 = await response.json();
        console.log('All Attendance data:', data2);
      } else {
        alert('Failed to fetch all attendance data');
      }
    } catch (error) {
      console.error('Error during all attendance data fetch:', error);
    }
  };

  useEffect(() => {
 
    fetchAllAttendanceData()
    fetchAttendanceData()
  }, [])

  console.log(userAtendenceData)

  return (
    <div className="App" style={{ backgroundColor: "black", color: "red", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>
        {/* <h1 style={{color:"wheat",}}> May I Help You  </h1> */}

      </div>

      <div style={{ display: "flex", flexDirection: "row", visibility: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", width: "30vw", padding: "3vh", borderRadius: "1vh", marginTop: "2vh", marginLeft: "1vh" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email:</label>
            <input style={{ padding: "1vh", width: "30vw" }} placeholder='Enter Your E-Mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password</label>
            <input style={{ padding: "1vh", marginTop: "1vh", width: "30vw" }} placeholder="Enter your Name" type="password" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1vh", marginTop: "2vh" }}>
      
        {showData ?<>
         <button style={{ backgroundColor: "green", width: "20vw", padding: "2vh", borderRadius: "2vh" }} onClick={handleCheckIn}>Check In</button>
           
          </>
          
          : <>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button style={{ backgroundColor: "red", width: "30vw", padding: "2vh", borderRadius: "2vh" }} onClick={handleCheckOut}>Check Out</button>
              {/* <button style={{ backgroundColor: "yellow", width: "30vw", padding: "2vh", borderRadius: "2vh" }} onClick={fetchAttendanceData}>Fetch Attendance Data</button> */}
            </div>
            
            {/* <button style={{backgroundColor:"white",width:"30vw", padding:"2vh", borderRadius:"2vh"}} onClick={fetchAllAttendanceData}>Fetch All Attendance Data</button> */}
          </>
        }</div>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "black", color: "white" }}>

        {/* <div>
          <h2>Date</h2>
          {
            userAtendenceData.map((value) => {
              return (<>
                <p>

                  {value.date}
                </p>
              </>)
            })

          }
        </div> */}

        {/* <div>
          <h2>checkIn time</h2>
          {
            userAtendenceData.map((value) => {
              return (<>
                <p>
                
                  {value.checkIn}
                </p>
              </>)
            })

          }
        </div> */}

        {/* <div>
          <h2> check Out Time</h2>

          {
            userAtendenceData.map((value) => {
              return (<>
                <p>
                  {value.checkOut}
                </p>
              </>)
            })

          }
        </div> */}
{/* 
        {
          userAtendenceData.map((value, index) => {
            const key = Object.keys(value)
            key.map((value) => {
              if (value == "checkIn") {
               console.log(value)

              }
            })
          })

        } */}

        <table border={2} style={{ width: "100%" }}>
          <thead>
            <tr>

              <th>Date</th>
              <th style={{ backgroundColor: "green" }}>Check In</th>
              <th style={{ backgroundColor: "red" }}>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {userAtendenceData.map((item, index) => (
              <tr key={index}>
                <td style={{backgroundColor:"white", color:"black"}}>{item.date}</td>
                <td style={{ backgroundColor: "green" }}>{item.checkIn}</td>
                <td style={{ backgroundColor: "red" }}>{item.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>

  );
}

export default Profile;
