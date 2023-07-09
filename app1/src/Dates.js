import React from 'react'
import {useState,useEffect} from 'react'
//redux
import {connect} from 'react-redux'
import './css/Search.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css" ; // theme css file
import { DateRangePicker } from "react-date-range";
import {useRef}from 'react'


import axios from 'axios'

function Dates() {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const[isLoading,setIsLoading]=useState(true)
  const [blockedDates,setBlockedDates]=useState()
  const[added,setAdded]=useState()
  const addedRef=useRef()
  const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    };

  function handleSelect(ranges) {
      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
      console.log(selectionRange)
  }

  
  useEffect(()=>{ 
    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/admin-applications/blocked-dates").then((response)=>{
        console.log(response)
        if(response.data.success){
          if(response.data.length>0){
          setBlockedDates(response.data.blocked_dates)
          }
        }else{
          resolve()
        }
        setTimeout(()=>{
          resolve()
        },500) 
      })

    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[])


  function onRenderDayCell(args) {
    console.log(args)
    if (blockedDates.includes(args.date.getDay()) ) {
        // sets isDisabled to true to disable the date.
        args.isDisabled = true;
        // To know about the disabled date customization, you can refer in "styles.css".
    }
}
 
  if(!isLoading){
    console.log(blockedDates)
    const highlightWithRanges =[
      {"react-datepicker__day--highlighted-custom-2":blockedDates}
    ]
    console.log("added:")
    console.log(addedRef)
  return (
    <div className='flex  w-full justify-center h-screen'>
     <div class=" flex flex-col jusitfy-center w-full">
      <div class="flex h-1/4 p-3 w-fu5l"></div>
        <div class="flex justify-center p-10">
          
      {
        blockedDates!=null?
        <div class=" flex-col  w-1/4">
        <p class="text-lg font-bold text-underlined">
          Blocked Dates
        </p>
        {
          blockedDates.map((d)=>{
          
            var date=new Date(d)
            return(<p>{date.toString().substring(0,15)}</p>)
          })
        }
        <div class="flex-col">
      
        </div>
      </div>
      :
      <div>
      </div>
      }
      {
        added!=null?
        <div clas="flex-col">
          <p class="text-lg">Added</p>
          <form ref={addedRef}>
        <input class="flex-col" name="added" value={added}onChange={()=>{
          added.map((a)=>{
            return(<p>{a.day}</p>)
          })
       }}/>
       </form>
        </div>
        :
        <div>
        </div>
      }
      {
        blockedDates!=null>0?
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} excludeDates={ blockedDates} />
        :
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}  />

      }
      
      </div>
      <button class="bg-green-700 rounded-md p-3" onClick={()=>{
        console.log(selectionRange)
        const prom=new Promise((resolve,reject)=>{
          
         axios.post("http://localhost:3012/admin-applications/blocked-dates",{start:selectionRange.startDate.toString(),end:selectionRange.endDate.toString()}).then((response)=>{
            console.log(response)
            if(response.data.success && response.data.length>0){
              const promise=new Promise((resolve,reject)=>{
                if(blockedDates!=null){
                  setBlockedDates(blockedDates=> blockedDates.concat([...response.data.blocked_dates]))
                  }else{
                    setBlockedDates(response.data.booked_dates)
                  }
                
                  setTimeout(()=>{
                    resolve()
                  },500)
              })

              promise.then(()=>{
                alert("who have blocked off "+response.data.length+" dates")
              })
            
            }
            
          })
          
        })
      }}>
          <p class="text-white font-semibold">
            Submit
          </p>
      </button>
      </div>
    </div>
  )
  }else{
    return(   
      <div class="flex w-full justify-center">
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      </div>
    )
  }
}

export default Dates