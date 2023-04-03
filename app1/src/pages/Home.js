import React from "react";
import "../css/Home.css";

//components
import Banner from "../layout/Banner";
import Card from "../layout/Card";
//admin
import NewApplicationsList from "../admin-components/NewApplicationsList";
import AdminApplicationsList from "../admin-components/ApplicationUpdates/AdminApplicationsList";
//client
import ApplicationsList from "../client-components/ApplicationsList";

//redux
import { connect } from "react-redux";  

// ES7 snippets to do 'rfce'
import {useState,useEffect} from 'react'

function Home({userType,user}) {

  const[isLoading,setIsLoading]=useState(true)

  console.log(userType)
  console.log(user)
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
        console.log("user in home:"+user)
            resolve()
        
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[userType,user])

  console.log(user)
  if(!isLoading ){
    console.log("in home")
    console.log(user)
  return (
    <div className='home'>
      <Banner />

      <div>
        {
          userType=="admin"? 
          <div class="flex "> 
            <NewApplicationsList/>
            <AdminApplicationsList/>
          </div>
          :
          <div>
          </div>
        }
        {
          userType=="client" && user!=null ?
          <div class="flex ">
            <ApplicationsList/>
            
          </div>:
          <div>
          </div>
        }

      </div>
    </div>
  );
}else{
  return  (
    <div className='home'>
      <Banner />

      <div>
        {
          userType=="admin"? 
          <div class="flex flex-col">
            <div class="flex p-5">
              <NewApplicationsList/>
              </div>
              <div class="flex p-5">
                <ApplicationsList/>
              </div>
          </div>
          :
          <div>
          </div>
        }
        {
          userType=="client" && user!=null ?
          <div class="flex">
            <AdminApplicationsList/>
            
          </div>:
          <div>
          </div>
        }

      </div>
    </div>
  )
}}
const mapStateToProps = (state, props) => {
 
  var user= state.user.user;
  var userType=state.user.userType
  if(userType==null || user==null){
    console.log("user is null")
      user=JSON.parse(sessionStorage.getItem("user"))
      console.log(sessionStorage.getItem("client"))
      userType=JSON.parse(sessionStorage.getItem("userType"))

  }

  return {
    user: user,
    userType: userType,
  };
};

export default connect(mapStateToProps)(Home);
