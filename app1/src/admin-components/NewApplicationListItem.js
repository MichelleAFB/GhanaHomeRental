import React from 'react'

import {useState,useEffect} from 'react'

//assets
import { Avatar } from "@material-ui/core";
function NewApplicationListItem({application}) {

  const [isLoading,setIsLoading]=useState(true)
  const[noChildren,setNoChildren]=useState()
  const[noAdults,setNoAdults]=useState()

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      
        resolve()
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[])


    
  return (
    <div class="bg-gradient-to-r from-cyan-200 to-blue-400 flex flex-col p-3 w-1/2 rounded-md justify-self-center">
        <div class="flex flex-col border-b-2 justify-center  border-gray-400">
            <p class="text-white text-center">{application.application.firstname} {application.application.lastname}</p>
        </div>
        <div class="flex flex-col p-3">
          <p class="text-center font-bold underline ">start-end</p>
          <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
          <div class="flex bg-white p-2 rounded-md mt-4">
          <div class="flex justify-center">
          <p class="text-center">Adults:</p>
          <div class="flex">
                  {
                       application.occupants.map((m)=>{
                        if(m.child==0){
                          return(<div class="m-2"><Avatar/></div>)
                        }
                        
                       })
                      } 
                      </div>
              </div>  
             
              <div class="flex justify-center">
          <p class="text-center">Children:</p>
          <div class="flex">
                  {
                       application.occupants.map((m)=>{
                        if(m.child==1){
                          return(<div class="m-2"><Avatar/></div>)
                        }
                        
                       })
                      } 
                      </div>
               </div> 
             </div>
        </div>
        <div class="flex justify-center">
          <button class="bg-blue-400 p-3 rounded-md"><p class="text-white">See More</p></button>
        </div>
    </div>
  )
    }


export default NewApplicationListItem
