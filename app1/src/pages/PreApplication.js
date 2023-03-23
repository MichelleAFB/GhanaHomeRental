import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//check if person is logged in
function PreApplication() {

  const navigate=useNavigate()

  const[signIn,setSignIn]=useState(true)

  const[firstname,setFirstName]=useState()
  const[lastname,setLastName]=useState()
  const[email,setEmail]=useState()
  const[phone,setPhone]=useState()
  const[password,setPassword]=useState()
  const[passwordConfirm,setPasswordConfirm]=useState()


  return (
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
        <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-pink-300  rounded-xl shadow-lg dark:bg-gray-300 dark:border-gray-700 mb-5'>
              <div class="flex flex-col w-full">
                <div class="flex flex-col  m-3">
               {
               signIn? 
               <div class="flex flex-col">
                  <p class="text-xl text-center border-b-2 border-green-700  text-green-700 font-bold ">Sign In</p>
                  <p class="text-xl text-center  text-gray-700 font-bold " onClick={()=>{
                    setSignIn(false)
                  }}>Sign Up</p>
               </div> 
               :
               <div class="flex flex-col">
                  <p class="text-xl text-center border-b-2 border-green-700  text-green-700 font-bold ">Sign Up</p>
                  <p class="text-xl text-center  text-gray-700 font-bold " onClick={()=>{
                    setSignIn(true)
                  }}>Sign In</p>
               </div> 
               }
               </div>
                
              <div class=' p-3'>
                  {signIn? 
                      <div class="flex-flex-col p-3">
                      <div class="flex justify-around">
                       
                      </div>
                      <div class="flex flex-col">
                         <div class="flex justify-around">
                            <label class="text-white font-bold">Email:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setEmail(e.target.value)
                            }}/>
                         </div>
                         <div class="flex justify-around mt-2 ">
                            <label class="text-white font-bold">Pass:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setPassword(e.target.value)
                            }}/>
                         </div>
                         <button class="mt-2 bg-green-500 hover:bg-green-400 rounded-md p-3">
                         <p class="text-white  text-center">Submit</p>
                       </button>
                        
                      </div>
                    </div>
                  :
                  <div class="flex-flex-col p-3">
                    <div class="flex justify-around">
                      
                    </div>
                    <div class="flex flex-col">
                       <div class="flex justify-around">
                          <label class="text-white font-bold">First:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setFirstName(e.target.value)
                          }}/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Last:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setLastName(e.target.value)
                          }}/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Email:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setEmail(e.target.value)
                          }}/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Phone:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setPhone(e.target.value)
                          }}/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Password:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setPassword(e.target.value)
                          }}/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Confirm Password:</label>
                          <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                            setPasswordConfirm(e.target.value)
                          }}/>
                       </div>
                       <button class="mt-2 bg-green-500 hover:bg-green-400 rounded-md p-3" onClick={()=>{
                            if(firstname!=null && lastname!=null && email!=null && phone!=null && passwordConfirm!=null && password!=null && (password==passwordConfirm)){
                              console.log("submit")
                              axios.post("http://localhost:3012/sign-up/create-user",{firstname:firstname,lastname:lastname,email:email,phone:phone}).then((response)=>{
                                console.log(response.data)
                                if(response.data.success){
                                  const prom=new Promise((resolve,reject)=>{

                                    alert("SUCCESS: you've set up your account")
                                    sessionStorage.setItem("client",JSON.stringify({firstname:firstname,lastname:lastname,email:email,phone:phone}))
                                    resolve()
                                  })

                                  prom.then(()=>{
                                    navigate("/application/"+email+"/"+firstname+"/"+lastname+"/"+phone)
                                  })
                                 
                                }

                              })
                            }

                       }}>
                        <p class="text-white  text-center">Submit</p>
                       </button>
                    </div>

                
                  </div>
                  }

              </div>
              </div>
            </div>
        </main>
    </div>
  )
}

export default PreApplication