import React from "react";
import "../css/Home.css";

//components
import Banner from "../layout/Banner";
import Card from "../layout/Card";
//admin
import NewApplicationsList from "../admin-components/NewApplicationsList";
//client
import ApplicationsList from "../client-components/ApplicationsList";

//redux
import { connect } from "react-redux";  

// ES7 snippets to do 'rfce'
import {useState,useEffect} from 'react'

function Home({userType,user}) {

  const[isLoading,setIsLoading]=useState(true)

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{

    })

    prom.then(()=>{

    })
  },[userType])

  return (
    <div className='home'>
      <Banner />

      <div>
        {
          userType=="admin"? 
          <div class="flex">
            <NewApplicationsList/>
          </div>
          :
          <div>
            <ApplicationsList/>
          </div>
        }

      </div>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  const user= state.user.user;
  const userType=state.user.userType

  return {
    user: user,
    userType: userType,
  };
};

export default connect(mapStateToProps)(Home);
