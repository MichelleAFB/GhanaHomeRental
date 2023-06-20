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

import AdminCurrentApplicationWindow from "../admin-components/AdminCurrentApplicationWindow";
import ReviewWindow from "../client-components/ReviewWindow";
import ReviewModal from "../client-components/ReviewModal";
import { Menu } from "@material-ui/core";
function Home({userType,user,activeApplication}) {

  const[isLoading,setIsLoading]=useState(true)
  const [newApplications,setNewApplications]=useState(false)
  const[newReviews,setNewReviews]=useState()
  const dispatch=useDispatch()
 
  console.log(process.env.REACT_APP_STRIPE_KEY)

  useEffect(()=>{
    const needsReview=[]
    if(user!=null){
      const prom=new Promise((resolve,reject)=>{
          axios.get("https://ghanahomestayserver.onrender.com/admin-applications/new-applications").then((response)=>{
            console.log(response)
            if(response.data.no_applications>0){
              setNewApplications(true)
              
            }
            resolve()
            axios.get("https://ghanahomestayserver.onrender.com/admin-applications/applications").then((response)=>{
              console.log(response)
              if(response.data.success){
                const apps=response.data.applications
                
                
                apps.map((a)=>{
                  axios.get("https://ghanahomestayserver.onrender.com/admin-applications/getActiveStatus/"+a.application._id).then((response1)=>{
                    console.log(response1)
                    if(response1.data.success && response1.data.currentlyOccupied){
                      dispatch(setActiveApplication(a))
                      dispatch(setHasActiveApplication(true))
  
                    }
                    
                  })
                })
              
              
              }
            })
          })
          if(userType=="client"){
            axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
              console.log("user apps")
              console.log(response)
              const apps=response.data.applications
              apps.map((a)=>{
                axios.get("https://ghanahomestayserver.onrender.com/admin-applications/getActiveStatus/"+a.application._id).then((response1)=>{
                  console.log("user current")
                  console.log(response1)
              
                })
                if(a.application_status=="CHECKEDOUT" &&(a.application.review=="" || a.application.review=='' || a.application.review.length==0)){
                  
                  needsReview.push(a)
                }
              })
  
            })
            console.log("MADE IT TO CLIENT")
          }
          setTimeout(()=>{
            resolve()
          },1000)
              
          
      })
  
      prom.then(()=>{
        console.log("MADE IT TO THEN")
        const prom2=new Promise((resolve2,reject2)=>{
          setNewReviews(needsReview)
          
          setTimeout(()=>{
            resolve2()
          },500)
        })

        prom2.then(()=>{
          setIsLoading(false)
        })
       
      })
    }
  
  },[userType])

  console.log(isLoading)
  if(!isLoading && user!=null){
   console.log(newReviews) 
   console.log("|n\n")
  return (
    <div className='home'>
       <ReviewModal/>
  
      <Banner />
     

      <div>
        {
          userType=="admin"? 
          <div class="block mt-[250px] m-5"> 
      
          <div class="flex flex-col m-3">
          <AdminCurrentApplicationWindow/>
          <div class="block">
            <div class="flex">
              {newApplications?
              <NewApplicationsList/>:<div></div>}
              
              <AdminApplicationsList/>
              </div>
            </div>
            </div>
          </div>
          :
          <div></div>
        }
        {
          userType=="client" && user!=null ?
          <div class="block  mt-[250px] m-5">
            <div class="flex flex-col m-3 ">
          
                <CurrentApplicationWindow/>
           <div class="block">
            <div class="flex">
             <ApplicationsList/>
              </div>
            </div>
            </div>
          </div>:
          <div>
          </div>
        }

      </div>
    </div>
  );
}if(user==null){
  console.log("DO not laod")
  return  (
    <div className='home'>
      <Banner />
    
      <div>
      </div>
    </div>
  )
}else{
  return(
  <div className="home">
        <Banner/>
  </div>)
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


/*
   if(user!=null){
    const prom=new Promise((resolve,reject)=>{
        axios.get("https://ghanahomestayserver.onrender.com/admin-applications/new-applications").then((response)=>{
          console.log(response)
          if(response.data.no_applications>0){
            setNewApplications(true)
            
          }
          resolve()
          axios.get("https://ghanahomestayserver.onrender.com/admin-applications/applications").then((response)=>{
            console.log(response)
            if(response.data.success){
              const apps=response.data.applications
              
              
              apps.map((a)=>{
                axios.get("https://ghanahomestayserver.onrender.com/admin-current-resident/getActiveStatus/"+a.application.id).then((response1)=>{
                  console.log(response1)
                  if(response1.data.success && response1.data.currentlyOccupied){
                    dispatch(setActiveApplication(a))
                    dispatch(setHasActiveApplication(true))

                  }
                  
                })
              })
            
            
            }
          })
        })
        if(userType=="client"){
          axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
            console.log("user apps")
            console.log(response)
            const apps=response.data.applications
            apps.map((a)=>{
              axios.get("https://ghanahomestayserver.onrender.com/admin-applications/getActiveStatus/"+a.application.id).then((response1)=>{
                console.log("user current")
                console.log(response1)
            
              })
            })

          })
          console.log("MADE IT TO CLIENT")
        }
        setTimeout(()=>{
          resolve()
        },1000)
            
        
    })

    prom.then(()=>{
      console.log("MADE IT TO THEN")
      setIsLoading(false)
    })
  }



*/