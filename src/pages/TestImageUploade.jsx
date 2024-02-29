
// // App.js
// import React, { useRef } from 'react';
// import axios from 'axios';

// function TestImageUploade() {
//   const videoRef = useRef(null);

//   const captureImage = async () => {
//     const video = videoRef.current;

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append('image', blob, 'screenshot.png');

//       try {
//         await axios.post('http://localhost:5000/uploadtestComponent', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         console.log('Image uploaded successfully');
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }, 'image/png');
//   };

//   return (
//     <div className="App">
//       <video ref={videoRef} autoPlay />
//       <button onClick={captureImage}>Capture Image</button>
//     </div>
//   );
// }

// export default TestImageUploade;
