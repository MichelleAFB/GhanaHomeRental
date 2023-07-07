import React from 'react'
import {useState,useEffect} from 'react'
//redux
import {connect} from 'react-redux'
import './css/Search.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css" ; // theme css file
import { DateRangePicker } from "react-date-range";



import axios from 'axios'

function Dates() {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const[isLoading,setIsLoading]=useState(true)
  const [blockedDates,setBlockedDates]=useState()
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
  return (
    <div className='flex  w-full justify-center'>
      <div class=" flex flex-col jusitfy-center w-full">
        <div class="flex justify-center">
      {
        blockedDates!=null>0?
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}  highlightDates={highlightWithRanges}  excludeDates={blockedDates} />

        :
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}  />

      }
      {
        console.log( <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} cssClass="rdrStartEdge" renderDayCell={onRenderDayCell}  excludeDates={[blockedDates]} rangeColors={["#5569ff"]} />)
      }
      </div>
      <button class="bg-green-700 rounded-md p-3" onClick={()=>{
        console.log(selectionRange)
        const prom=new Promise((resolve,reject)=>{
          
         axios.post("http://localhost:3012/admin-applications/blocked-dates",{start:selectionRange.startDate.toString(),end:selectionRange.endDate.toString()}).then((response)=>{
            console.log(response)
            if(response.data.success){
              alert("who have blocked off "+response.data.blocked_dates.length+" dates")
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