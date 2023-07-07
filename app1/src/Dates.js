import React from 'react'
import {useState,useEffect} from 'react'
//redux
import {connect} from 'react-redux'
import './css/Search.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { useNavigate} from "react-router-dom";
function Dates() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noChildren,setNoChildren]=useState(0)
  const [noAdults,setNoAdults]=useState(2)
  const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    };

  function handleSelect(ranges) {
      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
  }
  console.log(DateRangePicker)
  setTimeout(()=>{
    console.log("range:")
    console.log([selectionRange])
  },3000)
  return (
    <div className='flex w-full'>
     <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  )
}

export default Dates