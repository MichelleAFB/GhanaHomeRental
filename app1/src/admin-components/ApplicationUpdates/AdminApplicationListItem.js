import React from 'react'

import {useState,useEffect,useRef} from 'react'
import IonIcon from '@reacticons/ionicons';
import { useNavigate } from 'react-router-dom';
//assets
import { Avatar } from "@material-ui/core";

//components
import AdminApplicantOccupant from './AdminApplicantOccupant';

//outside
import axios from 'axios';
import emailjs from "@emailjs/browser";

//redux
import {useDispatch} from 'react-redux'
import { decrementTotalNewApplications } from '../../redux/admin-applications/admin-applications-actions';
import { setApplicationModalVisibility,setApplication,setVisibility } from '../../redux/admin-applications/admin-applications-actions';
function AdminApplicationListItem({application}) {

  const [isLoading,setIsLoading]=useState(true)
  const[noChildren,setNoChildren]=useState()
  const[noAdults,setNoAdults]=useState()
  const[seeMore,setSeeMore]=useState(false)
  const[show,setShow]=useState(true)

  //email forms
  const[formData,setFormData]=useState()
  const approveForm=useRef()
  const denyForm=useRef()

  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      
        resolve()
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[])




 


  if(show){
    console.log(application.application.datePaid==null)
    console.log(application.application)
   
  return (
    <div class="max-h-sm rounded-md ">
      {application.application.notify_admin==1 && application.application.currentlyOccupied==0 ?
      <div class="py-5 m-4  bg-green-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col">
   
      <div  class="flex flex-col items-center">
          
      <div class="flex  rounded-md p-3 mb-2">
      <div class="flex ">
      <p class="text-center text-2xl">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
      </div>
      
        </div>
        {
          application.application.application_status=="PAYED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="bag-check-outline" size="medium"/> </span>
            </p>
          </div>:<div></div>
        }
        {
          application.application.application_status=="APPLIED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-gray-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
          {
          application.application.application_status=="RESERVED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
          {
          application.application.application_status=="RESERVED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
        <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
          setSeeMore(!seeMore)
        }}>
          See More
        </button>
        <button class="bg-green-400 p-3 rounded-md m-2" onClick={()=>{
          
          const prom=new Promise((resolve,reject)=>{
          
           dispatch(setApplication(application))
            
            resolve()
          })

          prom.then(()=>{
            console.log("here")
            dispatch(setVisibility(true))
            
          })
        }}>
          <p class="text-white">
            Edit
          </p>
        </button>
       
       
      
        <div class="bg-gray-200 p-3 rounded-md ">
        <table class="">
           <th class="border-r-2 border-b-2  border-gray-600"><p class="text-center font-bold text-lg">Adults</p></th>
           <th class="border-b-2 border-gray-600"><p class="text-center font-bold text-lg">Children</p></th>
          <tr class="mt-2">
          <tr> 
            <td class="border-r-2  border-gray-600">
             {
               application.occupants.map((o)=>{
                if(o.child==0){
                  return(
                   
                        <AdminApplicantOccupant occupant={o}/>
                  
                  )
                }
              })
            }
            </td>
        </tr>
            <td>{
              application.occupants.map((o)=>{
                if(o.child==1){
                  return(
                   
                        <AdminApplicantOccupant occupant={o}/>
                  
                  )
                }
              })
            }
            </td>
            </tr>
          </table>
           
          </div>
     
      </div>
      
    </div>
:<div class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col">
   
  <div  class="flex flex-col items-center">
      
  <div class="flex  rounded-md p-3 mb-2">
  <div class="flex ">
  <p class="text-center text-2xl">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
  </div>
   
   
    
  
    </div>
    {
      application.application.application_status=="PAYED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="bag-check-outline" size="medium"/> </span>
        </p>
      </div>:<div></div>
    }
    {
      application.application.application_status=="APPLIED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
     {
      application.application.application_status=="DROPPED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-orange-600"> {application.application.application_status}
          <IonIcon name="arrow-down-outline" size="medium"/></span>
        </p>
        
      </div>:<div></div>
    }
    {
      application.application.application_status=="DENIED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-red-700"> {application.application.application_status}<IonIcon name="close-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
     {
      application.application.application_status=="RESERVED"?
      <div class="flex m-2 align-center">
        <p class="font-bold">
          Status:<span class="text-blue-700"> {application.application.application_status}
          <IonIcon name="ellipsis-horizontal-outline" size="medium" class="mt-1"/></span>
        </p>
  
       
      </div>:<div></div>
    }
      {
      application.application.application_status=="CONFIRMED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-700"> {application.application.application_status}<IonIcon name="checkmark-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
      {
          application.application.application_status=="CHECKEDOUT"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
    <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
      setSeeMore(!seeMore)
    }}>
      See More
    </button>
    <button class="bg-green-400 p-3 rounded-md m-2" onClick={()=>{
      
      const prom=new Promise((resolve,reject)=>{
      
       dispatch(setApplication(application))
        
        resolve()
      })

      prom.then(()=>{
        console.log("here")
        dispatch(setVisibility(true))
        
      })
    }}>
      <p class="text-white">
        Edit
      </p>
    </button>
   

   
   
  
    <div class="bg-gray-200 p-3 rounded-md ">
    <table class="">
       <th class="border-r-2 border-b-2  border-gray-600"><p class="text-center font-bold text-lg">Adults</p></th>
       <th class="border-b-2 border-gray-600"><p class="text-center font-bold text-lg">Children</p></th>
      <tr class="mt-2">
      <tr> 
        <td class="border-r-2  border-gray-600">
         {
           application.occupants.map((o)=>{
            if(o.child==0){
              return(
               
                    <AdminApplicantOccupant occupant={o}/>
              
              )
            }
          })
        }
        </td>
    </tr>
        <td>{
          application.occupants.map((o)=>{
            if(o.child==1){
              return(
               
                    <AdminApplicantOccupant occupant={o}/>
              
              )
            }
          })
        }
        </td>
        </tr>
      </table>
       
      </div>
 
  </div>
  
</div>
 }
    </div>
  )
   }
   
   if( application.application.notify_admin==0){
    return(
      <div class="max-h-sm rounded-md ">
      {application.application.notify_admin==1 && application.application.currentlyOccupied==0?
      <div class="py-5 m-4   bg-purple-300 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col">
   
      <div  class="flex flex-col items-center">
          
      <div class="flex  rounded-md p-3 mb-2">
      <div class="flex ">
      <p class="text-center text-2xl">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
      </div>
      
        </div>
        {
          application.application.application_status=="PAYED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="bag-check-outline" size="medium"/> </span>
            </p>
          </div>:<div></div>
        }
        {
          application.application.application_status=="APPLIED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-gray-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
          {
          application.application.application_status=="RESERVED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
             {
          application.application.application_status=="CHECKEDOUT"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
          {
          application.application.application_status=="RESERVED"?
          <div class="flex m-2">
            <p class="font-bold">
              Status:<span class="text-blue-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
            </p>
          </div>:<div></div>
        }
        <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
          setSeeMore(!seeMore)
        }}>
          See More
        </button>
        <button class="bg-green-400 p-3 rounded-md m-2" onClick={()=>{
          
          const prom=new Promise((resolve,reject)=>{
          
           dispatch(setApplication(application))
            
            resolve()
          })

          prom.then(()=>{
            console.log("here")
            dispatch(setVisibility(true))
            
          })
        }}>
          <p class="text-white">
            Edit
          </p>
        </button>
       
       
      
        <div class="bg-gray-200 p-3 rounded-md ">
        <table class="">
           <th class="border-r-2 border-b-2  border-gray-600"><p class="text-center font-bold text-lg">Adults</p></th>
           <th class="border-b-2 border-gray-600"><p class="text-center font-bold text-lg">Children</p></th>
          <tr class="mt-2">
          <tr> 
            <td class="border-r-2  border-gray-600">
             {
               application.occupants.map((o)=>{
                if(o.child==0){
                  return(
                   
                        <AdminApplicantOccupant occupant={o}/>
                  
                  )
                }
              })
            }
            </td>
        </tr>
            <td>{
              application.occupants.map((o)=>{
                if(o.child==1){
                  return(
                   
                        <AdminApplicantOccupant occupant={o}/>
                  
                  )
                }
              })
            }
            </td>
            </tr>
          </table>
           
          </div>
     
      </div>
      
    </div>
:<div class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col">
   
  <div  class="flex flex-col items-center">
      
  <div class="flex  rounded-md p-3 mb-2">
  <div class="flex ">
  <p class="text-center text-2xl">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
  </div>
   
   
    
  
    </div>
    {
      application.application.application_status=="PAYED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="bag-check-outline" size="medium"/> </span>
        </p>
      </div>:<div></div>
    }
    {
      application.application.application_status=="APPLIED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-600"> {application.application.application_status}<IonIcon name="eye-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
     {
      application.application.application_status=="DROPPED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-orange-600"> {application.application.application_status}
          <IonIcon name="arrow-down-outline" size="medium"/></span>
        </p>
        
      </div>:<div></div>
    }
    {
      application.application.application_status=="DENIED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-red-700"> {application.application.application_status}<IonIcon name="close-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
     {
      application.application.application_status=="RESERVED"?
      <div class="flex m-2 align-center">
        <p class="font-bold">
          Status:<span class="text-blue-700"> {application.application.application_status}
          <IonIcon name="ellipsis-horizontal-outline" size="medium" class="mt-1"/></span>
        </p>
  
       
      </div>:<div></div>
    }
      {
      application.application.application_status=="CONFIRMED"?
      <div class="flex m-2">
        <p class="font-bold">
          Status:<span class="text-green-700"> {application.application.application_status}<IonIcon name="checkmark-outline" size="medium"/></span>
        </p>
      </div>:<div></div>
    }
    <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
      setSeeMore(!seeMore)
    }}>
      See More
    </button>
    <button class="bg-green-400 p-3 rounded-md m-2" onClick={()=>{
      
      const prom=new Promise((resolve,reject)=>{
      
       dispatch(setApplication(application))
        
        resolve()
      })

      prom.then(()=>{
        console.log("here")
        dispatch(setVisibility(true))
        
      })
    }}>
      <p class="text-white">
        Edit
      </p>
    </button>
   

   
   
  
    <div class="bg-gray-200 p-3 rounded-md ">
    <table class="">
       <th class="border-r-2 border-b-2  border-gray-600"><p class="text-center font-bold text-lg">Adults</p></th>
       <th class="border-b-2 border-gray-600"><p class="text-center font-bold text-lg">Children</p></th>
      <tr class="mt-2">
      <tr> 
        <td class="border-r-2  border-gray-600">
         {
           application.occupants.map((o)=>{
            if(o.child==0){
              return(
               
                    <AdminApplicantOccupant occupant={o}/>
              
              )
            }
          })
        }
        </td>
    </tr>
        <td>{
          application.occupants.map((o)=>{
            if(o.child==1){
              return(
               
                    <AdminApplicantOccupant occupant={o}/>
              
              )
            }
          })
        }
        </td>
        </tr>
      </table>
       
      </div>
 
  </div>
  
</div>
 }
    </div>
    )

    }else{
      return(<div></div>)
    }
  }

  
export default AdminApplicationListItem
