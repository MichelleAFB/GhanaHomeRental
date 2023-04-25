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
import { connect ,useDispatch} from "react-redux";  
import { setActiveApplication,setHasActiveApplication } from "../redux/admin-applications/admin-applications-actions";
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
  const dispatch=useDispatch()
  console.log(userType)
  console.log(user)
  console.log("user")
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
        axios.get("http://localhost:3012/admin-applications/new-applications").then((response)=>{
          console.log(response)
          if(response.data.no_applications>0){
            setNewApplications(true)
            
          }
          resolve()
          axios.get("http://localhost:3012/admin-applications/applications").then((response)=>{
            console.log(response)
            if(response.data.success){
              const apps=response.data.applications
              
              
              apps.map((a)=>{
                axios.get("http://localhost:3012/admin-current-resident/getActiveStatus/"+a.application.id).then((response1)=>{
                  console.log(response1)
                  if(response1.data.success && response1.data.currentlyOccupied){
                    dispatch(setActiveApplication(a))
                    dispatch(true)

                  }
                  
                })
              })
              resolve()
            }
          })
        })
        if(userType=="client"){
          axios.get("http://localhost:3012/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
            console.log("user apps")
            console.log(response)
            const apps=response.data.applications
            apps.map((a)=>{
              axios.get("http://localhost:3012/client-applications/getActiveStatus/"+a.application.id).then((response1)=>{
                console.log("user current")
                console.log(response1)
                resolve()
              })
            })

          })
        }
            
        
    })

    prom.then(()=>{
      
      setIsLoading(false)
    })
  },[userType])

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
