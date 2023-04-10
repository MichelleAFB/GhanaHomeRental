import React from 'react'
import {useState,useEffect} from 'react' 

//outside
import axios from 'axios'

import{connect,useDispatch} from 'react-redux'
import { setApplication,setVisibility } from '../../redux/admin-applications/admin-applications-actions'
import IonIcon from '@reacticons/ionicons'


function ApplicationModal({visibility,application}) {

  const dispatch=useDispatch()
  console.log(visibility)
  const[isLoading,setIsLoading]=useState(true)
  const[alertCustomerApproval,setAlertCustomerApproval]=useState(false)
  const[denyBooking,setDenyBooking]=useState(false)
  const[reserveAndPromptPay,setReserveAndPromptPay]=useState(false)
  const[approve,setApprove]=useState(false)
  const[conflictingDates,setConflictingDates]=useState()
  const[useconflictingDates,setUseConflictingDates]=useState(true)
  useEffect(()=>{
    if(visibility){
      setIsLoading(false)
    }
  },[visibility])


  if(!isLoading ){ 
    console.log(application.application)
      
  return (
    <div class='bg-gray-200' data-testId="modal-public">
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
     
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
        <div class=' bg-white  rounded-xl shadow-lg bg-white dark:border-gray-700 mb-5'>
          <div class='p-4 sm:p-7 flex flex-col'>
            <div class="flex justify-end">
                <button onClick={()=>{

                          const prom1=new Promise((resolve1,reject1)=>{
                            if(application.application.application.notify_admin==1){
                            axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application.id).then((response)=>{
                              if(response.data.success){
                                resolve1()
                              }
                            })
                          }else{
                            resolve1()
                          }
                        })
    
                        prom1.then(()=>{
                          setUseConflictingDates(true) 
                          dispatch(setVisibility(false))
                          setIsLoading(true)
                        })
    
                        
                }}>
                    <IonIcon name="close-outline" size="large"/>
                </button>
            </div>
            <div class="flex flex-col w-full justify-center">
                  <p class="text-center ">{application.application.application.firstname} {application.application.application.lastname}
                  </p>
                  <p class="text-center"><span class="font-bold">Start:</span>{application.application.application.stay_start_date}</p>
                  <p class="text-center"><span class="font-bold">End:</span>{application.application.application.stay_end_date}</p>
                  {application.application.application.application_status=="DENIED"?<p class="text-center text-red-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.dateDenied})</span></p>
                   :<div></div>}
                    {application.application.application.application_status=="RESERVED"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.dateReserved})</span></p>
                   :<div></div>}
                      {application.application.application.application_status=="APPLIED"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.dateReceived})</span></p>
                   :<div></div>}
              </div>
            <div class='text-center'>
      {
        application.application.application.notify_admin_message==null || application.application.application.notify_admin_message==" " ?
        <div></div>:
        <div class="flex flex-col mt-2 w-full p-2 border-2 border-green-900">
          <p class="text-center font-bold">Update</p>
          <p class="text-center">{application.application.application.notify_admin_message}</p>
        </div>}
            
             
            </div>
            <div class="flex flex-col p-3">
              {
                alertCustomerApproval? 
                  <div class="flex p-3 rounded-md border-dashed border-gray-200 border-2">
                    <p class="text-center text-green-700">
                      This will lock in the booking because payment has already be recieved.
                    </p>
                  </div>:<div></div>
              }
              {
                reserveAndPromptPay && !useconflictingDates && application.application.application.application_status!="RESERVED"?
                <div class="flex p-3 rounded-md border-dashed border-gray-200 border-2">
                  <p class="text-center">
                    This will block off the days requested for 3 days while awaiting payment. After 3 days theif payment is not received we will unreserve the days requests
                  </p>
                </div>:<div></div>
              }
                 {
                approve?
                <div class="flex p-3 rounded-md border-dashed border-gray-200 border-2">
                  <p class="text-center">
                   Customer has paid. This will confirm their reservation
                   
                  </p>
                </div>:<div></div>
              }
                    {
                approve && application.application.application.application_status=="DENIED"?
                <div class="flex p-3 rounded-md border-dashed border-gray-200 border-2">
                  <p class="text-center">
                   Upon Approval customer must resubmit payment
                   
                  </p>
                </div>:<div></div>
              }
                {useconflictingDates==true && conflictingDates!=null && application.application.application.application_status!="RESERVED"?
              
                <div class="flex flex-col p-3 rounded-md border-dashed border-gray-200 border-2">
                  <p class="font-bold text-center text-red-600">Conflicting Dates</p>
                  <div class="overflow-y-auto overflow-hidden h-[80px] p-3 w-full">
                  <div class="flex flex-col">
                  {
                    conflictingDates.map((m)=>{
                      return(<p class="text-center">{m.date}</p>)
                    })
                  }
                  
                  </div>
                  </div>
                </div>:<div></div>
              }

            </div>
            <div class="flex">
           
              {//TODO: confirm Reservation
              application.application.application.application_status=="PAYED"? 
                 <button onClick={()=>{
                  setDenyBooking(false)
                 setApprove(!approve)
                 
                
                }} class={approve? "bg-green-300 p-3 rounded-md m-3":"bg-gray-300 p-3 rounded-md m-3"}>
                <p>Confirm</p>
              </button>:<div></div>
              }
               {//TODO: if customer has paid lock in booking,else reserve dates requestsed for 3 days while applicant pays,after 3 days with no pay the hold is released
              application.application.application.application_status=="APPLIED"? 
              <button onClick={()=>{
               
                setReserveAndPromptPay(!reserveAndPromptPay)

                setApprove(false)
                setDenyBooking(false)
                console.log("reserved:"+reserveAndPromptPay)
             
             }} class={reserveAndPromptPay? "bg-green-600 p-3 rounded-md m-3":"bg-gray-400 p-3 rounded-md m-3"}>
             <p class="text-white">Reserve & Prompt Pay</p>
           </button>:<div></div>
           }
              
              {application.application.application.application_status!="DENIED"?
              <button class={denyBooking ?"bg-red-600 p-3 rounded-md m-3":"bg-gray-400 p-3 m-3 rounded-md" } onClick={()=>{
                setDenyBooking(!denyBooking)
                setAlertCustomerApproval(false)
                setReserveAndPromptPay(false)
                setApprove(false)
              }}>
                <p class="text-white">Deny</p>
              </button>:<div></div>

              }

              {application.application.application.application_status=="DENIED"?  <button class={approve ?"bg-green-600 p-3 rounded-md m-3":"bg-gray-400 p-3 m-3 rounded-md" } onClick={()=>{
                setApprove(!approve)
                setDenyBooking(false)
                setAlertCustomerApproval(false)
                setReserveAndPromptPay(false)
              }}>
                <p class="text-white">Approve</p>
              </button>:<div></div>}
             
            </div>
            <div class="flex">
              <button class="bg-purple-700 rounded-md p-3 w-full">
                <p class="text-white" onClick={()=>{

                  if(denyBooking){
                    const prom=new Promise((resolve,reject)=>{
                      axios.post("http://localhost:3012/admin-applications/deny-booking/"+application.application.application.id).then((response1)=>{
                        console.log("here")
                        console.log(response1)
                        if(response1.data.success){
                          axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application.id+"/DENIED",{message:"Your application has been denied"}).then((response2)=>{
                            console.log(response2)
                            if(response2.data.success){
                              alert("SUCCESS: successfully denied")
                              resolve()
                            }
                          })
                         

                        }
                      })
                    })

                    prom.then(()=>{
                      const prom1=new Promise((resolve1,reject1)=>{
                        if(application.application.application.notify_admin==1){
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application.id).then((response)=>{
                          if(response.data.success){
                            resolve1()
                          }
                        })
                      }else{
                        resolve1()
                      }
                    })

                    prom1.then(()=>{
                      setUseConflictingDates(true) 
                      dispatch(setVisibility(false))
                      setIsLoading(true)
                    })

                    })

                  }
                  if(reserveAndPromptPay){
                    const prom=new Promise((resolve,reject)=>{
                      axios.get("http://localhost:3012/admin-applications/checkAvailability/"+application.application.application.id).then((response)=>{
                        console.log(response)
                        if(response.data.success){
                          console.log(response.data.paid==true)
                          var message

                          response.data.conflicting_dates.map((m)=>{
                            message=message+m
                          })
                          console.log(response.data.conflicting_dates.length)
                          if(response.data.conflicting_dates.length==0 ){
                              console.log("here call")
                            axios.post("http://localhost:3012/admin-applications/reserveAndPromptPay/"+application.application.application.id).then((response1)=>{
                              console.log("here")
                              console.log(response1)
                              if(response1.data.success){
                               
                                axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application.id+"/RESERVED",{message:"Your application has been reserved but not confirmed.Please submit your payment within 5 days to secure your reservation or it will be released"}).then((response2)=>{
                                  console.log(response2)
                                  if(response2.data.success){
                                    alert("SUCCESS: successfully reserved")
                                    resolve()
                                  }
                                })
                                
                              }
                            })
                          }else{
                            setConflictingDates(response.data.conflicting_dates)
                            alert("ERROR: cannot set reserved because there are conflicting dates."+message)
                            resolve()
                          }
                        }
                      })
                    })

                    prom.then(()=>{

                      const prom1=new Promise((resolve1,reject1)=>{
                        if(application.application.application.notify_admin==1){
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application.id).then((response)=>{
                          if(response.data.success){
                            resolve1()
                          }
                        })
                      }else{
                        resolve1()
                      }
                    })

                    prom1.then(()=>{
                      setUseConflictingDates(true) 
                      dispatch(setVisibility(false))
                      setIsLoading(true)
                    })
                  })
                     
                    
                    


                  }
                  if(alertCustomerApproval){

                  }
                }}>
                    Submit
                </p>
              </button>
            </div>
          </div>
          </div>
          </main>
      
      </div>
      </div>
  )
}if(application==null){
  return(<p></p>)
}else{
  return(<p></p>)
}
}
const mapStateToProps = (state, props) => {
  var visibility= state.adminApplications.visibility;
  var application=state.adminApplications.application
  console.log("visibility"+visibility)

  return {
   visibility:visibility,
   application:application
  };
};
export default connect(mapStateToProps)(ApplicationModal)