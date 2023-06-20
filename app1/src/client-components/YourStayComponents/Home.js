import React from 'react'
import { useState,useEffect } from 'react';

//outside
import axios from 'axios';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';
import ReviewItem from '../ReviewItem';
import ReviewModal from '../ReviewModal';
function Home({application}) {

 const[over,setOver]=useState(false)
 const[warnOver,setWarnOver]=useState(false)
 const[isLoading,setIsLoading]=useState(true)
 const[review,setReview]=useState()
 const[files,setFiles]=useState()
 const[checkedOut,setCheckedOut]=useState(false)
 const[promptCheckIn,setPromptCheckIn]=useState(false)


  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
      var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
      "Aug","Sep","Oct","Nov","Dec"];
      var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
      var cDate=new Date()
     
      var index=1
      console.log(cDate)
      var st=application.application.stay_start_date.split(" ")
      var et=application.application.stay_end_date.split(" ") 
     
     
     
      const startDate=new Date(st[3],monthnum[months.indexOf(st[1])-1],st[2])
      const endDate=new Date(et[3],monthnum[months.indexOf(et[1])-1],et[2])
      var nextDate=new Date(startDate);
      var warnDate=new Date(endDate)
      warnDate=warnDate.setDate(endDate.getDate()-1)
      warnDate=new Date(warnDate) 
      console.log("warning date"+warnDate)
      console.log(endDate)  
      console.log("warnDate:"+cDate)
        console.log("\n"+cDate.toString().substring(0,15))
        console.log("\n"+ endDate.toString().substring(0,15))

        if(((cDate.toString()==startDate.toString() && application.application.checkedIn!=1) || cDate>=startDate && cDate<=endDate) && (application.application.application_status!="CHECKEDIN")){
          setPromptCheckIn(true)
        }
      if(cDate.toString().substring(0,15)==warnDate.toString().substring(0,15) ){
        setWarnOver(true)
      }
   
      else{if(cDate.toString().substring(0,15)==endDate.toString().substring(0,15) ){
        setOver(true)
         }
        }
         resolve()

    })

    prom.then(()=>{
      setIsLoading(false)

    })

  },[])

  
  async function add(formData,index,images){
    const arr=[]
     await axios.post("https://api.cloudinary.com/v1_1/michelle-badu/image/upload/",formData).then((response1)=>{
      if(response1.data.secure_url!=null){
       console.log(response1)
       images.push({img_url:response1.data.secure_url,application_id:application.application._id})

       sessionStorage.setItem("review_images",JSON.stringify(images))
       console.log(response1)
      }
       
       
      
     })
   }

   async function setList(arr,images){
     var index=0
    
     arr.map(async(m,i)=>{

       console.log(m)
       const formData=new FormData()
       formData.append('upload_preset','zj9kqmht')
       formData.append('file',m)
       formData.append('cloud_name','michelle-badu')
       formData.append("api_key", "877163957659927")
       
       console.log(formData.entries)
       
      

        console.log(m)
        await add(formData,m,images).then((res)=>{
         const rest=files
         if(res!=false){
           console.log(images)
         
           
          
          // setRestrictedList(rest)
         }
        
           
        }).then((rest)=>{
         if(rest!=false){
         console.log(images)
           console.log(arr)
           return images
          
         }
         index++
         if(index>arr.length){
          return images
         }

        })
       
    
     })
     return images
     
   }
    //TODO:Add checkin functionality
if(!isLoading){
  var currDate=new Date()
  currDate=currDate.toString().substring(0,16)
  console.log(application.application)
  console.log(files)
  return (
    <div class="flex-col w-full min-h-screen">
      <ReviewModal/>
      <div class="flex-col w-full p-3  rounded-md m-2">
        
          <p class="text-center text-bold  font-bold text-4xl mt-4 text-white">Stay</p>
          <p class="text-center font-semibold mt-2 text-white">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
          { application.application.stay_start_date==currDate?
            <div class="bg-green-400 flex rounded-md p-3">
            Add arrival instructions
          </div>:
          <div></div>

          }
      
        {
          application.application.application_status=="CHECKEDOUT" && application.application.review==''?
          <ReviewItem application={application}/>
          :
          <div></div>
        }
       
        {
          application.application.application_status=="CHECKEDOUT" && over?
          <div class="bg-orange-300 rounded-md p-3 flex flex-col  w-full m-3">
          <p class="text-xl text-center font-bold">Your stay has come to an end</p>
          <p class="text-center">
            
            You checkout at:{application.application.checkoutTime}
          </p>
          <label class="m-2 text-xl font-semibold">Leave A Review:</label>
          <textarea rows="10" cols="40" class="rounded-md m-2" onClick={(e)=>{
            setReview(e.target.value)
          }}>

          </textarea>
          <input type="file" class="m-2" multiple="multiple" accept="image/jpeg, image/png, image/jpg" onChange={(e)=>{
            setFiles(e.target.files)
          }}/>
          <button class="bg-green-600 hover:bg-green-500 rounded-md p-3 w-full m-2" onClick={()=>{
            const images=[]
            const arr=[]

            Object.keys(files).map((key)=>{
              console.log(files[key])
              arr.push(files[key])
            })

        setList(arr,images).then((newArr)=>{
          console.log("\n\n")
          console.log(newArr)
             console.log(images)
             const newImages=JSON.parse(sessionStorage.getItem("review_images"))
            axios.post("https://ghanahomestayserver.onrender.com/current-resident/review/"+application.application._id,{review:review,images:newImages}).then((response)=>{
          console.log(response)
          if(response.data.success){
            const arr=[]
            
            
           

          }
        })
      })
         
          }}>
            <p class="text-white font-semibold">Submit</p>
          </button>
          </div>:
          <div></div>
        }
        {
           application.application.application_status!="CHECKEDOUT" && over? <div class="bg-orange-300 rounded-md p-3 flex flex-col  w-full m-3">
            <p class="text-xl text-center font-bold">Your stay has come to an end</p>
            <p class="text-center m-2">Please check out by 11:00AM and confirm your checkout.</p>
            <button class="bg-gray-300 rounded-md  flex flex-col w-full p-3 m-2" onClick={()=>{
              const currDate=new Date()
              axios.post("https://ghanahomestayserver.onrender.com/ccurrent-resident/checkout/"+application.application._id,{checkoutTime:currDate}).then((response)=>{
                console.log(response)
                if(response.data.success){
                  axios.post("https://ghanahomestayserver.onrender.com/client-applications/setStatus/"+application.application._id+"/CHECKEDOUT",{message:"Residents in this reservation have checked out at "+ currDate}).then((response1)=>{
                    console.log(response1)
                    if(response.data.success){
                      alert("SUCCESS:You have successfully check out! We hope to host you soon!")
                    }else{
                      alert(response.data.message)

                    }
                  })
                }
              })

            }}>
              <p class="text-center font-semibold">Confirm Checkout</p>
            </button>
        </div>
        :
        <div></div>
        }
           {
          warnOver? <div class="bg-orange-300 rounded-md p-3 flex flex-col  w-full m-3">
            <p class="text-xl text-center font-bold">Check out is tommorow</p>
            <p class="text-center">
              You stay is coming to an end. Please checkout tommorow before 11 AM.Remember to return to the portal to confirm checkout once you are leaving! Thank you for staying at GhanaHomeStay!
            </p>
          
        </div>
        :
        <div></div>
        }
      </div>
      {
          promptCheckIn?
          <div class="bg-gray-300 rounded-md p-3 flex flex-col  w-full m-3">
            < p class="text-center font-bold mb-3">
                  Please let checking in be the first thing you do when you arrive to the villa
                </p>
              <button class="bg-blue-500 hover:bg-blue-300 justify-center flex w-full p-3 rounded-md" onClick={()=>{
                const prom=new Promise((resolve,reject)=>{
                  var curr=new Date()
                  var time=curr.toTimeString()
                  curr=currDate.toString().substring(0,15)
                  axios.post("http://localhost:3012/client-applications/setStatus/"+application.application._id+"/CHECKEDIN",{message:"Occupants checked in at "+time +" on "+curr}).then((response)=>{
                    console.log(response)
                    if(response.data.success){
                      if(response.data.application.application_status=="CHECKEDIN"){
                        setPromptCheckIn(false)
                      }
                    }
                  })
                })

              }}>
                
                <p class="text-white text-center font-bold">
                  CHECK IN
                </p>
              </button>
            </div>:
            <div></div>
        }
      {
        application.application.application_status=="CHECKEDIN"?
        <div class="flex w-full justify-center p-4 ">
            <ReviewItem application={application}/>
         </div>
         :
         <div></div>
      }
    </div>
  )
}else{
  return(<div></div>)
}
}

export default Home