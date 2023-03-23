import React, {useState} from 'react';
import './css/Search.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { useNavigate} from "react-router-dom";

// DATE PICKER COMPONENT
function Search() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noChildren,setNoChildren]=useState()
    const [noAdults,setNoAdults]=useState()
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }


    return (
        <div className='search'>
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
            <div class="w-[560px] ">
                <div class="flex flex-col bg-gray-100 w-[560px]  ">
                    
                    <div class="flex p-3 m-2 justify-between">
                        <h2>
                        Number of Adults 
                        </h2>
                        <div class="flex justify-end ml-3">
                        <PeopleIcon />
                        <input min={0} placeholder="2" type="number"  class="justify-end rounded-md w-[25vw] p-2" onChange={(e)=>{
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
                        <input min={0} placeholder="2" type="number"  class="justify-end rounded-md w-[25vw] p-2" onChange={(e)=>{
                        setNoChildren(e.target.value)
                        console.log("noChildren:"+ e.target.value)
                        }} />
                        </div>
                    </div>
                    
                   
                </div>
                <div class="w-full">
                    <Button class="w-[560px] p-3 bg-pink-400 rounded-b-sm hover:bg-pink-200" onClick={() => {
                        
                        const prom=new Promise((resolve,reject)=>{

                            const client=JSON.parse(sessionStorage.getItem("client"))
                            if(client==null){
                                navigate("/pre-application")

                            }else{
                                navigate("/application/"+client.email+"/"+client.firstname+"/"+client.lastname+"/"+client.phone)

                            }
                        })
                        
                        
                        }}><p class="text-md font-bold text-white">Continue</p></Button>
                </div>
            </div>
           
            
        </div>
    )
}

export default Search
