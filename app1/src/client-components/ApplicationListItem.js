import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

//assets
import { Avatar } from '@material-ui/core'
import IonIcon from '@reacticons/ionicons'

//redux
import { setTotalNewApplications,decrementTotalNewApplications } from '../redux/admin-applications/admin-applications-actions'
import {connect,useDispatch} from 'react-redux'
import { setCurrentlyOccupied,setCurrentlyOccupiedApplication } from '../redux/user/user-actions'
import { setReviewModalApplication,setReviewModalVisibility } from '../redux/user/user-actions'
//components
import ApplicationListItemOccupant from './ApplicationListItemOccupant'

//outside
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'
import emailjs from "@emailjs/browser";

function ApplicationListItem({application}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[seeMore,setSeeMore]=useState(false)
  const[turnOffNotify,setTurnOffNotify]=useState(true)
  const[daysRemainingToPay,setDaysRemainingToPay]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[checkoutLink,setCheckoutLink]=useState()
  const[checkoutLinkRecieved, setCheckoutLinkRecieved]=useState(false)
  const[isPassedDue,setIsPassedDue]=useState(false)
  const [promptCheckout,setPromptCheckout]=useState(false)

  const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_KEY) 
 
  

  useEffect(()=>{
    
    if(application.application._id=='64877e4c94305bee55021525'){ 
      console.log("\n\n"+application.application.stay_start_date)
    }

    const prom=new Promise((resolve,reject)=>{
      
     
      axios.get("https://ghanahomestayserver.onrender.com/client-applications/getActiveStatus/"+application.application._id).then((response)=>{
        
       
        if(response.data.success){
            if(response.data.currentlyOccupied==true){
              const prom=new Promise((resolve,reject)=>{
                dispatch(setCurrentlyOccupiedApplication(application))
                resolve()
              })

              prom.then(()=>{
                dispatch(setCurrentlyOccupied(true))
              })
            }else{
              resolve()
            }
        }
      })
      console.log(application.application)
      if(application.application.application_status=="RESERVED" ){

        axios.get("https://ghanahomestayserver.onrender.com/admin-applications/checkPaymentDeadline/"+application.application._id).then((response)=>{
         
      
        
          setIsPassedDue(response.data.passedDue)
          if(response.data.passedDue){
          
            axios.post("https://ghanahomestayserver.onrender.com/client-applications/release-reservation-due-to-unpaid/"+application.application._id).then((response1)=>{
             
              if(response1.data.success){
                axios.post("https://ghanahomestayserver.onrender.com/admin-applications/setStatus/"+application.application._id+"/DROPPED",{message:"Your reservation has been dropped due to non-payment"}).then((response2)=>{
                
                })
              }
            })
          }if(response.data.paid){  //not reserved
              setIsLoading(false)
          }
          else{
            axios.post("https://ghanahomestayserver.onrender.com/client-applications/release-reservation-due-to-unpaid/"+application.application._id).then((response1)=>{
             
         
          
            
            if(response1.data.success){
              axios.post("https://ghanahomestayserver.onrender.com/admin-applications/setStatus/"+application.application._id+"/DROPPED",{message:"Your reservation has been dropped due to non-payment"}).then((response2)=>{
               
              console.log(response2)
              })
            }
          })
          }
          sessionStorage.setItem("checkPayment_"+application.application._id,JSON.stringify(response.data)) 
        })

        if(sessionStorage.getItem("application_payment_"+application.application._id)==null){
          console.log(application.application.stay_start_date+" can get days ")
         
          
        }if(sessionStorage.getItem("application_payment_"+application.application._id)!=null && getLink==true){
          
          const days=JSON.parse(sessionStorage.getItem("application_payment_"+application.application._id))
          console.log(days.no_days + " "+application.application._id)
          getCheckoutLink(days.no_days)
          setGetLink(false)
    
        }
      }if(application.application.application_status=="APPLIED"){
        console.log("getting days")
        checkout()
        setTimeout(()=>{
          const days=JSON.parse(sessionStorage.getItem("application_payment_"+application.application._id))
          console.log(days)
          console.log("now getting link")
          getCheckoutLink(days.no_days).then((url)=>{
            setCheckoutLink(url)
            setTimeout(()=>{
              resolve()
            },800)
          })
        })
      }
      else{
        resolve()
      }
      
      setTimeout(()=>{
        resolve()
      },1000)
     
      
    })

    prom.then(()=>{
      
     const prom1=new Promise((resolve1,reject1)=>{
      if(application.application.application_status=="RESERVED"  ){
        const days=JSON.parse(sessionStorage.getItem("application_payment_"+application.application._id))
       
       
        getCheckoutLink(days.no_days).then(()=>{
          console.log(days)
          
          resolve1()
        })

      }else{
        resolve1()
      }
       
     })

     prom1.then(()=>{
      setIsLoading(false)
     })
      
    })
  },[])
  
 /**id:process.env.REACT_APP_SAMPLE_NIGHTS,quantity:q},{id:process.env.REACT_APP_SAMPLE_CLEANING */
  async function getCheckoutLink(q){
   
    await axios.post("https://ghanahomestayserver.onrender.com/payment/checkout/"+application.application._id,{fees:[{id:process.env.REACT_APP_SAMPLE_NIGHTS,quantity:q},{id:process.env.REACT_APP_SAMPLE_CLEANING,quantity:1}]}).then((response)=>{
      console.log(response)
        sessionStorage.setItem("checkoutLink_"+application.application._id,response.data.url)
        console.log(response.data.url)
        setCheckoutLinkRecieved(true)
        setCheckoutLink(response.data.url)
        
        return response.data.url
      })
  }

  async function checkout(){
    console.log("CHECKOUTTT")
    
    await axios.get("https://ghanahomestayserver.onrender.com/client-applications/allBookingDatesForApplication/"+application.application._id).then((response1)=>{
    console.log(application.application)
    console.log(response1.data.booked_dates)
    
      sessionStorage.setItem("application_payment_"+application.application._id,JSON.stringify({no_days:response1.data.no_days}))
     
      return getCheckoutLink(response1.data.days)
    }) 
 }
 const[getLink,setGetLink]=useState(true)
  if(!isLoading){
   const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application.application._id))
    if(checkoutLink==null){
    checkout().then((response)=>{
      console.log(response)
      if(sessionStorage.getItem("application_payment_"+application.application._id)==null){
     
        
      }if(sessionStorage.getItem("application_payment_"+application.application._id)!=null && getLink==true){
        console.log("run checkout")
        const days=JSON.parse(sessionStorage.getItem("application_payment_"+application.application._id))
        setGetLink(false)
        getCheckoutLink(days.no_days).then(()=>{
          const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application.application._id))
          console.log(link)
        })
  
      }
    })
  }
    

   

  return (
    <div class="max-h-sm rounded-md ">
        <div class={application.application.notify_applicant==1?"py-5 m-4  bg-green-300 border-green-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col":"py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg flex flex-col"} onMouseOver={()=>{
          if(turnOffNotify){
            axios.post("https://ghanahomestayserver.onrender.com/client-applications/turnOffNotifyApplicant/"+application.application._id).then((response)=>{
             sessionStorage.removeItem("images")
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
              application.application.application_status=="DROPPED"?
              <div class="flex m-2">
                <p class="font-bold">
                  Status:<span class="text-orange-600"> {application.application.application_status} 
                  <IonIcon name="arrow-down-outline" size="medium"/>
                  </span>
                </p>
              </div>:<div></div>
            }
            {
              application.application.application_status=="PAYED"?
              <div class="flex m-2">
                <p class="font-bold">
                  Status:<span class="text-green-600"> {application.application.application_status}
                  <IonIcon name="checkmark-outline" size="medium"/>
                   </span>
                </p>
              </div>:<div></div>
            }
                {
              application.application.application_status=="APPLIED"?
              <div class="flex m-2">
                <p class="font-bold">
                  Status:<span class="text-gray-700"> {application.application.application_status}
                  <IonIcon name="eye-outline" size="medium"/>
                   </span>
                </p>
              </div>:<div></div>
            }
                  {
              application.application.application_status=="CONFIRMED"?
              <div class="flex m-2">
                <p class="font-bold">
                  Status:<span class="text-green-700"> {application.application.application_status} 
                  <IonIcon name="checkmark-outline" size="medium"/>
                  </span>
                </p>
              </div>:<div></div>
            }
              {
              application.application.application_status=="DENIED"? <button class="rounded-lg  p-3 m-2" ><p class="text-red-600 text-center font-bold "><span class="font-bold text-black">Status:</span>Denied
              <IonIcon name="close-outline" size="medium"/></p></button>
            :<div></div>}
               {
               application.application.application_status=="CHECKEDOUT"? <button class="rounded-lg  p-3 m-2" ><p class="text-purple-600 text-center font-bold "><span class="font-bold text-black">Status:</span>{application.application.application_status}
              <IonIcon name="airplane-outline" size="medium" class="ml-2"/></p></button>
            :<div></div>
            }
                   {
               application.application.application_status=="CHECKEDIN"? <button class="rounded-lg  p-3 m-2" ><p class="text-yellow-700 text-center font-bold "><span class="font-bold text-black">Status:</span>{application.application.application_status}
              <IonIcon name="cafe-outline" size="medium" class="ml-2"/></p></button>
            :<div></div>
            }
             {application.application.application_status=="RESERVED"? <button class="rounded-lg  p-3 m-2" ><p class="text-reserved-600 text-center font-bold text-blue-600"><span class="font-bold text-black">Status:</span>{application.application.application_status}
             <IonIcon name="ellipsis-horizontal-outline" size="medium" class="mt-1"/>
             </p>
             <div class="flex flex-col p-3">
              {
                application.application.notify_applicant==1?
                <p>
                  {application.application.notify_applicant_message}
                </p>:<p></p>
              }

             </div>
             </button>
            :<div></div>
            }
            {
              application.application.application_status=="CHECKEDOUT" && (application.application.review=="" || application.application.review=='')?
              <div class="flex w-full justify-center">
                <button class="bg-purple-500 p-3 rounded-sm flex " onClick={()=>{
                  const prom=new Promise((resolve,reject)=>{
                    dispatch(setReviewModalApplication(application))
                    resolve()
                  })

                  prom.then(()=>{
                    dispatch(setReviewModalVisibility(true))
                  })
                }}>
                  <p class="text-white">Review</p>
                </button>
              </div>:
              <div>
               </div> 
            }
            {
            application.application.application_status=="DROPPED"&& application.application.notify_applicant==1? 
                <div class="flex rounded-lg bg-green-600 p-3 m-2">    
                  {
                          !getLink ?
                          <div class="flex flex-col">
              
                            <p class="text-center">
                              {application.application.notify_applicant_message}
                            </p>
                           
                            </div>:<a></a>
                }
                </div>
            :<div></div>}
                 {application.application.application_status=="DENIED"&& application.application.notify_applicant==1? 
                <div class="flex rounded-lg p-3 m-2">    
                  {
                          !getLink ?
                          <div class="flex flex-col">
              
                            <p class="text-center bg-yellow-300">
                              {application.application.notify_applicant_message}
                            </p>
                           
                            </div>:<a></a>
                }
                </div>
            :<div></div>}
            <button class="font-bold border-b-2 border-gray-600 m-3" onClick={()=>{
              setSeeMore(!seeMore)
            }}>
              See More
            </button>
            {
              seeMore?
              <div class="flex flex-col border-2 border-dashed rounded-md w-full m-2 border-gray-700 p-3">
               
                  <p class="text-center font-bold text-xl m-2">{application.application.notify_applicant_message}</p>
                
                <p class="font-bold text-center">Recieved:<span class="font-normal ml-1">{application.application.dateReceived}</span></p>

                {
                  application.application.application_status=="DENIED"?
                  <div class="flex-col">
                  <p class="text-center font-bold">Denied:<span class="font-normal">{application.application.dateDenied}</span></p>
                  <p class="text-center font-bold">Past Due:<span class="font-normal">{application.application.datePaymentDue}</span></p>
                  </div>
                  :
                  <div></div>
                }
              
                {
                  application.application.application_status=="RESERVED"?
                  <div class="flex flex-col">
                    <p class="text-center font-bold"><IonIcon name="hourglass-outline" size="medium" color="bg-white"/> {application.application.application_status}</p>
                    <div class="flex flex-col ">
                      <p class="text-center bg-yellow-100 m-3">
                        <span class="font-bold">Payment Drop Date:</span>{application.application.datePaymentDue} 
                      </p>
                      <p class="p-3 text-center font-bold">
                        Your booking has been coditionally reserved for the next 5 days.If Payment is not recieved for your balance your reservation is dropped
                      </p>
                     
                      {
                          !getLink ?
                          <div class="flex p-3">
                          <button class="p-3 bg-purple-600 rounded-md w-full" >
                            <a class="text-white" href={sessionStorage.getItem('checkoutLink_'+application.application._id)}>Proceed to payment</a>
                            </button>
                            </div>:<a></a>
                        }

                      </div>
                  </div>:
                  <p></p>
                }
          {application.application.application_status=="DROPPED"? 
                <div class="flex rounded-lg p-3 m-2 justify-center">    
                  {
                          !getLink ?
                          <div class=" justify-center">
              
                            <p class="text-center bg-yellow-100">
                              {application.application.notify_applicant_message} on {application.application.datePaymentDue}
                            </p>
                           
                            </div>:<a></a>
                }
                </div>
            :<div></div>}
        {application.application.application_status=="APPLIED" || application.application.application_status=="DROPPED"   ? 
          <div class="flex rounded-lg bg-green-600 p-3 m-2 justify-center">    
            {
                          !getLink ?
                          <div class="">
              
                            <a class="flex" href={sessionStorage.getItem('checkoutLink_'+application.application._id)}><p class="text-white text-center font-bold">Proceed to payment</p></a>
                           
                            </div>:<a></a>
                }
             </div>
            :<div></div>}
                </div>:<div></div>
            }
          
        
              
           
  
          
             
           
           
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
              }else{
                return(<div></div>)
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