import React from 'react'


import { setUserType,setUser } from '../redux/user/user-actions' 
import {useDispatch} from 'react-redux'
import { useParams,useNavigate} from 'react-router-dom'
import { useState } from 'react'
//outside
import axios from 'axios'
function ResetPassword() {

  const{email}=useParams()
  console.log(email)

 const navigate=useNavigate()
 const dispatch=useDispatch()

  const[password,setPassword]=useState()
  const[passwordConfirm,setPasswordConfirm]=useState()
  return (
        <div class="flex h-screen p-5 justify-center bg-gray-100 w-screen j">
     
         <div class="flex h-1/3  bg-gray-300 rounded-md p-5 w-4/5">
           <div class="flex-col flex-grow w-1/5">
             <label><p class="mr-3 mt-2 font-bold">Email: </p></label>
             <label><p class="mr-3 mt-2 font-bold">Password: </p></label>
             <label><p class="mr-3 mt-2 font-bold">confirm password: </p></label>
           </div>
           <div class="flex-col flex-grow w-4/5">
              <input class="flex w-full mt-2 rounded-sm" value={email}/>
              <input class="flex w-full mt-2 rounded-sm" type="text" onChange={(e)=>{
                 setPassword(e.target.value)
               }}/>
               <input type="text" class="flex w-full mt-2 rounded-sm" onChange={(e)=>{
                 setPasswordConfirm(e.target.value)
             }}/>
              <button class="bg-gray-500 rounded-md w-1/3 p-1 flex justify-center mt-2" onClick={()=>{
                const prom=new Promise((resolve,reject)=>{
                  axios.post("https://ghanahomestayserver.onrender.com/sign-in/reset-password/"+email,{password:password,confirmPassword:passwordConfirm}).then((response)=>{
                    console.log(response.data)
                    if(response.data.success){
                      var user=response.data.user
                      user={firstname:user.firstname,lastname:user.lastname,phone:user.phone,email:user.email}

                      sessionStorage.setItem("user",JSON.stringify(user))
                      sessionStorage.setItem("signInType","signIn")
                      dispatch(setUser(user))
                      dispatch( setUserType("client"))
                      resolve()
                      setTimeout(()=>{
                        resolve()
                      },500)
                    }

                  })

                })

                prom.then(()=>{
                  navigate("/")

                })
              }}>
                  <p class="text-center font-bold text-white">
                    Submit
                  </p>
              </button>
             
            </div>
         </div>
     </div>
  )
}

export default ResetPassword