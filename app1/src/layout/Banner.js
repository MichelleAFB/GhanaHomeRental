import React, { useState } from 'react'
import '../css/Banner.css'
import { Button } from "@material-ui/core";
import Search from '../Search';

import {connect} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import{house} from '../home_photos/Entry & Egress 2.jpg'
import{bedroom2} from '../home_photos/Bedroom 2.jpg'

function Banner({user,userType}) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        
        const prom=new Promise((resolve,reject)=>{
            resolve()
        })

        prom.then(()=>{
            setIsLoading(false)
        })

    },[])
    
    if(!isLoading){
    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search />}
                <img src='../home_photos/Entry & Egress 2.jpg' alt="house"/>
                <img src='../home_photos/Bedroom Chair.png' alt="house"/>

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
          
            
        </div>
    ) 
    }else{
        return(<div></div>)
    }
}

const mapStateToProps = (state, props) => {
    var user= state.user.user;
    var userType=state.user.userType
    if(userType==null || user==null){
        user=JSON.parse(sessionStorage.getItem("user"))
        console.log(sessionStorage.getItem("client"))
        userType=JSON.parse(sessionStorage.getItem("userType"))

    }if(JSON.parse(sessionStorage.getItem("user"))==null){
        user=null
    }
 
    return {
      user: user,
      userType: userType,
    };
  };
export default connect(mapStateToProps)(Banner)
