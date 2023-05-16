import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

//components
import Guests from '../client-components/YourStayComponents/Guests'

//outside
import axios from 'axios'
import Maintenance from '../client-components/YourStayComponents/Maintenance'
import RestrictedIndividuals from '../client-components/YourStayComponents/RestrictedIndividuals'
import { useNavigate } from 'react-router-dom'
import Home from '../client-components/YourStayComponents/Home'
import FacialRecognition from '../client-components/YourStayComponents/FacialRecognition'
function YourStay() {

  const[application,setApplication]=useState()
  const[home,setHome]=useState(true)
  const[guestTab,setGuestsTab]=useState(false)
  const[maintenanceTab,setMaintenanceTab]=useState(false)
  const[facialRecognition,setFacialRecognition]=useState(false)
  const[isLoading,setIsLoading]=useState(true)

  const{id}=useParams()
  const navigate=useNavigate()
  const [active,setActive]=useState(false)

  

  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
        axios.get("https://ghanahomerental.herokuapp.com/client-applications/application/"+id).then((response)=>{
          console.log(response)
          setApplication(response.data)
          const app=response.data 
          var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
          "Aug","Sep","Oct","Nov","Dec"];
          var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
          var cDate=new Date()
         
          var index=1
          console.log(cDate)
          var st=app.application.stay_start_date.split(" ")
          var et=app.application.stay_end_date.split(" ") 
         
         
         
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

            if((cDate.toString().substring(0,15)==startDate.toString().substring(0,15) && app.application.checkedIn==0) || (cDate>=startDate && cDate<=endDate)){
              setActive(true)
            }
         setTimeout(()=>{
          resolve()
         },500) 
        })
    })

    prom.then(()=>{

      const prom1=new Promise((resolve1,reject1)=>{

      })

      prom1.then(()=>{

      })

      setIsLoading(false)
    })

  },[])
  if(!isLoading){
    console.log(application)
    console.log(active)
  return (
    <div class="flex">
      <div class="flex flex-col w-1/5 bg-gray-300 p-2 ml-0 mt-0 mb-0">
      <button class="m-2" onClick={()=>{
          navigate("/")
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Go back home
          </p>
        </button>
        <button class="m-2" onClick={()=>{
          setHome(true)
          setMaintenanceTab(false)
          setGuestsTab(false)
          setFacialRecognition(false)
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Home
          </p>
        </button>
        {active ? 
        <button class="m-2" onClick={()=>{
          setFacialRecognition(false)
          setMaintenanceTab(true)
          setGuestsTab(false)
          setHome(false)
        }}>
           <p class="text-gray-600 font-bold hover:text-purple-500">
            Maintenance
          </p>
        </button>
          :
          <p></p>
        }
         
        <button class="m-2" onClick={()=>{
          setFacialRecognition(false)
           setGuestsTab(true)
           setHome(false)
           setMaintenanceTab(false)
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Guests & Restricted 
          </p>
        </button>
    
      </div>
      <div class="flex w-full">
        {
          home?
          <div class="flex bg-gray-400 rounded-md w-full min-h-screen">
            <Home application={application}/>
          </div>:
          <div>
          </div>
        }
           {
          guestTab?
          <div class="flex flex-col bg-gray-400 rounded-md w-full ">
            <Guests application={application}/>
            
          </div>:
          <div>
          </div>
        }
         {
          maintenanceTab && active?
          <div class="flex bg-gray-400 rounded-md w-full ">
            <Maintenance application={application}/>
          </div>:
          <div>
          </div>
        }
        {
          facialRecognition?
          <div class="flex flex-col bg-greay-400 rounded-md w-full">
            <FacialRecognition application={application}/>
          </div>:
          <div></div>
        }
      </div>
     
    </div>
  )
      }else{
        return(<div></div>)
      }
}

export default YourStay