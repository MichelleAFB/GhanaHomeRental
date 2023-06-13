import React from 'react'

import { useParams,useNavigate} from 'react-router-dom'
import { useState } from 'react'
//outside
import axios from 'axios'
function ResetPassword() {

  const{email}=useParams()
  console.log(email)

 const navigate=useNavigate()

  const[password,setPassword]=useState()
  const[passwordConform,setPasswordConfirm]=useState()
  return (
    <div class="flex h-screen p-5 justify-center bg-gray-100 w-full">
      <div clas="flex flex-col w-full bg-red-400">
        <div class="flex flex-col  bg-gray-300 w-full rounded-md p-3 ">
          <div class="flex">
            <label><p>Email:</p></label>
            <input type="email" value={email} class="bg-inherit"/>

          </div>
          <div clas="flex w-full">
            <label><p>Password</p></label>
            <input type="text" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
          </div>
          <div clas="flex w-full">
            <label><p>Confirm Password</p></label>
           <input type="text" onChange={(e)=>{
                setPasswordConfirm(e.target.value)
            }}/>
          </div>
          <div class="flex mt-15 w-full justify-center">
              <button class="bg-gray-500 rounded-md w-1/4 p-3 flex" onClick={()=>{
                const prom=new Promise(()=>{
                  axios.post("http://localhost:3012/sign-in/reset-password/"+email,{password:password,confirmPassword:confirmPasswor}).then((response)=>{
                    if(response.data.success){
                      sessionStorage.setItem("user",JSON.stringify(response.data.user))
                    }

                  })

                })

                prom.then(()=>{

                })
              }}>
                  <p class="text-center font-bold text-white">
                    Submit
                  </p>
              </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResetPassword