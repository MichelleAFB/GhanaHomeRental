import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
//components


//outside
import axios from 'axios'

//components
import Maintenance from '../admin-components/AdminYourStayComponents/Maintenance'
import RestrictedIndividuals from '../admin-components/AdminYourStayComponents/RestrictedIndividuals'
import Guests from '../admin-components/AdminYourStayComponents/Guests'
import Home from '../admin-components/AdminYourStayComponents/Home'

function AdminYourStay() {

  const[application,setApplication]=useState()
  const[home,setHome]=useState(true)
  const[guestTab,setGuestsTab]=useState(false)
  const[maintenanceTab,setMaintenanceTab]=useState(false)

  const[isLoading,setIsLoading]=useState(true)

  const{id}=useParams()
  const navigate=useNavigate()

  

  useEffect(()=>{
    var apps
    const prom=new Promise((resolve,reject)=>{
        axios.get("https://ghanahomerental.herokuapp.com/client-applications/application/"+id).then((response)=>{
          console.log(response)
          apps=response.data
          
          
          
        }).then(()=>{
          resolve()
        })
    })

    prom.then(()=>{
     
      const prom1=new Promise((resolve1,reject1)=>{
        setApplication(apps)
        resolve1()
      })

      prom1.then(()=>{
        setIsLoading(false)
      })
      
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
          setMaintenanceTab(true)
          setGuestsTab(false)
          setHome(false)
        }}>
          <p class="text-gray-600 font-bold hover:text-purple-500">
            Maintenance
          </p>
        </button>
        <button class="m-2" onClick={()=>{
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
          maintenanceTab?
          <div class="flex bg-gray-400 rounded-md w-full ">
            <Maintenance application={application}/>
          </div>:
          <div>
          </div>
        }
      </div>
     
    </div>
  )
      }else{
        return(<div></div>)
      }
}

export default AdminYourStay