import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterString, setFilterString] = useState('');
  const[imageurls,setImagesUrls]=useState([])

  const [loading, setLoading] = useState(true);
  const getAllImageurls = async () => {
    
    try {
      const response = await fetch(`http://localhost:7000/images`);
      const data = await response.json();
      setImagesUrls(data)
      // console.log(data)
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };


  useEffect(()=>{
    getAllImageurls()
  },[])


  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/allatendence');
        setAttendanceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);
  const handleShortedByEmail=() => {
    // Filter data based on filterString and current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const filtered = attendanceData.filter(entry => {
      const entryDate = new Date(entry.allAttendance[0].date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear &&
        entry.employeeEmail.includes(filterString)
      );
    });
    // Sort filtered data alphabetically based on employee email
    const sortedFilteredData = filtered.sort((a, b) =>
      a.employeeEmail.localeCompare(b.employeeEmail)
    );
    setFilteredData(sortedFilteredData);
  }
  useEffect(()=>{

    handleShortedByEmail()
  }  
    , [attendanceData, filterString]);
 
  
  const handleInputChange = event => {
    setFilterString(event.target.value);
  };
  console.log("filterdata",filteredData)
  const handleShortByDate=() => {
    // Filter data based on filterString and current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const filtered = attendanceData.filter(entry => {
      const entryDate = new Date(entry.allAttendance[0].date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear &&
        entry.employeeEmail.includes(filterString)
      );
    });
    
    // Sort filtered data in descending order based on date
    const sortedFilteredData = filtered.sort((a, b) => {
      const dateA = new Date(a.allAttendance[0].date);
      const dateB = new Date(b.allAttendance[0].date);
      // If dates are equal, sort alphabetically based on employee email
      if (dateA.getTime() === dateB.getTime()) {
        return a.employeeEmail.localeCompare(b.employeeEmail);
      }
      // Else, sort by date in descending order
      return dateB - dateA;
    });
  
    setFilteredData(sortedFilteredData);
  }
  return (
    <div>
      <h1>Admin Page</h1>
     
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border={1} style={{ width: "100%", marginTop: "5vh" }}>
        <caption>
          
          <button onClick={()=>{
          handleShortedByEmail()
          }} style={{padding:"1vh"}}>Short By Email</button>
          <input
            style={{ marginBottom:"2vh",marginTop: "2vh", padding: "1vh", overflow:"scroll" }}
            type="text"
            placeholder="Filter By Employee Email Or Name"
            
            value={filterString}
            onChange={handleInputChange}
          />
          <button onClick={()=>{
          handleShortByDate()
          }} style={{padding:"1vh"}}>Short By Date</button>
        </caption>
        <thead>
          <tr>
            <th>Employee Email</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Location</th>
            <th>Total Working Hour</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => {
            let currenCheckIntime = entry.allAttendance[0].checkIn;
            let currentCheckOutTime = entry.allAttendance[0].checkOut;
            let latitude = entry.allAttendance[0].latitude;
            let longitude = entry.allAttendance[0].longitude;
      
            // Parse the time strings into Date objects
            const checkIn = new Date(`2000-01-01 ${currenCheckIntime}`);
            const checkOut = new Date(`2000-01-01 ${currentCheckOutTime}`);
      
            // Calculate the time difference in milliseconds
            const timeDiffInMillis = checkOut - checkIn;
      
            // Convert milliseconds to hours, minutes, and seconds
            const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60));
            const locationurl = `https://maps.google.com/?q=${parseFloat(latitude)},${parseFloat(longitude)}`;
      
            let imageurl = '';
            // Assuming imageurls is an array of objects containing image data
            imageurls.forEach((value) => {
              let testurl = value.imagePath;
              const parts = testurl.split('_')[0].split('\\')[1];
              const formattedDatenow = parts.replace(/-/g, ' ');
              const email = testurl.split('_')[1].split('.')[0];
              const updatedurl = testurl.split('\\')[1];
              if (entry.employeeEmail === value.email && entry.allAttendance[0].date === formattedDatenow) {
                imageurl = updatedurl;
              }
            });
      
            return (
              <tr key={index}>
                <td>{entry.employeeEmail}</td>
                <td>{entry.allAttendance[0].date}</td>
                <td>{entry.allAttendance[0].checkIn}</td>
                <td>{entry.allAttendance[0].checkOut}</td>
                <td><a href={locationurl} target='_blank'>location</a></td>
                <td>{hours + " hours " + minutes + " minutes"}</td>
                <td>
                  <div>
                    <img
                      src={`http://localhost:7000/uploads/${imageurl}`}
                      alt=''
                      style={{
                        height: "10vh",
                        width: "10vh",
                        borderRadius: "50%",
                        transition: "transform 0.2s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(3.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      )}
    </div>
  );
}

export default AdminPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filterString, setFilterString] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/allatendence');
//         setAttendanceData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   useEffect(() => {
//     // Filter data based on filterString
//     const filtered = attendanceData.filter(entry =>
//       entry.employeeEmail.includes(filterString)
//     );
//     // Sort filtered data alphabetically based on employee email
//     const sortedFilteredData = filtered.sort((a, b) =>
//       a.employeeEmail.localeCompare(b.employeeEmail)
//     );
//     setFilteredData(sortedFilteredData);
//   }, [attendanceData, filterString]);

//   const handleInputChange = event => {
//     setFilterString(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Admin Page</h1>
     
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table border={1} style={{width:"100%", marginTop:"5vh"}}>
//           <caption>
//           <input
//       style={{marginTop:"2vh",padding:"1vh"}}
//         type="text"
//         placeholder="Filter by employee email"
//         value={filterString}
//         onChange={handleInputChange}
//       />
//           </caption>
//           <thead>
//             <tr>
//               <th>Employee Email</th>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Total Working Hour</th>

//             </tr>
//           </thead>
//           <tbody>
//             {
              
//               filteredData.map((entry,index)=>{
//              let    currenCheckIntime=entry.allAttendance[0].checkIn;
//              let  currentCheckOutTime=entry.allAttendance[0].checkOut;
//              let  latitude=entry.allAttendance[0].latitude;
//              let  longitude=entry.allAttendance[0].longitude;
//                      // Parse the time strings into Date objects
// const checkIn = new Date(`2000-01-01 ${currenCheckIntime}`);
// const checkOut = new Date(`2000-01-01 ${currentCheckOutTime}`);

// // Calculate the time difference in milliseconds
// const timeDiffInMillis = checkOut - checkIn;

// // Convert milliseconds to hours, minutes, and seconds
// const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
// const minutes = Math.floor((timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60));
// const seconds = Math.floor((timeDiffInMillis % (1000 * 60)) / 1000);

//                 return (<>
//                  <tr key={index}>
//                 <td>{entry.employeeEmail}</td>
//                 <td>{entry.allAttendance[0].date}</td>
//                 <td>{entry.allAttendance[0].checkIn}</td>
//                 <td>{entry.allAttendance[0].checkOut}</td>
//                 <td>{hours+" hours"+minutes+"minutes"}</td>

//               </tr>
//                 </>)
//               })
//             }
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminPage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/allatendence');
//         const filteredData = response.data.filter(entry => {
//           // Parse the date from the string and extract month and year
//           const date = new Date(entry.allAttendance[0].date);
//           const month = date.getMonth();
//           const year = date.getFullYear();
//           // Get the current month and year
//           const currentDate = new Date();
//           const currentMonth = currentDate.getMonth();
//           const currentYear = currentDate.getFullYear();
//           // Return true only if the entry's date is in the current month and year
//           return month === currentMonth && year === currentYear;
//         });
//         setAttendanceData(filteredData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []); // Empty dependency array to ensure the effect runs only once

//   return (
//     <div>
//       <h1>Admin Page</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table border={1} style={{width:"100%", marginTop:"10vh"}}>
//           <thead>
//             <tr>
//               <th>Employee Email</th>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               {/* Add additional headers as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.employeeEmail}</td>
//                 <td>{entry.allAttendance[0].date}</td>
//                 <td>{entry.allAttendance[0].checkIn}</td>
//                 <td>{entry.allAttendance[0].checkOut}</td>
//                 {/* Add additional columns as needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:9000/allatendence')
//       .then(response => {
//         // Sort the data by employee email alphabetically
//         const sortedData = response.data.sort((a, b) => {
//           if (a.employeeEmail < b.employeeEmail) return -1;
//           if (a.employeeEmail > b.employeeEmail) return 1;
//           return 0;
//         });
//         setAttendanceData(sortedData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []); // Empty dependency array to ensure the effect runs only once

//   return (
//     <div>
//       <h1>Admin Page</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table border={1} style={{width:"100%", marginTop:"10vh"}}>
//           <thead>
//             <tr>
//             <th>Employee Name</th>

//               <th>Employee Email</th>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               {/* Add additional headers as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.employeeEmail.split("@")[0]}</td>
//                 <td>{entry.employeeEmail}</td>
//                 <td>{entry.allAttendance[0].date}</td>
//                 <td>{entry.allAttendance[0].checkIn}</td>
//                 <td>{entry.allAttendance[0].checkOut}</td>
//                 {/* Add additional columns as needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminPage;

// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../store/Auth';
// import { useAsyncError, useNavigate} from 'react-router-dom';
// // const currentdate = new Date()
// import {  toast } from 'react-toastify';
// import { Navigate,Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import Camera from '../pages/Camera';
// import axios from 'axios';
// import TestImageUploade from '../pages/TestImageUploade';

// function AdminPage() {
//   const [imageData, setImageData] = useState('');
//   const[fetchImageData,setFetchImageData]=useState([])
//   const[imageurls,setImagesUrls]=useState([])
//   //this is the variable for count total half day
//   const[totalHalfDays,setTotalHalfDays]=useState(0)
//   //this is the state that store total working day
//   //this is for count of total sanday and saturday
//   const[totalSaturdaynSunday,setTotalSaturdaynSunday]=useState(0)
//   const[totalworkinDay,setTotalworkinDay]=useState(0)
//    const[absentDays,setAbsentDays]=useState(0)
//    const[showButton,setShowButton]=useState(true);
//   // const[attendanceData,setAttendanceData]=useState([]);
//   const [checkInTime, setCheckInTime] = useState('');
//   const [checkOutTime, setCheckOutTime] = useState('');
//   const[showLocationButton,setShowLocationButton]=useState(false)
//   const {user} = useAuth()
 
//   const [email, setEmail] = useState(user.userData.email);
//   // const [email, setEmail] = useState('');

//   // console.log("user from attendene email is  ",email)
//   //this is the variable of calculating the workin date 
//   const[workingDate,setWorkingDate]=useState(0)
//   const [attendanceData, setAttendanceData] = useState([]);
//   const[checkinDate,setCheckInDate]=useState('')
//   const[checkinTimeofUse,setCheckInTimeOfUser]=useState('')
// //Get the total number of days in  the current month 
//   const totalDaysInMonth= new Date(new Date().getFullYear(),new Date().getMonth() +1,0).getDate();
//     const [totalLateCheckIns, setTotalLateCheckIns] = useState(0);

//   const currentMonthData={
//   1:true,  //example user:user logged in on day 1
//   2:false  // example user:user did't logged on the date
// };

// //generating n arrey of size on the basis of curren month

// const daysOfMonth=Array.from({length:totalDaysInMonth},(_,index)=>index +1);
// const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const [location, setLocation] = useState({});

// // console.log(daysOfMonth.length);
// const userData=[{date:"06-02-2024",checkInTime:"90:00Am",checkOutTime:"7:00pm"},{date:"07-02-2024",checkInTime:"90:00Am",checkOutTime:"6:00pm"},{date:"14-02-2024",checkInTime:"10:00Am",checkOutTime:"6:00pm"}]

// // console.log(userData.length)
//  const navigation=useNavigate()
//  //function for uploding image 
// const uploadImage = async () => {
//   try {
//     await axios.post('http://localhost:7000/upload',{imageData,email});
//     // console.log('Image uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };
//  //this is the function that capture the image from video stream
//  const captureImage = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     const video = document.createElement('video');
//     document.body.appendChild(video);
//     video.srcObject = stream;

//     // Wait for the video metadata to be loaded
//     await new Promise(resolve => {
//       video.onloadedmetadata = () => {
//         // Start playing the video once metadata is loaded
//         video.play();
//         resolve();
//       };
//     });

//     // Capture the image from the video stream
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataUrl = canvas.toDataURL('image/png');
//     setImageData(dataUrl);
//     // const base64ImageData = dataUrl.split(',')[1];
//     // const imageDataString = atob(base64ImageData);
//     const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

    
//     // Stop the video stream and remove the video element
//     video.pause();
//     stream.getTracks().forEach(track => track.stop());
//     document.body.removeChild(video);
    
//     return dataUrl
//   } catch (error) {
//     console.error('Error capturing image:', error);
//   }
// };
// const uploadToBackend = async () => {
//   try {
//     const formData = new FormData();
//     formData.append('image', imageData);

//     await axios.post('http://localhost:7000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

    
//   } catch (error) {
//     console.error('Error uploading image to the backend:', error);
//   }
// };



 
//   const countWorkingDay=()=>{
    
//   }
//   const setbutton=()=>{
    
//     return setShowButton(!showButton)
//   }
  
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleCheckInChange = (e) => {
//     setCheckInTime(e.target.value);
//   };

//   const handleCheckOutChange = (e) => {
//     setCheckOutTime(e.target.value);
//   };
//   //this is the function for cheking current location
//   function handleLocationClick() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.log("Geolocation not supported");
//     }
//   }
//   function success(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     setLocation({ latitude, longitude });
//     // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     // Make API call to OpenWeatherMap
   
//   }
//   function error() {
//     console.log("Unable to retrieve your location");
//   }
//   useEffect(()=>{
//     handleLocationClick()
//   },[])
// const locationurl=`https://maps.google.com/?q=${location.latitude},${location.longitude}`

//   const handleCheckIn = async () => {
   
//     try {

//      await captureImage()

//      await uploadImage()
      
      
//       const response = await fetch('http://localhost:9000/attendance/checkIn', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           employeeEmail:email,
//           allAttendance: [
//             {
//               date: new Date().toDateString(),
//               checkIn: new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: '2-digit', second: '2-digit',hour12: true}),
//               checkOut: " ",
//               latitude:location.latitude,
//               longitude:location.longitude,
//               userImage:imageData

//             },
            
//           ]
//         }),
//       });
//       if (response.ok) {
//         // console.log('Check-in successful.');
//         setShowLocationButton(true)
//         toast.success("Check-in successful");
//         setbutton()
        
//         // Optionally, you can update the UI or fetch attendance data here
//       } else {
//         console.error('Check-in failed.');
//       }
//     } catch (error) {
//       console.error('Error during check-in:', error);
//     }
//   };

//   const handleCheckOut = async () => {
//     try {

//       const response = await fetch('http://localhost:9000/attendance/checkOut', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           employeeEmail:email,
//           allAttendance: [
//             {
//               date: new Date().toDateString(),
//               checkOut: new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: '2-digit', second: '2-digit',hour12: true})
//              ,
//               userImage:imageData

//             },
            
//           ]
//         }),
//       });
//       if (response.ok) {
//         // console.log('Check-out successful.');
//         toast.success("Check-Out successful")
//         // Optionally, you can update the UI or fetch attendance data here
//         setEmail(" ")

//         navigation('/logout')
        
//         // navigation('/login')
//       } else {
//         console.error('Check-out failed.');
//       }
//     } catch (error) {
//       console.error('Error during check-out:', error);
//     }
//   };

//   // console.log(new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: '2-digit', second: '2-digit',hour12: true}))
//   // console.log(new Date().toLocaleDateString())

//   const getAttendanceData = async () => {
    
//     try {
//       const response = await fetch(`http://localhost:9000/api/attendance/${email}`);
//       const data = await response.json();
//       setAttendanceData(data);
//       // console.log(data)
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   const getAllImageurls = async () => {
    
//     try {
//       const response = await fetch(`http://localhost:7000/images/${email}`);
//       const data = await response.json();
//       setImagesUrls(data)
//       // console.log(data)
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   // console.log(attendanceData)

//   // 
//   useEffect(()=>{
//     getAllImageurls()
//   },[uploadImage,email])

//   //this function for checking user allready atttended tody or not 
//   const getStatusUserAttendedAlready= async ()=>{
//     try {
//       const response=await fetch(`http://localhost:9000/attendance/test/${email}/${new Date().toDateString()}`)
//       const status= await response.json()
//       if(status){
//         setShowButton(false)
//       }else{
//         setShowButton(true)
//       }
      
//     } catch (error) {
      
//     }
//   }

//   //this is the function that get all user data
//   useEffect(()=>{

//     getAttendanceData ()
//     // setShowButton(checkAttendenceForToday())
    
//   },[email])
//   //this is the function that check  user attended allready or not
//   useEffect(()=>{
//     getAttendanceData ()
//     // setCheckInDate(attendanceData[0].allAttendance[0].date)
//     // setCheckInTimeOfUser(attendanceData[0].allAttendance[0].time)
//     getStatusUserAttendedAlready()
//   },[email])
//  //this is the function that count latecheckin
//   useEffect(() => {
//     let lateCheckInCount = 0;

//     attendanceData.forEach((value) => {
//       if (value.allAttendance[0].checkIn && new Date(`2000-01-01 ${value.allAttendance[0].checkIn}`) > new Date(`2000-01-01 10:15 AM`)&&value.allAttendance[0].date.split(" ")[1]=== new Date().toDateString().split(" ")[1]) {
//         lateCheckInCount++;
//       }
//     });

//     setTotalLateCheckIns(lateCheckInCount);
//   }, [attendanceData]);

//   //this this the function that count all working days

//   useEffect(() => {
//     let count=0
    
   
//     attendanceData.map((value)=>{
    
//         if(value.allAttendance[0].date.split(" ")[1]=== new Date().toDateString().split(" ")[1]
        
//         && value.allAttendance[0].checkIn !=="" && value.allAttendance[0].checkOut !=="" ){
//           count++
//         }

     


//     })

//     setTotalworkinDay(count)

   
//   }, [attendanceData]);
// //this is the finction that formate the data i 
// function formatDate(dateString) {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const parts = dateString.split(' ');
//   const year = parts[3];
//   const month = (months.indexOf(parts[1]) + 1).toString().padStart(2, '0'); // Months are 0-indexed in JavaScript Date
//   const day = parts[2].padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

// //this function count tolat saturday and sunday
// function countSaturdaySundy(){
//   const startDate='2024-02-01';
//   const endDate='2024-02-15'
//   let totalCount=0;
//   let currenDate=new Date(startDate);
//   let  end=new Date(startDate);

//   while(currenDate<=end){
//     if(currenDate.getDate()===0 ||currenDate.getDate()===6){
//       totalCount++;
//     }
//     currenDate.setDate(currenDate.getDate()+1);
//   }

//   console.log("total day from countday",totalCount)

// }

// useEffect(()=>{
//   countSaturdaySundy()
// },[])
  
// //this is the function that count all halfdays in the month
// useEffect(()=>{
//   let halfday=0;
//   attendanceData.map((value)=>{
//     let checin=value.allAttendance[0].checkIn;
//     let checout=value.allAttendance[0].checkOut;
//     const totalhour=new Date(`2000-01-01 ${checin}`)-new Date(`2000-01-01 ${checout}`)
//     let exathour=Math.abs(Math.floor(totalhour/(1000 * 60 * 60)))
//     if(value.allAttendance[0].date.split(" ")[1]=== new Date().toDateString().split(" ")[1]&&exathour<=5){
//       halfday++
//     }

//   })
//   setTotalHalfDays(halfday)
// },[attendanceData]);





//  // this is the function that count all absent date 
  
//   useEffect(() => {
   
//     if (attendanceData.length === 0) return;

//     const currentDate = new Date(); // Get the current date
//     const currentMonth = currentDate.getMonth(); // Get the current month

//     let nonWorkingDays = 0; // Initialize the count of non-working days

//     attendanceData.forEach(record => {
//         const month = new Date(record.allAttendance[0].date).getMonth(); // Get the month of each attendance record

//         if (month === currentMonth) { // Check if the record is in the current month
//             const lastCheckInDate = new Date(record.allAttendance[0].date); // Get the date of the last check-in
//             let currentDateTemp = new Date(lastCheckInDate); // Start from the last check-in date

//             // Loop until the temporary date reaches the current date
//             while (currentDateTemp <= currentDate) {
//                 const dayOfWeek = currentDateTemp.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
                
//                 // Check if the day is a Saturday (6) or Sunday (0) or if it is a holiday
//                 if (dayOfWeek === 0 || dayOfWeek === 6 || isHoliday(currentDateTemp)) {
//                     nonWorkingDays++; // Increment the count of non-working days
//                 }
                
//                 currentDateTemp.setDate(currentDateTemp.getDate() + 1); // Move to the next day
//             }
//         }
//     });

//     setAbsentDays(nonWorkingDays);

//     // Here you can do something with the nonWorkingDays variable, such as updating state or displaying it in the UI
// }, [attendanceData]);

// // Function to check if a given date is a holiday
// function isHoliday(date) {
//     // Implement your logic to determine if the date is a holiday
//     // This could involve checking against a list of known holidays or other criteria
//     // For the sake of simplicity, let's assume there is no holiday in this example
//     return false;
// }

// // useEffect(() => {
// //   const fetchImage = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:7000/api/images`); // Replace 123 with the actual image ID
// //       // console.log(response.data.imageData[0].data)
      
// //       setFetchImageData(response.data.imageData);
// //     } catch (error) {
// //       console.error('Error fetching image:', error);
// //     }
// //   };

// //   fetchImage();
// // }, []);

// // console.log("userdata",attendanceData)
// // console.log(imageData)

// // console.log("imagesurls===>",imageurls )
//   return (
//     <>
//     <div style={{display:"flex",justifyContent:"center"}}>
//     </div>
//     <div style={{display:"flex", backgroundColor:"white",color:"black", flexDirection:"column",height:'',gap:"2vh",}} > 
//            <h1>WELCOME TO ADMIN PAGE</h1>

//       <div style={{visibility:"" ,display:"flex",justifyContent:"center" ,gap:"1vh"}}>
//         <label htmlFor="email">Enter Email:</label>
//         <input type="text" id="email" value={email} onChange={handleEmailChange} style={{padding:'1vh'}} />
//         <button onClick={getAttendanceData}>check Atendence</button>
//       </div>

//       <div style={{display:"flex", justifyContent:"center",alignItems:"center", position:"absolute", marginLeft:"50%",marginTop:"10vh"}}>
//       {/* <Camera/> */}
//        {/* <div><img src={imageData} alt="" style={{height:"8vh",width:"8vh", borderRadius:"50%"}}/></div>    */}
//        {/* <button onClick={captureImage}>Capture Image</button> */}
//        {/* <a href=''> <button onClick={uploadImage}>Upload Image</button></a> */}
//       </div>
     
//      {showButton? <div style={{display:"flex", justifyContent:"end", marginLeft:"10vh"}}>
//         {/* <label htmlFor="checkInTime">Check In Time:</label>
//         <input type="text" id="checkInTime" value={checkInTime} onChange={handleCheckInChange} /> */}
//        <>
//         <button onClick={()=>{
//           handleCheckIn()
          
//         }}style={{visibility:"hidden",padding:"3vh", backgroundColor:"#d7d7db",borderRadius:"10vh", color:"green" ,boxShadow:"1px 1px 10px green",marginRight:"10vh",marginTop:"8vh"}}>Check In</button>
       
//       </>

//       </div>:
//       <div style={{display:"flex",justifyContent:"end",marginRight:"10vh"}}>
//         {/* <label htmlFor="checkOutTime">Check Out Time:</label>
//         <input type="text" id="checkOutTime" value={checkOutTime} onChange={handleCheckOutChange} /> */}
//        <a style={{ color: "white" }} href='/logout' > 
//         <button onClick={handleCheckOut}style={{visibility:"hidden",backgroundColor:"#d7d7db",padding:"3vh", color:"red",borderRadius:"10vh", boxShadow:"1px 1px 10px black", marginTop:"0",marginBottom:""}}>Check Out</button>
//       </a>
//       </div>
//       }
      
//     </div>

//     <div>
//       <div style={{display:"flex",justifyContent:"space-around", flexDirection:"row",alignItems:"center"}}> 
//       <div>

//       <p>Total day in This month  <span style={{width:"10vw",padding:"1vh",color:"black"}}>{totalDaysInMonth}</span></p>

//        <p>Total working day <span style={{width:"10vw",padding:"1vh",color:"black"}}>{totalworkinDay}</span></p>
//        {/* <p>Total AbsentDays: {absentDays }</p> */}

//       </div>


//       <div>

//       <p>Total Late Check-Ins: {totalLateCheckIns}</p>
//       <p>Total HalfDays work <span style={{width:"10vw",padding:"1vh",color:"black"}}>{totalHalfDays}</span></p>

      
//       </div>

//       </div>
//       <div style={{display:"flex",justifyContent:"center"}}>
//     <table  style={{width:"90vw",}}>
//       <thead>
//         <tr>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Date</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Day</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Check-In Time</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Check-Out Time</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Check In Location</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Total Working Hour</th>
//           <th style={{backgroundColor:"#007fbf",padding:"1vh", color:"white"}}>Profile</th>



//         </tr>
//       </thead>
//       <tbody cellPadding={0} outline="none"  style={{borderColor:"#d7d7db", backgroundColor:"#dfdfdf"}}>
//         {daysOfMonth.map(day => {
//           const date = new Date(); // Current date
//           let totalWorkingDays=0
//           const dateObj = new Date(new Date().getFullYear(), new Date().getMonth(), day);
//           const dayName = dayNames[dateObj.getDay()];
//           const formattedDay = day.toString().padStart(2, '0'); // Ensure day starts with 0 if less than 10

//           const formattedDate = `${dayName.slice(0, 3)} ${dateObj.toLocaleString('default', { month: 'short' })} ${formattedDay} ${dateObj.getFullYear()}`;
//           // console.log('formateddate====>',formattedDate)
//           let currenCheckIntime='';
//           let currentCheckOutTime='';
//           let latitude='';
//           let showlocationbutton=false;
//           let longitude=''
//           let rowStyle = {}; // Define row style object
//           let img_url=""
//           attendanceData.map((value)=>{
//             if(value.allAttendance[0].date===formattedDate){
//               currenCheckIntime=value.allAttendance[0].checkIn;
//               currentCheckOutTime=value.allAttendance[0].checkOut;
//               latitude=value.allAttendance[0].latitude;
//               longitude=value.allAttendance[0].longitude;

//               // setWorkingDate(workingDate+1)
//             }
//             if(latitude !==""){
//               showlocationbutton=true
//             }

//           })

//           imageurls.map((value)=>{
//             let testurl=value.imagePath
//             // console.log("test url",testurl)
//             const parts = testurl.split('_')[0].split('\\')[1]; 
//             // console.log("parts",parts)
//             const formattedDatenow = parts.replace(/-/g, ' ');
//             // console.log("formatteddata",formattedDatenow)
//             const email = testurl.split('_')[1].split('.')[0];
//             // console.log("email",email)
//             const updatedurl = testurl.split('\\')[1];
//             // console.log("updatedurl",updatedurl)
            

            
//             if(formattedDatenow===formattedDate &&email===email){
//               img_url=updatedurl
//             }
//             // console.log("img_url",img_url)
            
//           })
//           // console.log("imagesurl ",img_url)

//           // Check if check-in time is greater than 10:15
//           const isLateCheckIn = currenCheckIntime && new Date(`2000-01-01 ${currenCheckIntime}`) > new Date(`2000-01-01 10:15 AM`);
//           const totalhour=new Date(`2000-01-01 ${currenCheckIntime}`)-new Date(`2000-01-01 ${currentCheckOutTime}`)
//           // Parse the time strings into Date objects
// const checkIn = new Date(`2000-01-01 ${currenCheckIntime}`);
// const checkOut = new Date(`2000-01-01 ${currentCheckOutTime}`);

// // Calculate the time difference in milliseconds
// const timeDiffInMillis = checkOut - checkIn;

// // Convert milliseconds to hours, minutes, and seconds
// const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
// const minutes = Math.floor((timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60));
// const seconds = Math.floor((timeDiffInMillis % (1000 * 60)) / 1000);

//           // console.log("total working hour in onle day",Math.floor(totalhour/(1000 * 60 * 60)))
//           if (dayName === 'Sunday' || (dayName === 'Saturday' && (Math.ceil(day / 7) === 2 || Math.ceil(day / 7) === 4))) {
//             rowStyle = { backgroundColor: '#8AFF8A' };

            
            
            
//             // Set red background color for Sundays and 2nd/4th Saturdays
//           }
          
          
//           const userDataForDay = currentMonthData[day]; // Assuming currentMonthData is structured appropriately
//           const locationurl=`https://maps.google.com/?q=${parseFloat(latitude)},${parseFloat(longitude)}`
//           // console.log(locationurl)

//           return (
//             <tr key={day} style={rowStyle}>
//               <td style={{padding:"1vh"}} >{formattedDate}</td>
//               <td style={{padding:"1vh"}}>{dayName}</td>
//               {/* <td>{userDataForDay ? 'Logged In' : 'Absent'}</td> */}
//               <td style={{ padding:"1vh",color: isLateCheckIn ? 'red' : 'green' }}>{currenCheckIntime}</td>
//               <td style={{padding:"1vh"}}>{currentCheckOutTime}</td>
//               <td><a href={locationurl}>{showlocationbutton?"checkLocation":""}</a></td>
//               <td style={{padding:"1vh"}}>{showlocationbutton?hours+' hours '+minutes+" minunts":""}</td>
//               <td style={{padding:"1vh"}}>
//         {showlocationbutton ? (
//        <div>
//         <img src={`http://localhost:7000/uploads/${img_url}`} 
//         alt='' style={{height:"10vh",width:"10vh",borderRadius:"50%",
//         transition:"transform 0.2s ease"
//         }} 
//         onMouseOver={(e)=>{
//           e.currentTarget.style.transform='scale(3.2)';

//         }}

//         onMouseOut={(e)=>{
//           e.currentTarget.style.transform='scale(1)'
//         }}
//         />
      
//        </div>
//   ) : (
//     <> </>
//   )}
// </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//     </div>
//     </div>
//   <div>
//       {imageData && <img src={imageData} alt="Captured" />}
    

      
    

//     </div>
   
//     </>
//   );
// }

// export default AdminPage;





// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../store/Auth';
// const Login2 = () => {
//   const [currentDateTime, setCurrentDateTime] = useState(new Date())
//   const [userAttendence, setUserAttendence] = useState([])
//   const { user } = useAuth()
//   const [email, setEmail] = useState(user.userData.email);
//   const [name, setName] = useState(user.userData.userId);
//   const [date, setDate] = useState('');
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const[showData,setShowData]=useState(true)
//   console.log(currentDateTime.toLocaleDateString())
//   console.log(currentDateTime.toLocaleString().split(",")[1]);
  
//   const checkUserChechedInOrNot= ()=>{
//     return (userAttendence.map((value)=>{
//       if(value.date==date && value.checkOut){
//         return (false);
//       }
//       else {
//         return (true)
//       }
//     }))
//   }
//   const handleAddEmployee = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/employees', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, name }),
//       });

//       if (response.ok) {
//         console.log('Employee added successfully');
//       } else {
//         const data = await response.json();
//         console.error('Error adding employee:', data.error);
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error.message);
//     }
//   };

//   const handleAddAttendance = async () => {
//     setShowData(false)
//     checkUserChechedInOrNot()
//     setCurrentDateTime(new Date())
//     console.log(email)
//     try {
//       const response = await fetch(`http://localhost:3001/attendance/${email}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, date: currentDateTime.toLocaleDateString(), checkIn: currentDateTime.toLocaleString().split(",")[1] }),
//       });

//       if (response.ok) {
//         console.log('Attendance added successfully');
//       } else {
//         const data = await response.json();
//         console.error('Error adding attendance:', data.error);
//       }
//     } catch (error) {
//       console.error('Error adding attendance:', error.message);
//     }
//   };

//   const handleAddAttendanceCheckOut = async () => {
//     checkUserChechedInOrNot()
//     setCurrentDateTime(new Date())
//     setShowData(!false)

//     try {
//       const response = await fetch(`http://localhost:3001/attendance/${email}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, date: currentDateTime.toLocaleDateString(), checkOut: currentDateTime.toLocaleString().split(",")[1] }),
//       });

//       if (response.ok) {
//         console.log('Attendance added successfully');
//       } else {
//         const data = await response.json();
//         console.error('Error adding attendance:', data.error);
//       }
//     } catch (error) {
//       console.error('Error adding attendance:', error.message);
//     }
//   };

//   const handleGetAttendance = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/attendance/${email}`);

//       if (response.ok) {
//         const data = await response.json();
//         setUserAttendence(data[0].allAttendance)
//         // console.log(data[0].allAttendance);
//       } else {
//         const data = await response.json();
//         console.error('Error getting attendance:', data.error);
//       }
//     } catch (error) {
//       console.error('Error getting attendance:', error.message);
//     }
//   };
//   const workingHoursData = userAttendence
//     .filter(entry => entry.checkIn && entry.checkOut)
//     .map(entry => {
//       const checkInTime = new Date(`2024-01-25T${entry.checkIn}`);
//       const checkOutTime = new Date(`2024-01-25T${entry.checkOut}`);
//       const workingHours = (checkOutTime - checkInTime) / (1000 * 60 * 60); // in hours
//       return { ...entry, workingHours };
//     });
//   console.log(workingHoursData)

//   console.log(Math.floor((userAttendence.length )/2))
//   // Calculate total working days
//   const totalWorkingDays =Math.floor((userAttendence.length )/2)
  
//   useEffect(()=>{
//     handleGetAttendance()
//   },[])
//   useEffect(()=>{
//     handleAddEmployee()
//   },[])
  
//   return (
//     <div style={{backgroundColor:"black", color:"white"}}>
//       <h1>Attendance App</h1>

//       <div>
//         <h2>Add Employee</h2>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         <button onClick={handleAddEmployee}>Add Employee</button>
//       </div>

//      {showData? <div>
//         <h2>CheckIn</h2>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <button onClick={handleAddAttendance}>CheckIn</button>
//       </div>:
//       <div>
//         <h2>CheckOut</h2>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <button onClick={handleAddAttendanceCheckOut}>CheckOut</button>
//       </div>
//       } 

//       <div>
//         <h2>Get Attendance</h2>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <button onClick={handleGetAttendance}>Get Attendance</button>
//       </div>

//       {/* <table border={2}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Check In/Out</th>
//             <th>ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userAttendence.map((entry, index) => (

//             <tr key={index}>
//               <td>{entry.date}</td>
//               <td>
//                 {entry.checkIn && <span>Check In: {entry.checkIn}</span>}
//                 {entry.checkOut && <span>Check Out: {entry.checkOut}</span>}
//                 {!entry.checkIn && !entry.checkOut && 'N/A'}
//               </td>
//               <td>{entry._id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//       {/* <table border={2} style={{width:"100%"}}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Check In</th>
//             <th>Check Out</th>
          
//           </tr>
//         </thead>
//         <tbody>
//           {userAttendence.map((entry, index) => (
//             <tr key={index}>
//               <td>{entry.date}</td>
//               <td>{entry.checkIn || 'N/A'}</td>
//               <td>{entry.checkOut || 'N/A'}</td>
             
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <th>Total Working  Day</th>
//             <th>{userAttendence.length}</th>

//           </tr>
//         </tfoot>
//       </table> */}
//       <table border={2} style={{width:"100%", borderColor:"aqua"}}>
//         <thead>
//         <tr style={{padding:"2vh"}}>
//             <td colSpan="4" style={{backgroundColor:"red",padding:"2vh"}}>Total Working Days: {totalWorkingDays}</td>
//         </tr>
//           <tr>
//             <th style={{backgroundColor:"yellow", color:"black",padding:"2vh"}}>Date</th>
//             <th style={{backgroundColor:"green",padding:"2vh"}}>Check In</th>
//             <th style={{backgroundColor:"red",padding:"2vh"}}>Check Out</th>
    
//           </tr>
//         </thead>
//         <tbody>
//           {userAttendence.map((entry, index) => (
//             <tr key={index}>
//               <td style={{backgroundColor:"yellow", color:"black",padding:"2vh"}}>{entry.date}</td>
//               <td style={{backgroundColor:"green",padding:"2vh"}}>{entry.checkIn || 'N/A'}</td>
//               <td style={{backgroundColor:"red",padding:"2vh"}}>{entry.checkOut || 'N/A'}</td>
         
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div style={{ display: "flex", flexDirection: "row", justifyContent: "", backgroundColor: "black" ,color:"black", visibility:"hidden" }}>
//         <div style={{ backgroundColor: "pink", width: "100%" ,justifyContent:"center"}}>
//         <h2 style={{borderColor:"black",borderWidth:"1vh"}}>Date</h2>

//           {userAttendence.map((entry, index) => ( 

//             <>
//               <p>{entry.date}</p>
//             </>
//           ))}


//         </div>
//         <div style={{ backgroundColor: "green", width: "100%" ,justifyContent:"center",}}>
//           <h2>checkIn Time</h2>
//           {userAttendence.map((entry, index) => (

//             <>
//               <p>{entry.checkIn}</p>
//             </>
//           ))}


//         </div>
//         <div style={{ backgroundColor: "yellow", width: "100%", justifyContent:"center" }}>
//         <h2>checkOut Time</h2>

//           {userAttendence.map((entry, index) => (
//             <>
//               <p>{entry.checkOut}</p>
//             </>
//           ))}


//         </div>
//       </div>
//       <div>
      
//     </div>
//     </div>
//   );
// };

// export default Login2;


