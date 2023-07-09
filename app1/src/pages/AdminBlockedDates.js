import React, { useState } from 'react'
import '../css/Banner.css'
import { Button } from "@material-ui/core";
import Search from '../Search';

import {connect} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';

import ErrorBoundary from '../utils/ErrorBoundary';
import Dates from '../Dates';

function AdminBlockedDates({user,userType}) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const[isLoading,setIsLoading]=useState(true)

   

    return (
        <div class='flex w-full justify-center min-h-screen align-center '>
          
                <Dates/>

         
        </div>
    ) 
   
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
export default connect(mapStateToProps)(AdminBlockedDates)
