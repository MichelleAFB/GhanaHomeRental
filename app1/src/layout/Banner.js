import React, { useState } from 'react'
import '../css/Banner.css'
import { Button } from "@material-ui/core";
import Search from '../Search';

import {connect} from 'react-redux'
import { useNavigate } from "react-router-dom";

function Banner({user,userType}) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    
    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search />}

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
          
            
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
export default connect(Banner)(Banner)
