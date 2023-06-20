import React from 'react'
import { useState,useEffect } from 'react';

//outside
import axios from 'axios';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';
function Home({application}) {

 const[over,setOver]=useState(false)
 const[warnOver,setWarnOver]=useState(false)
 const[isLoading,setIsLoading]=useState(true)
 const[review,setReview]=useState()
 const[files,setFiles]=useState()
  const[maintenanceIssues,setMaintenanceIssues]=useState()

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
      console.log(cDate)
      if(cDate.toString().substring(0,15)==warnDate.toString().substring(0,15) ){
        setWarnOver(true)
      }
      if(cDate.toString().substring(0,15)==endDate.toString().substring(0,15) || warnDate<cDate){
        setOver(true)
         }
         resolve()

    })

    prom.then(()=>{

      const prom1=new Promise((resolve1,reject1)=>{

        axios.get("https://ghanahomestayserver.onrender.com/admin-current-resident/maintenance-issues/"+application.application._id).then((response1)=>{
          console.log(response1)
          if(response1.data.success){
            if(response1.data.no_issues>0){
              setMaintenanceIssues(response1.issues)
            }
            resolve1()
          }

        })
      })

      prom1.then(()=>{
        setIsLoading(false)
      })
     

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

if(!isLoading){
  console.log(files)
  return (
    <div class="flex-col w-full min-h-screen">
      <div class="flex-col w-full p-3 bg-yellow-400 rounded-md m-2">
        
          <p class="text-center text-bold  font-bold text-4xl mt-4">Stay</p>
          <p class="text-center font-semibold mt-2">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
        {
          application.occupants.length>0?
          <div class="flex flex-col w-full flex p-3 rounded-md bg-gray-300 m-3">
             <p class="font-bold underline">
              Occupants
            </p>
            {application.occupants.map((p)=>{ 
              return(<p>{p.firstname} {p.lastname}</p>)
            })}
          </div>
          :
          <div class="flex flex-col w-full flex p-3 rounded-md bg-gray-300 m-3"></div>
        }
        {
          maintenanceIssues!=null?
          <div class="flex flex-col w-full flex p-3 rounded-md bg-gray-300 m03">
            <p class="font-bold underline">
              Maintenance
            </p>
            <p class="">
              <p class="font-semibold">Issues:<span class="font-normal">{maintenanceIssues.length}</span></p>
            </p>
          </div>
          :
          <div class="flex flex-col w-full flex p-3 rounded-md bg-gray-300 m-3">
          <p class="font-bold underline">
            Maintenance
          </p>
          <p class="">
            <p class="font-semibold">Issues:<span class="font-normal">No maintenence issues</span></p>
          </p>
        </div>
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
            <button class="bg-gray-300 rounded-md  flex flex-col w-full p-3 m-2" onClick={()=>{
              const currDate=new Date()
              axios.post("https://ghanahomestayserver.onrender.com/current-resident/checkout/"+application.application._id,{checkoutTime:currDate}).then((response)=>{
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
    </div>
  )
}else{
  return(<div></div>)
}
}

export default Home