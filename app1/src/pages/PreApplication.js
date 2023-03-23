import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

//check if person is logged in
function PreApplication() {

  const[signIn,setSignIn]=useState(true)

  const[firstname,setFirstName]=useState()
  const [lastname,setLastName]=useState()
  

  return (
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
        <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-pink-300  rounded-xl shadow-lg dark:bg-gray-300 dark:border-gray-700 mb-5'>
              <div class="flex flex-col w-full">
                <div class="flex flex-col  m-3">
               {
               signIn? <p class="text-xl text-center text-green-700 font-bold border-b-2 border-green-700  ">Sign In</p>:<p class="text-xl text-center border-b-2 border-green-700  text-green-700 font-bold ">Sign Up</p>
               }
               </div>
                
              <div class=' p-3'>
                  {signIn? 
                     <div class="flex-flex-col p-3">
                     <div class="flex justify-around">
                        <button class=" bg-gray-400 w-1/3 rounded-md m-3 p-2" onClick={()=>{
                           setSignIn(false)
                          }}>
                           <p class="text-white text-center text-xl font-bold">Sign Up</p>
                         </button>
                     </div>
                     </div>
                  :
                  <div class="flex-flex-col p-3">
                    <div class="flex justify-around">
                       <button class=" bg-gray-400 w-1/3 rounded-md m-3 p-2" onClick={()=>{
                          setSignIn(true)
                          }}>
                            <p class="text-white text-center text-xl font-bold">Sign In</p>
                        </button>
                    </div>
                    <div class="flex flex-col">
                       <div class="flex justify-around">
                          <label class="text-white font-bold">First:</label>
                          <input type="text" class="bg-white p-2 rounded-sm"/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Last:</label>
                          <input type="text" class="bg-white p-2 rounded-sm"/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Email:</label>
                          <input type="text" class="bg-white p-2 rounded-sm"/>
                       </div>
                       <div class="flex justify-around mt-2 ">
                          <label class="text-white font-bold">Phone:</label>
                          <input type="text" class="bg-white p-2 rounded-sm"/>
                       </div>
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