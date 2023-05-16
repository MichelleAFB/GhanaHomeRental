import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function PaymentSuccessPage() {

  const {id}=useParams()
  const navigate=useNavigate()

  console.log("hello  hu")
  return (
    <div class="flex flex-col p-3 m-3">
      <div class="flex flex-col m-3 rounded-md bg-gray-300 p-3">
          <p class="text-center font-bold">SUCCESS</p>
          <p class="text-center fon-bold">Your payment was accepted</p>
          <button class="bg-green-400 rounded-md p-3 " onClick={()=>{
            const prom=new Promise((resolve,reject)=>{
              console.log("here")
              axios.post("https://ghanahomerental.herokuapp.com/client-applications/setStatus/"+id+"/PAYED",{message:"Application "+id+" was recently paid"}).then((response)=>{
                console.log(response)
                if(response.data.success){
                  navigate("/")
                }
              })
            })
          }}>
              GoBack To DashBoard
          </button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage