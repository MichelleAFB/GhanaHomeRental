import React from 'react'
import {useEffect,useState} from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function PayAndSubmit() {
  const [application,setApplication]=useState()
  const[checkoutLink,setCheckoutLink]=useState()
  const[checkoutLinkRecieved, setCheckoutLinkRecieved]=useState(false)
  const[getLink,setGetLink]=useState()
  const[isLoading,setIsLoading]=useState(true)

  const navigate=useNavigate() 
   const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_KEY) 


  useEffect(()=>{

    const prom =new Promise((resolve,reject)=>{
      const application=JSON.parse(sessionStorage.getItem("application"))
      console.log(application)
      setApplication(application)
      
      if(sessionStorage.getItem("application_payment_"+application._id)==null){
        console.log("NOTTT")
        axios.get("https://ghanahomestayserver.onrender.com/client-applications/allBookingDatesForApplication/"+application._id).then((response1)=>{
          console.log(response1)

        console.log(response1)
        setTimeout(()=>{
          const days=JSON.parse(sessionStorage.getItem("application_payment_"+application._id))
          console.log(days)
          getCheckoutLink(days.no_days).then((url)=>{
            console.log("here")
            console.log(url)
          })
        },500)
      })
    
      
      }else{
       
        const days=JSON.parse(sessionStorage.getItem("application_payment_"+application._id))
        console.log(days)
        axios.post("https://ghanahomestayserver.onrender.com/payment/checkout/"+application._id,{fees:[{id:"price_1NIzbHLxMJskpKlALXQTXB3r",quantity:days.no_days},{id:"price_1NIzQLLxMJskpKlASXRbZZJc",quantity:1}]}).then((response)=>{
          console.log(response)
      })
        
       
      }
    })

    prom.then(()=>{
      const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application._id))
      

    })
  },[])





   
  async function getCheckoutLink(q){
   console.log("GETTING LINK")
    axios.post("https://ghanahomestayserver.onrender.com/payment/checkout/"+application._id,{fees:[{id:process.env.REACT_APP_SAMPLE_NIGHTS,quantity:q},{id:process.env.REACT_APP_SAMPLE_CLEANING,quantity:1}]}).then((response)=>{
      console.log(response)
        sessionStorage.setItem("checkoutLink_"+application._id,response.data.url)
      
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
  
  const link=JSON.parse(sessionStorage.getItem("checkoutLink_"+application._id))
  console.log(link)
  return (
    <div class="flex w-full">
      <a href={link}>{link}</a>
    </div>
  )
}else{
  return(<div>

  </div>)
}
}

export default PayAndSubmit