import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'

//outside
import axios from 'axios'
function Application() {

  const {email} =useParams()
  const {phone}=useParams()
  const {firstname}=useParams()
  const {lastname}=useParams()
  const{startDate}=useParams()
  const{endDate}=useParams()
  const{noAdults}=useParams()
  const {noChildren}=useParams()

  const[finalChildren,setFinalChildren]=useState()
  const[finalAdults,setFinalAdults]=useState()
  const[adults,setAdults]=useState(noAdults)
  const[children,setChildren]=useState(noChildren) 
  const[middleName,setMiddleName]=useState()
  const[newFirstName,setNewFirstName]=useState()
  const[newLastName,setNewLastName]=useState()
  const[useNewFirstName,setUseNewFirstName]=useState(false)
  const[useNewLastName,setUseNewLastName]=useState(false)
  const[newNoAdults,setNewNoAdults]=useState(0)
  const[useNoAdults,setUseNoAdults]=useState(true)
  const[useNoChildren,setUseNoChildren]=useState(true)
  const[useNewNoAdults,setUseNewNoAdults]=useState(false)
  const[newNoChildren,setNewNoChildren]=useState(0)
  const[useNewNoChildren,setUseNewNoChildren]=useState(false)
  console.log(firstname)
  console.log(lastname)
  console.log(endDate)
  console.log(noAdults)
  console.log(noChildren)

  const formRef=useRef()

  const[adultFirstNamesOccupants,setAdultFirstNamesOccupants]=useState([])

 
  return (
    <div class="flex flex-col p-3 justify-center">
      <p class="text-4xl text-center text-green-600 text-semi-bold m-5">Application</p>
      <div class="flex flex-col bg-gray-200 rounded-md w-full justify-center p-5">
        <form class="justify-center" ref={formRef}>
          <div class="flex justify-between m-5">
            <label name="firstname">First:</label>
              <input type="text" class="p-1 rounded-md" value={useNewFirstName?newFirstName:firstname} placeholder={firstname} onChange={(e)=>{
                if(e.target.value!=" "|| e.target.value!=null || e.target.value!=" "){
                    setUseNewFirstName(true)
                    
                    setNewFirstName(e.target.value)
                }else{
                  
                  setUseNewFirstName(false)
                }
              }}/> 
          </div>
          <div class="flex justify-between m-5">
            <label name="firstname">Middle:</label>
              <input type="text" class="p-1 rounded-md"  placeholder="..." onChange={(e)=>{
                
                    setMiddleName(true)
                    setMiddleName(e.target.value)
                
              }}/> 
          </div>
          <div class="flex justify-between m-5">
          <label name="firstname">Last:</label>
              <input type="text" class="p-1 rounded-md " value={useNewLastName?newLastName:lastname} placeholder={lastname} onChange={(e)=>{
                if(e.target.value!=""|| e.target.value!=null){
                    setUseNewFirstName(true)
                    setNewFirstName(e.target.value)
                }else{
                  setUseNewFirstName(false)
                }
              }}/>
          </div>
          <p class="text-xl text-green-600 font-semibold m-3">Stay Details</p>
         <div class="flex flex-col bg-gray-100 rounded-md p-3 m-3">
         <div class="flex justify-between m-5">
            <label name="firstname">Number of Adults:</label>
              <input    min={1} max={6} placeholder={noAdults} default={noAdults} type="number"  class="justify-end rounded-md w-[25vw] p-2"  onChange={(e)=>{
                console.log(e.target.value)
                if(e.target.value!=""|| e.target.value!=null){
                    setUseNewNoAdults(true)
                    setUseNoAdults(false)
                    setNewNoAdults(e.target.value)
                }else{
                  setUseNoAdults(true)
                  setUseNewNoAdults(false)
                }
              }}/> 
          </div>
          <div class="flex justify-between m-5">
            <label name="firstname">Number of Children:</label>
              <input    min={0} max={5} placeholder={noChildren} default={noChildren} type="number"  class="justify-end rounded-md w-[25vw] p-2"  onChange={(e)=>{
                if(e.target.value!=""|| e.target.value!=null){
                    setUseNewNoChildren(true)
                    setUseNoChildren(false)
                    setNewNoChildren(e.target.value)
                }else{
                  setUseNoChildren(true) 
                  setUseNewNoChildren(false)
                }
              }}/> 
          </div>
          <div class="h-[250px] w-full overflow-y-scroll overflow-hidden">
          <div class="flex flex-col">
            <p class="text-center text-semibold text-green-600">Adult Occupants</p>
          </div>
          <div class="flex justify-between">
            
                {
                  !useNewNoAdults || useNoAdults? 
                  
                  (
                    noAdults==1?(
                      (
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="Your age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 
                   {
                  !useNewNoAdults || useNoAdults ? 
                  
                  (
                    noAdults==2?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="Your age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

                {
                  !useNewNoAdults || useNoAdults? 
                  
                  (
                    noAdults==3?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Your Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

      {
                  !useNewNoAdults || useNoAdults? 
                  
                  (
                    noAdults==4?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

                

{
                  !useNewNoAdults || useNoAdults ? 
                  
                  (
                    noAdults==5?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 
                {
                  !useNewNoAdults || useNoAdults? 
                  
                  (
                    noAdults==6?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_5">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 






          {
                  useNewNoAdults || !useNoAdults? 
                  
                  (
                    newNoAdults==1?(
                      (
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="Your age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 
                   {
                  useNewNoAdults || !useNoAdults ? 
                  
                  (
                    newNoAdults==2?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="Your age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

                {
                  useNewNoAdults || !useNoAdults? 
                  
                  (
                    newNoAdults==3?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Your Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3"> Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

      {
                  useNewNoAdults || !useNoAdults? 
                  
                  (
                    newNoAdults==4?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 

                

{
                  useNewNoAdults || !useNoAdults ? 
                  
                  (
                    newNoAdults==5?(
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            <option selected>You</option>
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 
                {
                  useNewNoAdults || !useNoAdults? 
                  
                  (
                    newNoAdults==6?(  
                      (
                        
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age</label>
                            <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                            
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_5">
                            <label class="ml-3">First:</label>
                            <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Age:</label>
                            <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <select
                            id='states'
                            class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                             >
                             .
                            <option value='private'>child</option>
                            <option value='public'>partner</option>
                            <option value='sibling'>sibling</option>
                            <option value='sibling'>parent</option>
                            <option value ="extended family">ext family</option>
                            <option value='company'>roommate</option>
                          </select>
                          </div>
                        </div>
                      )
                    
                    ):<div></div>
                  ):<div></div>
                } 
          </div>
          
          
          <div class="flex flex-col">
            <p class="text-center text-sl text-green-600  m-3">
              Child Occupants
            </p>
          </div>

          <div class="flex justify-between w-full">
            
            {
              !useNewNoChildren && useNoChildren? 
              
              (
                noChildren==1?(
                  (
                    <div class="overflow-x-scroll overflow-hidden w-full ">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3"> First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                       
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 
               {
              !useNewNoChildren || useNoChildren? 
              
              (
                noChildren==2?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3" id="children_0">
                       <div class="flex justify-around m-2">
                        <label class="ml-3"> First:</label>
                        <input type="text" placeholder="first name" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder=" last name"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="Your age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                        
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                        
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

            {
              !useNewNoChildren? 
              
              (
                noChildren==3 ?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Your Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                      
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                    
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                       
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

  {
              !useNewNoChildren || useNoChildren? 
              
              (
                noChildren==4?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                        <option selected>You</option>
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

            

{
              !useNewNoChildren || useNoChildren? 
              
              (
                noChildren==5?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_4">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                         <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 


{
              useNewNoChildren && !useNoChildren? 
              
              (
                newNoChildren==1?(
                  (
                    <div class="overflow-x-scroll overflow-hidden w-full ">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3"> First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                       
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 
               {
              useNewNoChildren || !useNoChildren? 
              
              (
                newNoChildren==2?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3" id="children_0">
                       <div class="flex justify-around m-2">
                        <label class="ml-3"> First:</label>
                        <input type="text" placeholder="first name" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder=" last name"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="Your age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                        
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                        
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

            {
              useNewNoChildren || !useNoChildren?  
              
              (
                newNoChildren==3 ?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Your Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                      
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                    
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                       
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

  {
              useNewNoChildren || !useNoChildren? 
              
              (
                newNoChildren==4?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="Your first name" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="Your last name"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age" placeholder="Your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                        <option selected>You</option>
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 

            

{
              useNewNoChildren || !useNoChildren? 
              
              (
                newNoChildren==5?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_4">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='private'>child</option>
                        <option value='sibling'>sibling</option>
                         <option value ="extended family">ext family</option>
                      </select>
                      </div>
                    </div>
                  )
                
                ):<div></div>
              ):<div></div>
            } 


























        
      </div>
      </div>

         </div>
         <button onClick={(e)=>{
          e.preventDefault()
          console.log(formRef)
          console.log(useNoAdults)
          console.log(useNewNoAdults)
          const prom=new Promise((resolve,reject)=>{

            if(useNoAdults){
              if(noAdults==1){
                 const prom1=new Promise((resolve1,reject1)=>{
                  console.log("here")
                  console.log(document.getElementById("adults_"+noAdults))
                 })

              }
              if(noAdults==2){
                
              }
              if(noAdults==3){
                
              }
              if(noAdults==4){
                
              }
              if(noAdults==5){
                
              }
              if(noAdults==6){
                
              }

            }
            if(useNewNoAdults){
              if(newNoAdults==1){
                const prom1=new Promise((resolve1,reject1)=>{
                  console.log("here")
                  console.log(newNoAdults)
                  console.log(document.getElementById("adults_"+(newNoAdults-1)))
                  const info=document.getElementById("adults_"+(newNoAdults-1)).children
                  console.log(info)
                 })

              }
              if(newNoAdults==2){
                
              }
              if(newNoAdults==3){
                
              }
              if(newNoAdults==4){
                
              }
              if(newNoAdults==5){
                
              }
              if(newNoAdults==6){
                
              }
            }
            /****************************CHILDREN */
            if(useNoChildren){
              if(noChildren==1){

              }
              if(noChildren==2){
                
              }
              if(noChildren==3){
                
              }
              if(noChildren==4){
                
              }
              if(noChildren==5){
                
              }

            }
            if(useNewNoChildren){
              if(newNoChildren==1){

              }
              if(newNoChildren==2){
                
              }
              if(newNoChildren==3){
                
              }
              if(newNoChildren==4){
                
              }
              if(newNoChildren==5){
                
              }

            }
             
          })

          prom.then(()=>{
            axios.post("http://localhost:3012/applications/create-application",{form:JSON.stringify(formRef)}).then((response)=>{
              console.log(response)
            })

          })

         }} class="w-full p-2 rounded-sm bg-green-400 hover:bg-green-300 flex justify-around">
              <p class="text-center text-white font-bold">Submit</p> 
         </button>
          </form>
      </div>
      </div>
  )
}

export default Application
