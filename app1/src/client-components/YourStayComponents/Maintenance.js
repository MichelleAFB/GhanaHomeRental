import React from 'react'
import { useState,useEffect } from 'react'

//outside
import axios from 'axios'
import MaintenanceListItem from './MaintenanceListItem'

function Maintenance({application}) {

  const[isLoading,setIsloading]=useState(true)
  const[issues,setIssues]=useState()
  const[noIssues,setNoIssues]=useState(0)

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      console.log(application.application._id)
        axios.get("https://ghanahomestayserver.onrender.com/current-resident/maintenance-issues/"+application.application._id).then((response)=>{
          console.log(response)
          if(response.data.success){
            
            setIssues(response.data.issues)
            setNoIssues(response.data.no_issues)
            
            setTimeout(()=>{
                resolve()
            },500)
          }
        })
    })

    prom.then(()=>{
      setIsloading(false)
    })

  },[])

  const [message,setMessage]=useState()
  const [mechanism,setMechanism]=useState()
  const[newIssue,setNewIssue]=useState(false)
  console.log(application)
  if(!isLoading){
    console.log(issues)
  return (
    <div class="flex-col w-full min-h-screen m-5">
      <div class="flex-col w-full p-3 bg-yellow-400 rounded-md m-2">
        <p class="text-center font-bold text-xl m-2">Maintence Reports</p>
        {
          noIssues==0 ?
          <div class="flex-col w-full  rounded-md bg-gray-200  p-5 h-3/4">
            <p class="text-start text-xl">No Maintenance Issues...</p>
            <button class=" flex w-full bg-yellow-700 p-3 rounded-md m-2" onClick={()=>{
        setNewIssue(!newIssue)
      }}>
        <p class="text-white text-center font-bold">New Request</p>
      </button>
          </div>:
          <div class="h-[40vh] overflow-y-scroll w-full overflow-hidden rounded-md bg-white">
               { issues.map((issue)=>{
            console.log(issue)
            console.log("hi")
             return(<MaintenanceListItem issue={issue}/>)
           })}
      <button class=" flex w-full bg-yellow-700 p-3 rounded-md m-2" onClick={()=>{
        setNewIssue(!newIssue)
      }}>
        <p class="text-white text-center font-bold">New Request</p>
      </button>
            </div>
        }
        

      </div>
   
      {newIssue?<div class="bg-gray-300 rounded-md m-3">
        <div class="flex-col w-full p-2 mt-5  justify-center justify-items-center">
          <label><p class="text-center font-bold">Please Describe:</p></label>
          <textarea class="justify-center w-full fle m-2 p-3" rows="10" cols="20" onChange={(e)=>{
            setMessage(e.target.value)
          }}/>
        </div>
        <div class="flex-col w-full p-2 mt-2  justify-center justify-items-center">
          <label><p class="text-center font-bold">Mechanism:</p></label>
          <select class="flex w-full p-2  rounded-md" onChange={(e)=>{
              setMechanism(e.target.value)
          }}>
              <option  class="m-2"value="Heating/Cooling/Air Conditioning">
              Heating/Cooling/Air Conditioning
              </option>
              <option  class="m-2"value="Water/Shower/Sink">
                   Water/Shower/Sink
              </option>
              <option  class="m-2"value="Laundry/Washer/Dryer">
                   Laundry/Washer/Dryer
              </option>
              <option  class="m-2"value="Pool">
                   Pool
              </option>
              <option  class="m-2"value="Kitchen">
                   Kitchen
              </option>
              <option  class="m-2"value="Damaged">
                   Damaged
              </option>
              <option  class="m-2"value="Other">
                   Other
              </option>

            </select>
        </div>
        <div class="flex w-full justify-center p-5">
        <button class="bg-green-500 rounded-md flex justify-center w-1/4 p-3 m-2 hover:bg-green-300" onClick={()=>{
          if(message==null || message==""){
            alert("Please describe maintenace issue")
          }
          if(mechanism==null || mechanism==""){
            alert("Please describe maintenace issue")
          }else{
            var cDate=new Date()
            var currDate=cDate.toString().substring(0,15)
            axios.post("https://ghanahomestayserver.onrender.com/current-resident/new-maintenance/"+application.application._id,{issue:{mechanism:mechanism,message:message,dateRecieved:currDate}}).then((response)=>{
              console.log(response)
              if(response.data.success){
                alert("Your maintenace issue has been recieved! We will contact you shortly.")
              }
            })

          }
        }}>
          <p class="text-white text-center font-bold">Send</p>
        </button>
        </div>
        
      </div>
      :
      <div></div>
  }
    </div>
  )
}else{
  return(<div></div>)
}
}

export default Maintenance