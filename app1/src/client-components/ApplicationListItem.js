import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
//assets
import { Avatar } from '@material-ui/core'
import IonIcon from '@reacticons/ionicons'

//redux
import { setTotalNewApplications,decrementTotalNewApplications } from '../redux/admin-applications/admin-applications-actions'
import {connect,useDispatch} from 'react-redux'
//components
import ApplicationListItemOccupant from './ApplicationListItemOccupant'
import axios from 'axios'
function ApplicationListItem({application}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[seeMore,setSeeMore]=useState(false)
  const[turnOffNotify,setTurnOffNotify]=useState(true)
  const[daysRemainingToPay,setDaysRemainingToPay]=useState()
  const[isLoading,setIsLoading]=useState(true)

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      if(application.application.application_status=="RESERVED"){

        axios.get("http://localhost:3012/payment/checkPaymentDue/"+application.application.id).then((response)=>{
          setDaysRemainingToPay(response.data.days)
        })
      }
      resolve()
      
    })

    prom.then(()=>{
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
console.log("notify:"+application.application.notify_applicant)
  return (
    <div class="max-h-sm rounded-md ">
        <div class={application.application.notify_applicant==1?"py-5 m-4  bg-green-300 border-green-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col":"py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col"} onMouseOver={()=>{
          if(turnOffNotify){
            axios.post("http://localhost:3012/client-applications/turnOffNotifyApplicant/"+application.application.id).then((response)=>{
              console.log(response)
              setTurnOffNotify(false)
            })

          }
         
        }}>

          <div  class="flex flex-col items-center">
            <div class="flex  rounded-md p-3 mb-2">
            <div>
            <p class="text-center text-2xl">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
            </div>
          
            </div>
            {
              application.application.application_status=="PAYED"?
              <div class="flex m-2">
                <p class="font-bold">
                  Status:<span class="text-green-600"> {application.application.application_status} </span>
                </p>
              </div>:<div></div>
            }
            <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
              setSeeMore(!seeMore)
            }}>
              See More
            </button>
            {
              seeMore?
              <div class="flex flex-col border-2 border-dashed rounded-md w-full m-2 border-gray-700 p-3">
                <p class="font-bold text-center">date recieved:<span class="font-normal ml-1">{application.application.dateReceived.substring(0,10)}</span></p>
                {
                  application.application.application_status=="RESERVED"?
                  <div class="flex flex-col">
                    <p class="text-center font-bold"><IonIcon name="hourglass-outline" size="medium" color="bg-white"/> {application.application.application_status}</p>
                    <div class="flex flex-col ">
                      <p class="text-center bg-yellow-100 m-3">
                        <span class="font-bold">Payment Deadline:</span>{application.application.datePaymentDue} 
                      </p>
                      <p class="p-3 text-center font-bold">
                        Your booking has been coditionally reserved for the next 5 days.If Payment is not recieved for your balance your reservation is dropped
                      </p>
                      <button class="bg-purple-500 rounded-md p-3" onClick={()=>{
                        navigate("/payment/"+application.application.id)
                      }}>

                        <p class="text-white">Proceed to payment</p>
                      </button>

                      </div>
                  </div>:
                  <p></p>
                }
                </div>:<div></div>
            }
           
            {application.application.application_status=="APPLIED"? <button class="rounded-lg bg-green-600 p-3 m-2" onClick={()=>{
              navigate("/payment/"+application.application.id)
              }}><p class="text-center font-bold text-white">Proceed to payment</p></button>
            :<div></div>}
             {application.application.application_status=="DENIED"? <button class="rounded-lg  p-3 m-2" ><p class="text-red-600 text-center font-bold "><span class="font-bold text-black">Status:</span>Denied</p></button>
            :<div></div>}
             {application.application.application_status=="RESERVED"? <button class="rounded-lg  p-3 m-2" ><p class="text-reserved-600 text-center font-bold "><span class="font-bold text-black">Status:</span>{application.application.application_status}</p></button>
            :<div></div>}
             
           
           
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
                       
                            <ApplicationListItemOccupant occupant={o}/>
                      
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
                       
                            <ApplicationListItemOccupant occupant={o}/>
                      
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
      </div>
  )
              }
}

export default ApplicationListItem
/*
 {application.occupants.map((m)=>{
                  if(m.child==1){
                 
                  return(
                  <ApplicationListItemOccupant occupant={m}/>
                )
                  }

               })
                
                }
                ********************************
*/

/**
 * 
 *    {application.application.no_children==1 ?
            <div> 
             
              <div class="flex ">
              <div class="bg-gray-200 rounded-md shadow-xl">
                    <p class=" text-center mt-3 font-bold">Children</p>
             
                </div>
                  
                  <div>
                  </div>
                </div>
              </div>:<div></div>
              }
 */

              /*
                   {
                  application.occupants.map((o)=>{
                    if(o.child==0){
                      return(
                       
                            <ApplicationListItemOccupant occupant={o}/>
                      
                      )
                    }
                  })
                }
              */