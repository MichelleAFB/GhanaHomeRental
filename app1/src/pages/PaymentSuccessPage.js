import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {useEffect,useState} from 'react'
function PaymentSuccessPage() {

  const {id}=useParams()
  const[isLoading,setIsLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
      axios.get("https://ghanahomerental.onrender.com/admin-applications/application/"+id).then((response)=>{
        console.log(response)
        if(response.data.success){
          axios.post("https://ghanahomestayserver.onrender.com/admin-applications/approve-booking/"+id).then((response1)=>{
            console.log(response1)
          if(response1.data.approved){
            var currDate=new Date()
            currDate=currDate.toString().substring(0,15)
            axios.post("https://ghanahomestayserver.onrender.com/admin-applications/setStatus/"+id+"/PAYEDANDAPPROVED",{message:"Applicantion recently paid on "+currDate+" and approved!"}).then((response2)=>{
              console.log(response2)
              if(response2.data.success){
                navigate("/")
              }
            })
          }
          })
        }
      })
    })

  },[])

  if(isLoading){
    return(
      <div class='bg-gray-200 z-30' data-testId="modal-public">
       
      <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
       
        <main id='content' role='main' class='w-full max-w-md mx-auto '>
      <div class="flex w-full justify-center ">
          <div class="flex-col justify-end  ">
          <div class="loading-spinner-large"/>
      </div>
    </div>
    </main>
    </div>
    </div>
    )
  }else{
  return (
    <div class="flex flex-col p-3 m-3">
      <div class="flex flex-col m-3 rounded-md bg-gray-300 p-3">
          <p class="text-center font-bold">SUCCESS</p>
          <p class="text-center fon-bold">Your payment was accepted</p>
          <button class="bg-green-400 rounded-md p-3 " onClick={()=>{
           
          }}>
              GoBack To DashBoard
          </button>
      </div>
    </div>
  )
}
}

/*
  const prom=new Promise((resolve,reject)=>{
              axios.post("https://ghanahomestayserver.onrender.com/admin-applications/approve-booking/"+application.application.application._id).then((response)=>{
                console.log("approve response")
                console.log(response)
               
                if(response.data.success==true){
                  if(response.data.approved==true){
                    axios.post("https://ghanahomestayserver.onrender.com/admin-applications/setStatus/"+application.application.application._id+"/CONFIRMED",{message:"Your reservation for stay["+application.application.application.stay_start_date+" through "+application.application.application.stay_end_date+"] is confirmed!"}).then((response1)=>{
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

*/
/*
  axios.post("https://ghanahomestayserver.onrender.com/client-applications/setStatus/"+id+"/PAYED",{message:"Application "+id+" was recently paid"}).then((response)=>{
                console.log(response)
                if(response.data.success){
                  navigate("/")
                }
              })
*/

export default PaymentSuccessPage