import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import emailjs from '@emailjs/browser'

//outside
import axios from 'axios'
import $ from 'jquery'
import { sendForm } from '@emailjs/browser/es'
function Application() {

  const {email} =useParams()
  const {phone}=useParams()
  const {firstname}=useParams()
  const {lastname}=useParams()
  const{startDate}=useParams()
  const{endDate}=useParams()
  const{noAdults}=useParams()
  const {noChildren}=useParams()

  const[emailDate,setEmailData]=useState()
  const emailForm=useRef()

 const[finalFirstName,setFinalFirstName]=useState(firstname)
 const[finalLastName,setFinalLastName]=useState(lastname)
 const[finalAdults,setFinalAdults]=useState(noAdults)
 const[finalChildren,setFinalChildren]=useState()
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

  const navigate=useNavigate()
  const formRef=useRef()

  const[adultOccupants,setAdultOccupants]=useState()
  const[childrenOccupant,setChildrenOccupants]=useState()


  async function sendEmail(form){
    
    console.log("testing emailjs functionality");
    emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        form.current,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result)
          console.log(result.status)
          return result.status
          console.log(result.text); 
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

 
 console.log("newNoAdults:"+newNoAdults)
  return (
    <div class="flex flex-col p-3 justify-center">
      <p class="text-4xl text-center text-green-600 text-semi-bold m-5">Application</p>
      <form ref={emailForm}>
                     <input name="firstname" class="hidden" value={finalFirstName} type="text"/>
                     <input name="lastname" class="hidden"  type="text" value={finalLastName}/>
                     <input name="email" class="hidden"  type="text" value={email}/>
                     <input name="message" class="hidden"  tyoe="text" value={"We have recieved your applicant for "+startDate+" through " + endDate+". Please answer security question in the following link."}/>
                     <input name="subject"class="hidden"  type="text" value={"Application Recieved"}/>
                   </form>
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
          <div class="flex justify-between m-5">
          <label name="startDate">Start Date:</label>
              <div><p class="font-bold ">{startDate}</p></div>
          </div>
          <div class="flex justify-between m-5">
          <label name="endDate">End Date:</label>
              <div><p class="font-bold ">{endDate}</p></div>
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
          <div class="flex justify-between w-full m-3 p-3">
            
                {
                  !useNewNoAdults || useNoAdults? 
                  
                  (
                    noAdults==1?(
                      (
                        <div class="overflow-x-scroll overflow-hidden p-3">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                           <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
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
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                            <label class="ml-3"> First:</label>
                            <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                            <label class="ml-3"> First:</label>
                            <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_5">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                        <div class="overflow-x-scroll overflow-hidden w-full">
                             <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
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
                        
                        <div class="overflow-x-scroll overflow-hidden w-full">
                             <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                        <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value='roomate'>roommate</option>
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
                        
                        <div class="overflow-x-scroll overflow-hidden w-full">
                           <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                           <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                        <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                        
                        <div class="overflow-x-scroll overflow-hidden w-full">
                            <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                          <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                        
                        <div class="overflow-x-scroll overflow-hidden w-full">
                             <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                          <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
                        
                        <div class="overflow-x-scroll overflow-hidden w-full">
                             <div class="flex justify-around m-2" id="adults_0">
                            <label class="ml-3"> First:</label>
                            <input type="text" name="your first" placeholder="your first" class="p-1 border-gray-200 rounded-md" value={firstname} readonly/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="your last" placeholder="last"class="p-1 border-gray-200 rounded-md" value={lastname} readonly/><label class="ml-3">Email:</label> 
                            <input type="email" name="your email" placeholder="email"class="p-1 border-gray-200 rounded-md" value={email} readonly/>
                            <label class="ml-3"> Age:</label>
                            <input  name="your age" placeholder="your age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                            <label class="ml-3">Association:</label>
                            <input class=' border text-gray-900 text-sm rounded-md border-l border-gray-100 p-1' type="text" value="you" readonly/>
                          </div>
                         
                          <div class="flex justify-around m-2" id="adults_1">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_2">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_3">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_4">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
                          </select>
                          </div>
                          <div class="flex justify-around m-2" id="adults_5">
                            <label class="ml-3">First:</label>
                            <input type="text" name="first" placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                            <label class="ml-3">Last:</label> 
                            <input type="text" name="last" placeholder="last" class="p-1 border-gray-200 rounded-md"/>  <label class="ml-3">Email:</label> 
                            <input type="email" name="email" placeholder="email" class="p-1 border-gray-200 rounded-md"/>
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
                            <option value=' roommate'>roommate</option>
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
              Child Occupants (Under Age 18)
            </p>
          </div>

          <div class="flex justify-between w-full">
            
            {
              !useNewNoChildren && useNoChildren? 
              
              (
                noChildren==1 && (noAdults<6 && newNoAdults<6)?(
                  (
                    <div class="overflow-x-scroll overflow-hidden w-full ">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3"> First:</label>
                        <input type="text" name="first"placeholder="first" class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" name="last"placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                       
                        <option selected value='child' >child</option>
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
                (noChildren==2 && (noAdults<6 && newNoAdults<6))?(
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
                        
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                noChildren==3 && (noAdults<6 && newNoAdults<6)?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Your Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                      
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                    
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                noChildren==4 && (noAdults<6 && newNoAdults<6)?(
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
                        <option selected value="you">You</option>
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                noChildren==5 && (noAdults<6 && newNoAdults<6)?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
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
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_4">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                (newNoChildren==1 && (noAdults<6 && newNoAdults<6))?(
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
                       
                        <option value='child' selected>child</option>
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
                newNoChildren==2 && (noAdults<6 && newNoAdults<6)?(
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
                        
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                newNoChildren==3 && (noAdults<6 && newNoAdults<6) ?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Your Last:</label> 
                        <input type="text" placeholder="last"class="p-1 border-gray-200 rounded-md"/>
                        <label class="ml-3"> Age:</label>
                        <input  name="age" placeholder="age" min={0}  default={noAdults} type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                      
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                    
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                newNoChildren==4 && (noAdults<6 && newNoAdults<6)?(
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
                        <option selected value="you">You</option>
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                newNoChildren==5 && (noAdults<6 && newNoAdults<6)?(
                  (
                    
                    <div class="overflow-x-scroll overflow-hidden p-3">
                       <div class="flex justify-around m-2" id="children_0">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
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
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                     
                      <div class="flex justify-around m-2" id="children_1">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_2">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_3">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
                        <option value='sibling'>sibling</option>
                        <option value ="extended family">ext family</option>
                      </select>
                      </div>
                      <div class="flex justify-around m-2" id="children_4">
                        <label class="ml-3">First:</label>
                        <input type="text" placeholder="first" class="p-1 border-gray-200 rounded-md" name="first"/>
                        <label class="ml-3">Last:</label> 
                        <input type="text" placeholder="last" class="p-1 border-gray-200 rounded-md" name="last"/>
                        <label class="ml-3">Age:</label>
                        <input  name="age"  min={0} placeholder="27" type="number"  class="justify-end rounded-md p-1 text-center" /> 
                        <label class="ml-3">Association:</label>
                        <select
                        id='states'
                        class=' border  text-gray-900 text-sm rounded-md border-l border-gray-100 p-1'
                         >
                         .
                        <option value='child' selected>child</option>
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
                const occupants=[]
                var occupant={
                  firstname:"",
                  lastname:"",
                  age:"",
                  association:""
                }
                occupant.association="applicant"
                const prom1=new Promise((resolve1,reject1)=>{
                  console.log("here")
                  const inputs=$('#adults_'+(noAdults-1))[0].children
                  var arr = [...inputs];
                  arr.map((m)=>{
                    console.log(m.value)
                    if(m.name=="your first"){
                        occupant.firstname=m.value
                    }
                    if(m.name=="your last"){
                      occupant.lastname=m.value
                    }
                    if(m.name=="your age"){
                      occupant.age=m.value
                    }
                    if(m.name=="your email"){
                      occupant.email=m.value
                    }
                   
                   
                  })
                  occupants.push(occupant)
                 resolve1()
           
                 })

                 prom1.then(()=>{
                  console.log(occupant)
                  console.log(occupants)
                  setAdultOccupants(occupants)
                 })

              }
              if(noAdults>1){

                const occupants=[]
               

                var count=noAdults
                
                const prom1=new Promise((resolve1,reject1)=>{
                  while(count>0){
                  console.log("here")
                  var occupant={
                    firstname:"",
                    lastname:"",
                    age:"",
                    association:""
                  }
                  const inputs=$('#adults_'+(count-1))[0].children
                  
                  var arr = [...inputs];
                  console.log(arr)
                  if((count-1)==0){
                    occupant.association="applicant"
                  }
                  arr.map((m)=>{
                    console.log(m.value)
                    if((count-1)==0){
                      console.log(occupant)
                    if(m.name=="your first"){
                        occupant.firstname=m.value
                    }
                    if(m.name=="your last"){
                      occupant.lastname=m.value
                    }
                    if(m.name=="your age"){
                      occupant.age=m.value
                    }
                    if(m.name=="your email"){
                      occupant.email=m.value
                    }
                      
                    
                  }else{
                   console.log("occupant")
                    if(m.name=="first"){
                      occupant.firstname=m.value
                  }
                  if(m.name=="last"){
                    occupant.lastname=m.value
                  }
                  if(m.name=="age"){
                    occupant.age=m.value
                  }
                  if(m.id=="states"){
                    occupant.association=m.value 

                  }
                  if(m.name=="email"){
                    occupant.email=m.value
                  }
                  console.log(occupant)
                }
                   
                  })
                  occupants.push(occupant)
                  count=count-1 
                  console.log("count:"+count)
                }
                 resolve1()
                 })

                 prom1.then(()=>{
                  console.log(occupants)
                  setAdultOccupants(occupants)
                 })
                
              }

            }
            if(useNewNoAdults){
              if(newNoAdults==1){

                const occupants=[]
                var occupant={
                  firstname:"",
                  lastname:"",
                  age:"",
                  association:""
                }
                occupant.association="applicant"
                const prom1=new Promise((resolve1,reject1)=>{
                  console.log("here")
                  const inputs=$('#adults_'+(newNoAdults-1))[0].children
                  var arr = [...inputs];
                  arr.map((m)=>{
                    console.log(m.value)
                    if(m.name=="your first"){
                        occupant.firstname=m.value
                    }
                    if(m.name=="your last"){
                      occupant.lastname=m.value
                    }
                    if(m.name=="your age"){
                      occupant.age=m.value
                    }
                    if(m.name=="your email"){
                      occupant.email=m.value
                    }
                   
                   
                  })
                  occupants.push(occupant)
                 resolve1()
           
                 })

                 prom1.then(()=>{
                  console.log(occupant)
                  console.log(occupants)
                  setAdultOccupants(occupants)
                 })
              }
              if(newNoAdults>1){
                const occupants=[]
               
                setFinalAdults(newNoAdults)
                var count=newNoAdults
                
                const prom1=new Promise((resolve1,reject1)=>{
                  while(count>0){
                  console.log("here")
                  var occupant={
                    firstname:"",
                    lastname:"",
                    age:"",
                    association:""
                  }
                  const inputs=$('#adults_'+(count-1))[0].children
                  
                  var arr = [...inputs];
                  console.log(arr)
                  if((count-1)==0){
                    occupant.association="applicant"
                  }
                  arr.map((m)=>{
                    console.log(m.value)
                    if((count-1)==0){
                      console.log(occupant)
                    if(m.name=="your first"){
                        occupant.firstname=m.value
                    }
                    if(m.name=="your last"){
                      occupant.lastname=m.value
                    }
                    if(m.name=="your age"){
                      occupant.age=m.value
                    }
                    if(m.name=="your email"){
                      occupant.email=m.value
                    }
                    
                      
                    
                  }else{
                   console.log("occupant")
                    if(m.name=="first"){
                      occupant.firstname=m.value
                  }
                  if(m.name=="last"){
                    occupant.lastname=m.value
                  }
                  if(m.name=="age"){
                    occupant.age=m.value
                  }
                  if(m.id=="states"){
                    occupant.association=m.value 

                  }
                  if(m.name=="email"){
                    occupant.email=m.value
                  }
                  console.log(occupant)
                }
                   
                  })
                  occupants.push(occupant)
                  count=count-1 
                  console.log("count:"+count)
                }
                 resolve1()
           
                 })

                 prom1.then(()=>{
                 
                  console.log(occupants)
                  setAdultOccupants(occupants)
                 })
                
              }
              
            }
            /****************************CHILDREN */
            if(useNoChildren){
              const occupants=[]
               

              var count=noChildren
              
              const prom1=new Promise((resolve1,reject1)=>{
                while(count>0){
                console.log("here")
                var occupant={
                  firstname:"",
                  lastname:"",
                  age:"",
                  association:""
                }
                const inputs=$('#children_'+(count-1))[0].children
                
                var arr = [...inputs];
                console.log(arr)
                if((count-1)==0){
                  occupant.association="applicant"
                }
                arr.map((m)=>{
                  console.log(m.value)
               
                 console.log("occupant")
                  if(m.name=="first"){
                    occupant.firstname=m.value
                }
                if(m.name=="last"){
                  occupant.lastname=m.value
                }
                if(m.name=="age"){
                  occupant.age=m.value
                }
                if(m.id=="states"){
                  occupant.association=m.value 

                }
                console.log(occupant)

                 
                })
                occupants.push(occupant)
                count=count-1 
                console.log("count:"+count)
              }
               resolve1()
         
               })

               prom1.then(()=>{
               
                console.log(occupants)
                setChildrenOccupants(occupants)
               })

            }
            if(useNewNoChildren){
              setFinalChildren(newNoChildren)
              if(newNoChildren>0){ 

                const occupants=[]
               

              var count=newNoChildren
              
              const prom1=new Promise((resolve1,reject1)=>{
                while(count>0){
                console.log("here")
                var occupant={
                  firstname:"",
                  lastname:"",
                  age:"",
                  association:""
                }
                const inputs=$('#children_'+(count-1))[0].children
                
                var arr = [...inputs];
                console.log(arr)
               
                arr.map((m)=>{
                  console.log(m.value)
               
                 console.log("occupant")
                  if(m.name=="first"){
                    occupant.firstname=m.value
                }
                if(m.name=="last"){
                  occupant.lastname=m.value
                }
                if(m.name=="age"){
                  occupant.age=m.value
                }
                if(m.id=="states"){
                  occupant.association=m.value 

                }
                console.log(occupant)
                 
                })
                occupants.push(occupant)
                count=count-1 
                console.log("count:"+count)
              }
               resolve1()
         
               })

               prom1.then(()=>{
               
                console.log(occupants)
                setChildrenOccupants(occupants)
               })

              }

            }
            resolve()
             
          })

          prom.then(()=>{
           if(useNewFirstName){
            setFinalFirstName(newFirstName)
           }
           if(useNewLastName){
              setFinalLastName(newLastName)

           }
           var applications
           const prom2=new Promise((resolve2,reject2)=>{

            axios.post("http://localhost:3012/client-applications/create-application",{firstname:finalFirstName,middleName:middleName,lastname:finalLastName,children:childrenOccupant,adults:adultOccupants,startDate:startDate,endDate:endDate}).then((response)=>{
              console.log(response.data)
              if(response.data.success){
                applications=response.data.applications
               const emailSent= sendEmail(emailForm)
               emailSent.then((data)=>{
               
                
                  alert("SUCCESS: your application was recieved. Check your email for the nest steps")
                
               })
                resolve2()
              }else{
                alert("ERROR: application not sent")
                reject2()
              }
            })
           })

           prom2.then(()=>{
            sessionStorage.setItem("my_applications",JSON.stringify(applications))
             navigate("/")
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
