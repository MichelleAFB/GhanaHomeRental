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

  

  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
        axios.get("http://localhost:3012/client-applications/application/"+id).then((response)=>{
          console.log(response)
          setApplication(response.data)
          resolve()
        })
    })

    prom.then(()=>{
      setIsLoading(false)
    })

  },[])
  if(!isLoading){
    console.log(application)
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
          setFacialRecognition(false)
          setMaintenanceTab(true)
          setGuestsTab(false)
          setHome(false)
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Maintenance
          </p>
        </button>
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
        <button class="m-2" onClick={()=>{
           setGuestsTab(false)
           setHome(false)
           setMaintenanceTab(false)
           setFacialRecognition(true)
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Identification
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
          maintenanceTab?
          <div class="flex bg-gray-400 rounded-md w-full ">
            <Maintenance application={application}/>
          </div>:
          <div>
          </div>
        }
        {
          facialRecognition?
          <div class="flex flex-col bg-greay-400 rounded-md w-full">
            <FacialRecognition/>
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