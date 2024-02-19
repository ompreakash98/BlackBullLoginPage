import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Camera() {
    const[imageData,setImageData]=useState(null);
    const captureImage=async()=>{
       try {
        const stream= await navigator.mediaDevices.getUserMedia({video:true});
        const video=document.createElement("video");
        document.body.appendChild(video);
        video.srcObject=stream;

        //wait for the video metadata to bew loades
        await new Promise(resolve=>{
            video.onloadedmetadata=()=>{
                video.play();
                resolve();
            }
        });
        const canvas=document.createElement("canvas");
        canvas.height=video.videoHeight;
        canvas.width=video.videoWidth;
        const context=canvas.getContext('2d');
        context.drawImage(video,0,0,canvas.width,canvas.height)
        const dataUrl=canvas.toDataURL('image/png')
         setImageData(dataUrl)

         video.pause();
         stream.getTracks().forEach(track=> track.stop())

         document.body.removeChild(video)
       } catch (error) {
      console.error("Errror capturing image")
       }
    }

    useEffect(()=>{
        captureImage()
    },[])
  return (
    <div>
    {imageData && <img style={{height:"80px", width:"80px", borderRadius:"50%"}} src={imageData} alt="Captured" />}
    

    <div>
    {/* {imageData && (
    //   <img src={`data:image/png;base64,${imageData}`}  />
    )} */}
  </div>
  </div>
  )
}
