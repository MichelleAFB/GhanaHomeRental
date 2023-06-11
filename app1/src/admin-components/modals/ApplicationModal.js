import React from 'react'
import {useState,useEffect,useRef} from 'react' 


//components
import ImageForm from './ImageForm'
//outside
import axios from 'axios'
import emailjs from "@emailjs/browser";

//redux
import{connect,useDispatch} from 'react-redux'
import { setApplication,setVisibility } from '../../redux/admin-applications/admin-applications-actions'
import { reload } from '../../redux/admin-applications/admin-applications-actions';

//assets
import IonIcon from '@reacticons/ionicons'


function ApplicationModal({visibility,application,handleNotify}) {

  const dispatch=useDispatch()
  console.log(visibility)
  const[sent,setSent]=useState(false)
  const[isLoading,setIsLoading]=useState(true)
  const[alertCustomerApproval,setAlertCustomerApproval]=useState(false)
  const[denyBooking,setDenyBooking]=useState(false)
  const[reserveAndPromptPay,setReserveAndPromptPay]=useState(false)
  const[approve,setApprove]=useState(false)
  const[conflictingDates,setConflictingDates]=useState()
  const[useconflictingDates,setUseConflictingDates]=useState(true)
  const[isCurrent,setIsCurrent]=useState(true)
  

  const approveForm=useRef()
  const denyForm=useRef()

  useEffect(()=>{
    if(visibility){
      //getCurrent(application)
      console.log(application.application.application._id +" "+getCurrent(application))
      setIsLoading(false)
    }
  },[visibility])


  function getCurrent(application){
    console.log(application.application.application)
    const cDate=new Date()
    console.log(cDate)
    var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
    "Aug","Sep","Oct","Nov","Dec"];
    var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
    console.log(application)
   var st=application.application.application.stay_start_date.split(" ")
    var et=application.application.application.stay_end_date.split(" ")
   
   const booked_dates=[] 
   
    const startDate=new Date(st[3],monthnum[months.indexOf(st[1])-1],st[2])
    const endDate=new Date(et[3],monthnum[months.indexOf(et[1])-1],et[2])
    var nextDate=new Date(startDate);
    console.log("current:"+(startDate>=cDate))
    console.log(startDate>=cDate)
 
    console.log(cDate)
    console.log(startDate)
    if(startDate>=cDate || startDate.toString().substring(0,15)==cDate.toString().substring(0,15)){ 
      console.log(startDate>=cDate)
      return true
    }else{
      return false
    }
  }

  const sendEmail = async(form) => {
   
    console.log("testing emailjs functionality");
    console.log(form.current);
    
    const response= await emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        form.current,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result.text);
          return result.text
        },
        (error) => {
          console.log(error.text);
          return error.text
        }
      );
      return response
  };
 
  

  if(!isLoading && getCurrent(application) ){ 
    //console.log(application.application)
   // getCurrent(application)

  
     
      
  return (
    <div class='bg-gray-200 z-30' data-testId="modal-public">
     
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
     
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
        <div class=' bg-white  rounded-xl shadow-lg bg-white dark:border-gray-700 mb-5'>
          <div class='p-4 sm:p-7 flex flex-col'>
            <div class="flex justify-end">
                <button onClick={()=>{

                          const prom1=new Promise((resolve1,reject1)=>{
                            if(application.application.application.notify_admin==1){
                            axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
                              if(response.data.success){

                                resolve1()
                              }
                            })
                          }else{
                            resolve1()
                          }
                        })
    
                        prom1.then(()=>{
                          dispatch(reload())
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
                   {application.application.application.application_status=="DROPPED"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.datePaymentDue})</span></p>
                   :<div></div>}
                     {application.application.application.application_status=="CHECKEDOUT"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.datePaymentDue})</span></p>
                   :<div></div>}
              </div>
           <div class="flex flex-col p-3">
            <p class="text-center font-bold">Application Received:<span class="font-normal">{application.application.application.dateReceived}</span></p>
            {
              application.application.application.appication_status="PAYED"?
              <p class="text-center font-bold">Date Paid:<span class="font-normal">{application.application.application.datePaid}</span></p>:
              <p></p>
            }
           
        </div>
            
            <div class='text-center'>
      {
        application.application.application.notify_admin_message==null || application.application.application.notify_admin_message==" " ?
        <div></div>:
        <div class="flex flex-col mt-2 w-full p-2 border-2 bg-green-400 border-green-400">
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
                approve && application.application.application.application_status!="PAYED" &&
                application.application.application.datePaid!=null?
                <div class="flex p-3 rounded-md border-dashed border-gray-200 border-2">
                <p class="text-center">
                 Customer has paid despite being {application.application.application.application_status}. Please double check the payment is valid. If not, they will be reserved and promped to pay.
                 
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
           
             
               {//TODO: if customer has paid lock in booking,else reserve dates requestsed for 3 days while applicant pays,after 3 days with no pay the hold is released
              application.application.application.application_status!="PAYED" ||
              application.application.application.application_status=="APPROVED"? 
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

              {application.application.application.application_status=="PAYED" || 
              application.application.application.datePaid!=null ?  <button class={approve ?"bg-green-600 p-3 rounded-md m-3":"bg-gray-400 p-3 m-3 rounded-md" } onClick={()=>{
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
                      axios.post("http://localhost:3012/admin-applications/deny-booking/"+application.application.application._id).then((response1)=>{
                        console.log("here")
                        console.log(response1)
                        if(response1.data.success){
                          axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/DENIED",{message:"Your application has been denied"}).then((response2)=>{
                            console.log(response2)
                            if(response2.data.success){
                              
                              sendEmail(denyForm).then((response)=>{
                                console.log(response=='OK')
                                
                                if(response=='OK'){
                                  alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed!")
                                }else{
                                  alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed! Email not set!")
                                }
                              })
                              resolve()
                            }
                          })
                         

                        }
                      })
                    })

                    prom.then(()=>{
                      const prom1=new Promise((resolve1,reject1)=>{
                        if(application.application.application.notify_admin==1){
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
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
                      axios.get("http://localhost:3012/admin-applications/checkAvailability/"+application.application.application._id).then((response)=>{
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
                            axios.post("http://localhost:3012/admin-applications/reserveAndPromptPay/"+application.application.application._id).then((response1)=>{
                              console.log("here")
                              console.log(response1)
                              if(response1.data.success){
                               
                                axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/RESERVED",{message:"Your application has been reserved but not confirmed.Please submit your payment within 5 days to secure your reservation or it will be released"}).then((response2)=>{
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
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
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
                  if(approve){

                    const prom=new Promise((resolve,reject)=>{
                      axios.post("http://localhost:3012/admin-applications/approve-booking/"+application.application.application._id).then((response)=>{
                        console.log("approve response")
                        console.log(response)
                       
                        if(response.data.success==true){
                          if(response.data.approved==true){
                            axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/CONFIRMED",{message:"Your reservation for stay["+application.application.application.stay_start_date+" through "+application.application.application.stay_end_date+"] is confirmed!"}).then((response1)=>{
                              console.log(response1)
                              if(response1.data.success){
                              
                                sendEmail(approveForm).then((response)=>{
                                  if(response=="OK"){
                                    alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed!")
                                  }else{
                                    alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed! Email not set!")
                                  }
                                })
                                //TODO: send email verification
                              }
                            })

                          }else{
                            alert("could not book reservation")
                          }
                        }
                      })
                    })
                    
                    prom.then(()=>{
                      setUseConflictingDates(true) 
                      dispatch(setVisibility(false))
                      setIsLoading(true)
                    })

                  }
                }}>
                    Submit
                </p>
              </button>
              
            </div>
            
           
          </div>
          
          </div>
          {application.application.application.application_status=="PAYED" || application.application.application.datePaid!=null? 
    <form ref={approveForm}  class='mb-10 ' hidden={true}>
          <div class="flex flex-col">
          <input
            type='text'
            name='firstname'
            placeholder='First...'
            className='emailInput'
            value={application.application.application.firstname}
        
          />

          <input
            type='text'
            name='lastname'
            placeholder='Last...'
            className='emailInput'
            value={application.application.application.lastname}
          
          />
          <input
            type='email'
            name='email'
            placeholder='Email...'
            className='emailInput'
            value={application.application.application.email}
          />
          <div className='flex justify-between'>
          </div>
          <input hidden={true} value={`Your reservation for ${application.application.application.stay_start_date} through ${application.application.application.stay_end_date} at GhanaHomeStay is confirmed. We will send instructions on closer to your stay`} name="message"/>
          <div className='signInBar'>
          </div>
          </div>
        </form>:<p></p>}

        {application.application.application.application_status!="DENIED"? 
    <form ref={denyForm}  class='mb-10 ' hidden={true}> 
          <div class="flex flex-col">
          <input
            type='text'
            name='firstname'
            placeholder='First...'
            className='emailInput'
            value={application.application.application.firstname}
          />
          <input
            type='text'
            name='lastname'
            placeholder='Last...'
            className='emailInput'
            value={application.application.application.lastname}
           
          />
          <input
            type='email'
            name='email'
            placeholder='Email...'
            className='emailInput'
            value={application.application.application.email}
          />
          <div className='flex justify-between'>
          </div>
          <input hidden={true} value={`Your reservation for ${application.application.application.stay_start_date} through ${application.application.application.stay_end_date} at GhanaHomeStay  has been denied.`} name="message"/>
          <div className='signInBar'>
          </div>
          </div>
        </form>:<p></p>}
        {
                application.application.occupants.map((o)=>{
                  console.log(o)
                  console.log("hi")
                  return(
                  <div>
                     <p>{o.firstname}</p>
                  </div>)
                })
              }
          
          </main>
      
      </div>
      </div>
  )
}if(!isLoading && getCurrent(application)==false){
  return(
    <div class='bg-gray-200' data-testId="modal-public">
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
     
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
        <div class='opacity-[.75]  rounded-xl shadow-lg bg-white dark:border-gray-700 mb-5'>
          <div class='p-4 sm:p-7 flex flex-col'>
            <div class="flex flex-col justify-end">
              <div class="flex w-full justify-end">
                
                <button onClick={()=>{

                          const prom1=new Promise((resolve1,reject1)=>{
                            if(application.application.application.notify_admin==1){
                            axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
                              console.log(response)
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
                     {application.application.application.application_status=="CONFIRMED"?<p class="text-center text-purple-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.dateApproved})</span></p>
                   :<div></div>}
                    {application.application.application.application_status=="CHECKEDOUT"?
                    <div class="flex flex-col ">
                  
                      <p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.checkoutTime})</span>
                    </p>
                    {
                      application.application.application.notify_admin==1?
                      <div class="bg-purple-300 rounded-md">
                      <p class="m-3 font-bold text-center">
                      {application.application.application.notify_admin_message}
                    </p>
                    </div>:
                    <p></p>
                     }
                    {
                      application.application.application.review!=null?
                      <div class="bg-yellow-400 rounded-md m-2 p-2">
                        <p class="text-center font-bold">Review:</p>
                        <p>{application.application.application.review}</p>
                      </div>
                      :
                      <div>
                      </div>
                    }
                    </div>
                   
                   :<div></div>}
                      {application.application.application.application_status=="APPLIED"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.dateReceived})</span></p>
                   :<div></div>}
                   {application.application.application.application_status=="DROPPED"?<p class="text-center text-blue-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.datePaymentDue})</span></p>
                   :<div></div>}
                    {application.application.application.application_status=="PAYED"?<p class="text-center text-purple-600 font-semibold"><span class="font-bold text-black">Status:</span>{application.application.application.application_status}<span class="text-black"> on ({application.application.application.datePaid})</span></p>
                   :<div></div>}
                   
                    
              </div>
              <div class="flex">
              {
                  application.application.application.application_status=="APPLIED" || application.application.application.application_status=="PAYED"?
                  <div class="flex flex-col">
       <div class="flex">
          <button class={denyBooking ?"bg-red-600 p-3 rounded-md m-3":"bg-gray-400 p-3 m-3 rounded-md" } onClick={()=>{
                setDenyBooking(!denyBooking)
                setAlertCustomerApproval(false)
                setReserveAndPromptPay(false)
                setApprove(false)
              }}>
                <p class="text-white">Deny</p>
              </button>
              <button class={approve ?"bg-green-600 p-3 rounded-md m-3":"bg-gray-400 p-3 m-3 rounded-md" } onClick={()=>{
                setDenyBooking(false)
                setAlertCustomerApproval(false)
                setReserveAndPromptPay(false)
                setApprove(true)
              }}>
                <p class="text-white">Approve</p>
              </button>
              {
                application.application.application.application_status=="APPLIED"?
                <button onClick={()=>{
               
                  setReserveAndPromptPay(!reserveAndPromptPay)
   
                  setApprove(false)
                  setDenyBooking(false)
                  console.log("reserved:"+reserveAndPromptPay)
               
               }} class={reserveAndPromptPay? "bg-green-600 p-3 rounded-md m-3":"bg-gray-400 p-3 rounded-md m-3"}>
               <p class="text-white">Reserve & Prompt Pay</p>
             </button>:
             <div></div>
              }
             </div>
             <button class="bg-purple-700 rounded-md p-3 flex w-full">
                <p class="text-white" onClick={()=>{
                  console.log("here")
                  if(denyBooking){
                    const prom=new Promise((resolve,reject)=>{
                      axios.post("http://localhost:3012/admin-applications/deny-booking/"+application.application.application._id).then((response1)=>{
                        console.log("here")
                        console.log(response1)
                        if(response1.data.success){
                          axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/DENIED",{message:"Your application has been denied"}).then((response2)=>{
                            console.log(response2)
                            if(response2.data.success){
                              
                              sendEmail(denyForm).then((response)=>{
                                console.log(response=='OK')
                                
                                if(response=='OK'){
                                  alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed!")
                                }else{
                                  alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed! Email not set!")
                                }
                              })
                              resolve()
                            }
                          })
                         

                        }
                      })
                    })

                    prom.then(()=>{
                      const prom1=new Promise((resolve1,reject1)=>{
                        if(application.application.application.notify_admin==1){
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
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
                      axios.get("http://localhost:3012/admin-applications/checkAvailability/"+application.application.application._id).then((response)=>{
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
                            axios.post("http://localhost:3012/admin-applications/reserveAndPromptPay/"+application.application.application._id).then((response1)=>{
                              console.log("here")
                              console.log(response1)
                              if(response1.data.success){
                               
                                axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/RESERVED",{message:"Your application has been reserved but not confirmed.Please submit your payment within 5 days to secure your reservation or it will be released"}).then((response2)=>{
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
                        axios.post("http://localhost:3012/admin-applications/turnOffAdminNotify/"+application.application.application._id).then((response)=>{
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
                  console.log("here")
                  if(approve){

                    const prom=new Promise((resolve,reject)=>{
                      console.log("here")
                      axios.post("http://localhost:3012/admin-applications/approve-booking/"+application.application.application._id).then((response)=>{
                        console.log("approve response")
                        console.log(response)
                        console.log(response.data.hasOwnProperty('no_booked'))
                        if(response.data.success==true){
                          if(response.data.approved==true){
                            axios.post("http://localhost:3012/admin-applications/setStatus/"+application.application.application._id+"/CONFIRMED",{message:"Your reservation for stay["+application.application.application.stay_start_date+" through "+application.application.application.stay_end_date+"] is confirmed!"}).then((response1)=>{
                              console.log(response1)
                              if(response1.data.success){
                              
                                sendEmail(approveForm).then((response)=>{
                                  if(response=="OK"){
                                    alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed!")
                                    setSent(true)
                                  }else{
                                    alert("SUCCESS: Reservation for application "+application.application.application._id+" is confirmed! Email not set!")
                                  }
                                })
                                //TODO: send email verification
                              }
                            })

                          }else{
                            alert("could not book reservation")
                          }
                        }
                      })
                    })
                    
                    prom.then(()=>{
                      setUseConflictingDates(true) 
                      dispatch(setVisibility(false))
                      setIsLoading(true)
                    })

                  }
                }}>
                    Submit
                </p>
              </button> 
         
                  </div>:
                  <div>

                  </div>
                }
              
                
              </div>
            </div>
            </div>
            </div>
          </main>
        </div>
    </div>
  )

}
if(application==null){
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