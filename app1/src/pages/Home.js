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
import ApplicationModal from "../admin-components/modals/ApplicationModal";

//outside
import axios from "axios";
import CurrentApplicationWindow from "../client-components/CurrentApplicationWindow";
import Appwindow from "../client-components/Appwindow";
import AdminCurrentApplicationWindow from "../admin-components/AdminCurrentApplicationWindow";
function Home({userType,user,activeApplication}) {

  const[isLoading,setIsLoading]=useState(true)
  const [newApplications,setNewApplications]=useState(false)

  console.log(userType)
  console.log(user)
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
        axios.get("http://localhost:3012/admin-applications/new-applications").then((response)=>{
          console.log(response)
          if(response.data.no_applications>0){
            setNewApplications(true)
            
          }
        })
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
          <div class="flex flex-col"> 
          {
            activeApplication!=null?
            <AdminCurrentApplicationWindow/>
            :
            <div></div>
          }
          <div class="flex">
              {newApplications?
              <NewApplicationsList/>:<div></div>}
              <AdminApplicationsList/>
            </div>
          </div>
          :
          <div>
          </div>
        }
        {
          userType=="client" && user!=null ?
          <div class="flex flex-col p-5 ">
             <CurrentApplicationWindow/>
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
      <CurrentApplicationWindow/>
      <div>
        {
          userType=="admin"? 
          <div class="flex flex-col ">
            <div class="flex p-5">
              <NewApplicationsList/>
              </div>
              <div class="flex p-5 bg-green-300 rounded-md ">
                <ApplicationsList/>
              </div>
          </div>
          :
          <div>
          </div>
        }
        {
          userType=="client" && user!=null ?
          <div class="flex flex-col">
            <Appwindow/>
            <CurrentApplicationWindow/>
            <ApplicationsList/>
            
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
  var activeApplication=state.adminApplications.activeApplication
  if(userType==null || user==null){
    console.log("user is null")
      user=JSON.parse(sessionStorage.getItem("user"))
      console.log(sessionStorage.getItem("client"))
      userType=JSON.parse(sessionStorage.getItem("userType"))

  }

  return {
    user: user,
    userType: userType,
    activeApplication:activeApplication
  };
};

export default connect(mapStateToProps)(Home);
