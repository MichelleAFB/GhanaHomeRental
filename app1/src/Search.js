import React, {useState} from 'react';

//redux
import {connect} from 'react-redux'
import './css/Search.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { useNavigate} from "react-router-dom";

// DATE PICKER COMPONENT
function Search({userType,user}) {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noChildren,setNoChildren]=useState(2)
    const [noAdults,setNoAdults]=useState(0)
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    console.log(startDate)
    return (
        <div className='search z-20'>
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
            <div class="w-[560px] z-20 ">
                <div class="flex flex-col bg-gray-100 w-[560px]  ">
                    
                    <div class="flex p-3 m-2 justify-between">
                        <h2>
                        Number of Adults 
                        </h2>
                        <div class="flex justify-end ml-3">
                        <PeopleIcon />
                        <input min={1} max={6} default={2} placeholder="2" type="number"  class="justify-end rounded-md w-[25vw] p-2" onChange={(e)=>{
                        setNoAdults(e.target.value)
                        console.log("noAdults:"+ e.target.value)
                        }} />
                        </div>
                    </div>
                   
                    <div class="flex p-3 m-2 justify-between">
                        <h2>
                        Number of Children 
                        </h2>
                        <div class="flex justify-end ml-3">
                        <PeopleIcon />
                        <input min={0} max={5} default={0} placeholder="2" type="number"  class="justify-end rounded-md w-[25vw] p-2" onChange={(e)=>{
                        setNoChildren(e.target.value)
                        console.log("noChildren:"+ e.target.value)
                        }} />
                        </div>
                    </div>
                    
                   
                </div>
                <div class="w-full">
                    <Button class="w-[560px] p-3 bg-pink-400 rounded-b-sm hover:bg-pink-200" onClick={() => {
                        
                        const prom=new Promise((resolve,reject)=>{
                            
                            console.log(user)
                            const client=JSON.parse(sessionStorage.getItem("client"))
                            if(user==null || userType==""){

                                if(startDate==null){
                                    alert("ERROR: Please select a start date for your stay")
                                }
                                if(endDate==null){
                                    alert("ERROR: Please select and end date for your stay")
                                }else{
                                    navigate("/pre-application/"+startDate+"/"+endDate+"/"+noAdults+"/"+noChildren)
                                }
                             

                            }else{

                                if(startDate==null){
                                    alert("ERROR: Please select a start date for your stay")
                                }
                                if(endDate==null){
                                    alert("ERROR: Please select and end date for your stay")
                                }else{
                                navigate("/application/"+user.email+"/"+user.firstname+"/"+user.lastname+"/"+user.phone+"/"+startDate+"/"+endDate+"/"+noAdults+"/"+noChildren)
                                }
                            }
                        }) 
                        
                        
                        }}><p class="text-md font-bold text-white">Continue</p></Button>
                </div>
            </div>
           
            
        </div>
    )
}

const mapStateToProps = (state, props) => {
    var user= state.user.user; 
    var userType=state.user.userType
    if(userType==null || user==null){
        user=JSON.parse(sessionStorage.getItem("user"))
        userType=JSON.parse(sessionStorage.getItem("userType"))

    }
    return {
      user: user,
      userType: userType,
    };
  };


export default connect(mapStateToProps)(Search)
