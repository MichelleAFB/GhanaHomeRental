import React from 'react'
import {useState,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
//outside
import {CardElement} from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

function PaymentPage() {
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  const stripePromise=loadStripe("pk_live_51MrXkxLxMJskpKlAg04tvIwsH0onrRPJH2fgU2qzrHvaWKRFjqL76UW2lwKI4SGx0Y68ICWsm9Wts6oHWjHBPi1D00JG5bQ97t") 

  const[isLoading,setIsLoading]=useState(true)
  const [application,setApplication]=useState()
  const[noDays,setNoDays]=useState()

  const {id}=useParams()
console.log(id)
  useEffect(()=>{
    var days
    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/client-applications/application/"+id).then((response)=>{
        console.log(response)
        setApplication(response.data)

        axios.get("http://localhost:3012/client-applications/getNoDays/"+id).then((response1)=>{
          console.log(response1.data)
          setNoDays(response1.data.days)
          days=response1.data.days
        })
        setTimeout(()=>{
          resolve()
        },500)
      })
    })

    prom.then(()=>{

      const prom2=new Promise((resolve,reject)=>{
        axios.post("http://localhost:3012/payment/checkout/"+id,{fees:[{id:"price_1MrY1oLxMJskpKlAbFZlt9et",quantity:days},{id:"price_1MrY3uLxMJskpKlAfpN870oN",quantity:1}]}).then((response)=>{
      console.log(response)
      setCheckOutLink(response.data.url)
    })
      })
   setIsLoading(false)

      
     
    })
  },[])

  const getDays=async(application)=>{
    console.log("start:"+application.application.stay_start_date)
    console.log("end:"+application.application.stay_end_date)
    const s=application.application.stay_start_date.toString()
    const e=application.application.stay_end_date.toString()
    const start=s.split(" ")
    const end=e.split(" ")
      console.log(end)
      var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
            "Aug","Sep","Oct","Nov","Dec"];
      var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
      const currentDate=new Date()
      const currentYear=currentDate.getFullYear()
     
      const leapYears=[2024,2028,2032,2036,2040,2044,2048,2052]

    if(start[3]==end[3]){
     
      const startMonth=months.indexOf(start[1])
      const endMonth=months.indexOf(end[1])

      const diffMonth=endMonth-startMonth

      var diffDays
      console.log("startMonth:"+startMonth+" end month:"+endMonth)
      //same month
      if(diffMonth==0){
        
        console.log("under a month: no days="+diffDays) 
        if(leapYears.includes(parseInt(end[3]))){
          
        }else{
          diffDays=end[2]-start[2]
          setNoDays(diffDays)
        }
      }
      //different month
      else{
        //diff month
        console.log("diffmonth")
        if(leapYears.includes(parseInt(end[3]))){
          months[1]=months[1]+1
          var startString
          var endString
          const sDays=daysInMonth[months.indexOf(start[1])]
          const eDays=daysInMonth[months.indexOf(end[1])]
          console.log("sday:"+sDays);
          console.log("enddays:"+eDays)
          console.log(parseInt(start[2].substring(0,1)))
          if(parseInt(start[2].substring(0,1))==0){
            startString=parseInt(start[2].substring(1,2))
          }else{
            startString=parseInt(start[2])

          }
          if(parseInt(end[2].substring(0,1))==0){
            endString=parseInt(end[2].substring(1,2))
          }else{
            endString=parseInt(end[2])
          }
          console.log(startString)
          var stDays
          console.log(startString==parseInt(daysInMonth[months.indexOf(start[1])]))
          if(startString==parseInt(daysInMonth[months.indexOf(start[1])])){
            stDays=1
          }else{
            console.log(sDays-startString)
            stDays=sDays-startString
          }
          console.log("stDays:"+stDays)
          const enDays=endString
          console.log("endays:"+enDays)
          var totalDays=enDays+stDays
          console.log("TOTAL:"+totalDays)
          if(diffMonth>1){
            var index=endMonth-startMonth+1
            while(index<endMonth){
              console.log("totalDay:"+totalDays)
              totalDays=totalDays+daysInMonth[months.indexOf(months[index])]
              index++
            }
            console.log("HERE1")
            setNoDays(totalDays)
            const total=totalDays
            return total
            sessionStorage.setItem("noDays",total)
          }else{
            console.log("HERERER")
            return totalDays
            sessionStorage.setItem("noDays",totalDays)
          }
          
        }else{
          var startString
          var endString
          const sDays=daysInMonth[months.indexOf(start[1])]
          const eDays=daysInMonth[months.indexOf(end[1])]
          console.log("sday:"+sDays);
          console.log("enddays:"+eDays)
          console.log(parseInt(start[2].substring(0,1)))
          if(parseInt(start[2].substring(0,1))==0){
            startString=parseInt(start[2].substring(1,2))
          }else{
            startString=parseInt(start[2])

          }
          if(parseInt(end[2].substring(0,1))==0){
            endString=parseInt(end[2].substring(1,2))
          }else{
            endString=parseInt(end[2])
          }
          console.log(startString)
          var stDays
          console.log(startString==parseInt(daysInMonth[months.indexOf(start[1])]))
          if(startString==parseInt(daysInMonth[months.indexOf(start[1])])){
            stDays=1
          }else{
            console.log(sDays-startString)
            stDays=sDays-startString
          }
          console.log("stDays:"+stDays)
          const enDays=endString
          console.log("endays:"+enDays)
          var totalDays=enDays+stDays
          console.log("total days:"+totalDays)
          if(diffMonth>1){
            var index=endMonth-startMonth+1
            while(index<endMonth){
              console.log("totalDay:"+totalDays)
              totalDays=totalDays+daysInMonth[months.indexOf(months[index])]
              index++
            }
            console.log("nes totalDays"+totalDays)
            sessionStorage.setItem("noDays",totalDays)
            setNoDays(totalDays)
            const total=totalDays
            return total
          }else{
            console.log("HEREE@")
            sessionStorage.setItem("noDays",totalDays)
          }
        }

        

      }
    }else{

      console.log("years dont match")
    }

  }

  const navigate=useNavigate()
  const [checkOutLink,setCheckOutLink]=useState()

 async function checkout(){
    const q=sessionStorage.getItem("noDays")
 
    
    await axios.post("http://localhost:3012/payment/checkout/"+id,{fees:[{id:"price_1MrY1oLxMJskpKlAbFZlt9et",quantity:q},{id:"price_1MrY3uLxMJskpKlAfpN870oN",quantity:1}]}).then((response)=>{
      console.log(response)
      setCheckOutLink(response.data.url)
    })
  
 }



if(!isLoading ){
  console.log(sessionStorage.getItem("checkoutLink"))
  const check=sessionStorage.getItem("checkoutLink")
  const day=JSON.parse(sessionStorage.getItem("application_payment"))
  console.log(check)
  console.log(day)
  
  if(check!=null){ 
  return (
    <div class="flex-col p-3">
      <Link class="bg-yellow-300 p-3" to="/home">Go back</Link>
      
       <p class="text-center ">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
         <div class="flex flex-col p-5 ">
          <Elements stripe={stripePromise}>
            <button class="bg-green-600 rounded-md m-3 p-3" onClick={()=>{
              checkout()}}>
              <p class="text-white">Proceed</p>
            </button>
              <Link to={checkOutLink} class="bg-green-600 p-3 rounded-md m-3" >
                <p class="text-white text-center">{checkOutLink}</p>
              </Link>
          </Elements>
          </div>
  
      
     

    </div>
  )}else{
    return (
      <div class="flex-col p-3">
        <Link class="bg-yellow-300 p-3" to="/home">Go back</Link>
        
         <p class="text-center ">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
           <div class="flex flex-col p-5 ">
            <Elements stripe={stripePromise}>
              <button class="bg-green-600 rounded-md m-3 p-3" onClick={()=>{
                checkout()}}>
                <p class="text-white">Proceed</p>
              </button>
                <Link to={checkOutLink} class="bg-green-600 p-3 rounded-md m-3" >
                  <p class="text-white text-center">{checkOutLink}</p>
                </Link>
            </Elements>
            </div>
    
        
       
  
      </div>
    )

  }
}else{
  return(<div></div>)
}
}

export default PaymentPage