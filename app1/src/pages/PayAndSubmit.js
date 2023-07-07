import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function PayAndSubmit() {
  const [application,setApplication]=useState()
  const[checkoutLink,setCheckoutLink]=useState()
  const[checkoutLinkRecieved, setCheckoutLinkRecieved]=useState(false)
  const[getLink,setGetLink]=useState()
  const[isLoading,setIsLoading]=useState(true)

  const navigate=useNavigate()

  useEffect(()=>{

    const prom =new Promise((resolve,reject)=>{
      const application=JSON.parse(sessionStorage.getItem("application"))
      console.log(application)
      setApplication(application)
      console.log(application.id)
      if(sessionStorage.getItem("application_payment_"+application._id)==null){
        console.log(application.stay_start_date+" can get days ")
        checkout()
        setTimeout(()=>{
          resolve()
        },500)
      
      }if(sessionStorage.getItem("application_payment_"+application._id)!=null && getLink==true){
        
        const days=JSON.parse(sessionStorage.getItem("application_payment_"+application._id))
        console.log(days.no_days + " "+application._id)
        getCheckoutLink(days.no_days)
        setGetLink(false)
        resolve()
      }else{
        resolve()
      }

    })

    prom.then(()=>{
      const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application._id))
      if(sessionStorage.getItem("checkoutLink_"+application._id)!=null){
        
        console.log(link)
          setIsLoading(false)
      }else{
        setIsLoading(false)
      }

    })
  },[])





   
  async function getCheckoutLink(q){
   
    await axios.post("https://ghanahomestayserver.onrender.com/payment/checkout/"+application._id,{fees:[{id:process.env.REACT_APP_SAMPLE_NIGHTS,quantity:q},{id:process.env.REACT_APP_SAMPLE_CLEANING,quantity:1}]}).then((response)=>{
        sessionStorage.setItem("checkoutLink_"+application._id,response.data.url)
        if(application._id=='64877e4c94305bee55021525'){ 
          console.log(application.stay_start_date+" "+application.stay_end_date)
          console.log(application.stay_start_date)
          
        }
        setCheckoutLinkRecieved(true)
        setCheckoutLink(response.data.url)
        
        return response.data.url
      })
  }

  async function checkout(){
    console.log("CHECKOUTTT")
    if(application._id=='64877e4c94305bee55021525'){ 
      console.log(application.stay_start_date+" "+application.stay_end_date)
      console.log(application.stay_start_date)
      
    }
    await axios.get("https://ghanahomestayserver.onrender.com/client-applications/allBookingDatesForApplication/"+application._id).then((response1)=>{
    console.log(application)
    console.log(response1.data.booked_dates)
    
      sessionStorage.setItem("application_payment_"+application._id,JSON.stringify({no_days:response1.data.no_days}))
     
     return getCheckoutLink(response1.data.days)
    }) 
 }
 const[loading,setLoading]=useState(true)
if(!isLoading){
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
  const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application._id))
  return (
    <div class="flex w-full">
      <a href={link}>{link}</a>
    </div>
  )
}else{
  return(<div></div>)
}
}

export default PayAndSubmit