import React from 'react'
import {useState,useEffect} from 'react'

import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';


// Import required actions and qualifiers.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import Carousel from 'react-gallery-carousel';
import ReviewImageCarousel from './ReviewImageCarousel';
function Review({application}) {

  const[app,setApplication]=useState(application.application)
  const[images,setImages]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const cldImages=[]
  console.log(application)
  useEffect((cloudImages)=>{

 
    const prom=new Promise((resolve,reject)=>{
      setApplication(application.application)
      setImages(application.images)
     setTimeout(()=>{
      resolve()
     },1000) 
   
    })

    prom.then(()=>{
      var index=0
      const prom1=new Promise((resolve1,reject1)=>{
        
     
     
        resolve1()
      
    
      })

      prom1.then(()=>{
       
        setIsLoading(false)
      })
     
    })
  },[])
  
  if(!isLoading){
    console.log(application.application)
  return (
    <div class="h-[110vh] bg-gray-300 rounded-md p-3 m-3 block ">
        <p class=" font-bold text-xl">{app.application.stay_start_date}-{app.application.stay_end_date}</p>
        <div class="flex p-3">
          <i class="m-3 font-semibold">
             "{app.application.review} ""
            <br/>- <p class="text-normal font-bold">{app.application.firstname} {app.application.lastname}</p>
          </i>
        </div>
       <div class="flex flex-col p-8">
         <ReviewImageCarousel images={images}/>
       </div>
        
          
            
        
        <div>
         
        </div>
    </div>
  )
  }else{
    return(<div></div>)
  }
}

export default Review