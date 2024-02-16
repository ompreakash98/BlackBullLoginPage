// src/App.js
import React, { } from 'react';
// import { useAuth } from '../store/Auth';
// import { useNavigate } from 'react-router-dom';
// // const currentdate = new Date()
// import {  toast } from 'react-toastify';

function Profile() {
  // const[currentdate,setCurrentDate]=useState(new Date())
  // const[currentDateTime,setCurrentDateTime]=useState(new Date())
  // const [userAttendence, setUserAttendence] = useState([])

  // const { user } = useAuth()
  // const [email, setEmail] = useState(user.userData.email);
  // const [showData, setShowData] = useState(true)
  // const [name, setName] = useState(user.userData.userId);
  // const [date, setDate] = useState(currentdate.toLocaleDateString())
  // const [checkIn, setCheckIn] = useState(currentdate.toLocaleTimeString());
  // const [checkOut, setCheckOut] = useState(currentdate.toLocaleTimeString());
  // const [userAtendenceData, setUserAtendencedATA] = useState([])
  // const navigate = useNavigate()

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

  // useEffect(()=>{
  //   setCurrentDate(new Date());
  // },[checkIn,checkOut])
  // const handleCheckIn = async () => {
  //   setCurrentDate(new Date())

  //   try {
  //     const response = await fetch('http://localhost:8000/api/attendance', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date, checkIn: currentdate.toLocaleString().split(",")[1] }),
  //     });
  
  //     if (response.ok) {
  //       toast.success('Check-in successful');
  //       setShowData(!showData);
  //       setCheckIn(currentdate.toLocaleString().split(",")[1]);
  //     } else {
  //       toast.error('Check-in failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during check-in:', error);
  //   }
  // };
  
  // const handleCheckOut = async () => {
  //   setCurrentDate(new Date());

  //   try {
  //     const response = await fetch('http://localhost:8000/api/attendance/checkOut', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date, checkOut: currentdate.toLocaleString().split(",")[1] }),
  //     });
  
  //     if (response.ok) {
  //       toast.success('Check-out successful');
  //       navigate('/logout');
        
  //       setCheckOut(currentdate.toLocaleString().split(",")[1]);
  //     } else {
  //       toast.success
  //       ('Check-out failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during check-out:', error);
  //   }
  // };
  


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


  // const fetchAttendanceData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/attendance/${email}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUserAtendencedATA(data)
  //       console.log('Attendance data:', data);
  //     } else {
  //       alert('Failed to fetch attendance data');
  //     }
  //   } catch (error) {
  //     error('Error during attendance data fetch:', error);
  //   }
  // };
  // const fetchAllAttendanceData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/api/attendance/all', { methodL: "GET" });
  //     if (response.ok) {
  //       const data2 = await response.json();
  //       console.log('All Attendance data:', data2);
  //     } else {
  //       alert('Failed to fetch all attendance data');
  //     }
  //   } catch (error) {
  //     console.error('Error during all attendance data fetch:', error);
  //   }
  // };

  // useEffect(() => {
 
  //   fetchAllAttendanceData()
  //   fetchAttendanceData()
  // }, [])

  // console.log(userAtendenceData)
  // const handleAddAttendance = async () => {
  //   setShowData(false)
  //   checkUserChechedInOrNot()
  //   setCurrentDateTime(new Date())
  //   console.log(email)
  //   try {
  //     const response = await fetch(`http://localhost:3001/attendance/${email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date: currentDateTime.toLocaleDateString(), checkIn: currentDateTime.toLocaleString().split(",")[1] }),
  //     });

  //     if (response.ok) {
  //       console.log('Attendance added successfully');
  //     } else {
  //       const data = await response.json();
  //       console.error('Error adding attendance:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error adding attendance:', error.message);
  //   }
  // };
  // const checkUserChechedInOrNot= ()=>{
  //   return (userAttendence.map((value)=>{
  //     if(value.date===date && value.checkOut){
  //       return (false);
  //     }
  //     else {
  //       return (true)
  //     }
  //   }))
  // }

  // const handleAddEmployee = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/api/employees', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, name }),
  //     });

  //     if (response.ok) {
  //       console.log('Employee added successfully');
  //     } else {
  //       const data = await response.json();
  //       console.error('Error adding employee:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error adding employee:', error.message);
  //   }
  // };

  // const handleAddAttendanceCheckOut = async () => {
  //   checkUserChechedInOrNot()
  //   setCurrentDateTime(new Date())
  //   setShowData(!false)

  //   try {
  //     const response = await fetch(`http://localhost:3001/attendance/${email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, date: currentDateTime.toLocaleDateString(), checkOut: currentDateTime.toLocaleString().split(",")[1] }),
  //     });

  //     if (response.ok) {
  //       console.log('Attendance added successfully');
  //       navigate('/login')
  //     } else {
  //       const data = await response.json();
  //       console.error('Error adding attendance:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error adding attendance:', error.message);
  //   }
  // };


  // const handleGetAttendance = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/attendance/${email}`);

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUserAttendence(data[0].allAttendance)
  //       // console.log(data[0].allAttendance);
  //     } else {
  //       const data = await response.json();
  //       console.error('Error getting attendance:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error getting attendance:', error.message);
  //   }
  // };
  // const workingHoursData = userAttendence
  //   .filter(entry => entry.checkIn && entry.checkOut)
  //   .map(entry => {
  //     const checkInTime = new Date(`2024-01-25T${entry.checkIn}`);
  //     const checkOutTime = new Date(`2024-01-25T${entry.checkOut}`);
  //     const workingHours = (checkOutTime - checkInTime) / (1000 * 60 * 60); // in hours
  //     return { ...entry, workingHours };
  //   });
  // console.log(workingHoursData)

  // console.log(Math.floor((userAttendence.length )/2))
  // // Calculate total working days
  // const totalWorkingDays =Math.floor((userAttendence.length )/2)
  
  // useEffect(()=>{
  //   handleGetAttendance();
  //   setCurrentDateTime(new Date())
  // },[])
  // console.log(userAtendenceData)
  return (
//     <div className="App" style={{ backgroundColor: "black", color: "red", height: "100vh" }}>
//       <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>
//         {/* <h1 style={{color:"wheat",}}> May I Help You  </h1> */}

//       </div>

//       <div style={{ display: "flex", flexDirection: "row", visibility: "hidden" }}>
//         <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", width: "30vw", padding: "3vh", borderRadius: "1vh", marginTop: "2vh", marginLeft: "1vh" }}>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <label>Email:</label>
//             <input style={{ padding: "1vh", width: "30vw" }} placeholder='Enter Your E-Mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <label>Password</label>
//             <input style={{ padding: "1vh", marginTop: "1vh", width: "30vw" }} placeholder="Enter your Name" type="password" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//         </div>
//       </div>
//       <div style={{ display: "flex", flexDirection: "row", gap: "1vh", marginTop: "2vh" }}>
      
//         {showData ?<>
//          <button style={{ backgroundColor: "green", width: "20vw", padding: "2vh", borderRadius: "2vh" }} onClick={handleCheckIn}>Check In</button>
           
//           </>
          
//           : <>
//             <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//               <button style={{ backgroundColor: "red", width: "30vw", padding: "2vh", borderRadius: "2vh" }} onClick={handleCheckOut}>Check Out</button>
//               {/* <button style={{ backgroundColor: "yellow", width: "30vw", padding: "2vh", borderRadius: "2vh" }} onClick={fetchAttendanceData}>Fetch Attendance Data</button> */}
//             </div>
            
//             {/* <button style={{backgroundColor:"white",width:"30vw", padding:"2vh", borderRadius:"2vh"}} onClick={fetchAllAttendanceData}>Fetch All Attendance Data</button> */}
//           </>
//         }</div>
//       <div style={{ display: "flex", flexDirection: "row", backgroundColor: "black", color: "white" }}>

//         {/* <div>
//           <h2>Date</h2>
//           {
//             userAtendenceData.map((value) => {
//               return (<>
//                 <p>

//                   {value.date}
//                 </p>
//               </>)
//             })

//           }
//         </div> */}

//         {/* <div>
//           <h2>checkIn time</h2>
//           {
//             userAtendenceData.map((value) => {
//               return (<>
//                 <p>
                
//                   {value.checkIn}
//                 </p>
//               </>)
//             })

//           }
//         </div> */}

//         {/* <div>
//           <h2> check Out Time</h2>

//           {
//             userAtendenceData.map((value) => {
//               return (<>
//                 <p>
//                   {value.checkOut}
//                 </p>
//               </>)
//             })

//           }
//         </div> */}
// {/* 
//         {
//           userAtendenceData.map((value, index) => {
//             const key = Object.keys(value)
//             key.map((value) => {
//               if (value == "checkIn") {
//                console.log(value)

//               }
//             })
//           })

//         } */}

//         <table border={2} style={{ width: "100%", borderColor:"aqua" }}>
//           <thead>
//             <tr>

//               <th>Date</th>
//               <th style={{ backgroundColor: "green", padding:"1vh"}}>Check In</th>
//               <th style={{ backgroundColor: "red", padding:"1vh"}}>Check Out</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userAtendenceData.map((item, index) => (
//               <tr key={index}>
//                 <td style={{backgroundColor:"white", color:"black",padding:"1vh"}}>{item.date}</td>
//                 <td style={{ backgroundColor: "green", padding:"1vh"}}>{item.checkIn}</td>
//                 <td style={{ backgroundColor: "red", padding:"1vh" }}>{item.checkOut}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div style={{visibility:"hidden"}}>
//           <h2>Add Employee</h2>
//           <label>Email:</label>
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           <button onClick={handleAddEmployee}>Add Employee</button>
//         </div>
//         {showData? <div>
//           <h2>CheckIn</h2>
//           <label>Email:</label>
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <button onClick={handleAddAttendance}>CheckIn</button>
//         </div>:
//         <div>
//           <h2>CheckOut</h2>
//           <label>Email:</label>
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <button onClick={handleAddAttendanceCheckOut}>CheckOut</button>
//         </div>
//         } 
//         <table border={2} style={{width:"100%", borderColor:"aqua"}}>
//           <thead>
//           <tr style={{padding:"2vh"}}>
//               <td colSpan="4" style={{backgroundColor:"red",padding:"2vh"}}>Total Working Days: {totalWorkingDays}</td>
//           </tr>
//             <tr>
//               <th style={{backgroundColor:"yellow", color:"black",padding:"2vh"}}>Date</th>
//               <th style={{backgroundColor:"green",padding:"2vh"}}>Check In</th>
//               <th style={{backgroundColor:"red",padding:"2vh"}}>Check Out</th>
      
//             </tr>
//           </thead>
//           <tbody>
//             {userAttendence.map((entry, index) => (
//               <tr key={index}>
//                 <td style={{backgroundColor:"yellow", color:"black",padding:"2vh"}}>{entry.date}</td>
//                 <td style={{backgroundColor:"green",padding:"2vh"}}>{entry.checkIn || 'N/A'}</td>
//                 <td style={{backgroundColor:"red",padding:"2vh"}}>{entry.checkOut || 'N/A'}</td>
           
//               </tr>
//             ))}
//           </tbody>
//         </table>
//     </div>
   <>
   </>
  );
}

export default Profile;
