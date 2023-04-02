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
function ApplicationListItem({application}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[seeMore,setSeeMore]=useState(false)

  
console.log(application.application)
  return (
    <div class="max-h-sm rounded-md ">
        <div class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col">

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
                  application.application.approved==0?
                  <p class="text-center font-bold"><IonIcon name="hourglass-outline" size="medium" color="bg-white"/> Awaiting Approval</p>:
                  <p></p>
                }
                </div>:<div></div>
            }
           
            {application.application.application_status=="APPLIED"? <button class="rounded-lg bg-green-600 p-3 m-2" onClick={()=>{
              navigate("/payment/"+application.application.id)
              }}><p class="text-center font-bold text-white">Proceed to payment</p></button>
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