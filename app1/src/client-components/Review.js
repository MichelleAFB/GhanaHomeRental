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
      setApplication(application.application.application)
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
 // console.log(app.application_status+" "+app.stay_start_date)
console.log(app)
  if(!isLoading && app.review!="" ){ 
    console.log(app)
      console.log(app.application_status+" "+app.stay_start_date + app.review)

  
    const user=JSON.parse(sessionStorage.getItem("user"))  
   
    if(user.firstname==app.firstname && user.lastname==app.lastname && user.email==app.email && (app.application_status=="CHECKEDOUT" || app.application_status=='CHECKEDOUT')){
  return (
    <div class="h-full bg-yellow-300 rounded-md p-5 block ml-5 mr-5 mb-5">
        <p class=" font-bold text-xl">{app.stay_start_date}-{app.stay_end_date}</p>
        <div class="flex ">
          <i class="m-3 font-semibold">
             "{app.review} "
            <br/>- <p class="text-normal font-bold">{app.firstname} {app.lastname}</p>
          </i>
        </div>
       <div class="flex flex-col ">
         <ReviewImageCarousel images={images}/>
       </div>
        
          
            
        
        <div>
         
        </div>
    </div>
  )
  }
  else{
    return(
      <div class="h-full bg-gray-300 rounded-md p-5 block ml-5 mr-5 mb-5">
      <p class=" font-bold text-xl">{app.stay_start_date}-{app.stay_end_date}</p>
      <div class="flex ">
        <i class="m-3 font-semibold">
           "{app.review} "
          <br/>- <p class="text-normal font-bold">{app.firstname} {app.lastname}</p>
        </i>
      </div>
     <div class="flex flex-col ">
       <ReviewImageCarousel images={images}/>
     </div>
      
        
          
  
       <div>
      </div>
  </div>
    )
  }
}else if((app.review=="" || app.review==null || app.review=='') && (app.application_status=="CHECKEDOUT" || app.application_status=='CHECKEDOUT')){
  console.log("review null")

  return(
    <div class="h-full bg-gray-300 rounded-md p-5 block ml-5 mr-5 mb-5">
      <p class=" font-bold text-xl">{app.stay_start_date}-{app.stay_end_date}</p>
      <div class="flex ">
        <i class="m-3 font-semibold">
          
          <br/>-<p class="text-normal font-bold">{app.firstname} {app.lastname}</p>
        </i>
      </div>
        <div class="flex flex-col ">
           <ReviewImageCarousel images={images}/>
         </div>
        <div> 
      </div>
  </div>
  )

}

else{
    return(<div>{app.application_status} {app.stay_start_date}</div>)
  }
}

export default Review