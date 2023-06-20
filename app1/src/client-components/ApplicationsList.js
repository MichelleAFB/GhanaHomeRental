import React from 'react'
import {useState,useEffect} from 'react'
//outside
import axios from 'axios'

//redux
import {connect}from 'react-redux'
import ApplicationListItem from './ApplicationListItem'
function ApplicationsList({user,userType}) {

  const[isLoading,setIsLoading]=useState(true)
  const[applications,setApplications]=useState()
  const[newApplications,setNewApplications]=useState(false)
  
  useEffect(()=>{

    if(user!=null){
      console.log(user)
    const prom= new Promise((resolve,reject)=>{
      

      axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
        console.log(response.data)
      
        
        if(response.data.success){
         
          setApplications(response.data.applications)
          resolve()
         
        }
        
      })
      
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  }else{
   const checkUser= sessionStorage.getItem("client")
   console.log(checkUser)
  }
  },[newApplications])

 
        
console.log(userType+" "+ isLoading)
console.log(user)

  if(!isLoading && userType!=null){

  return (
    <div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md w-3/4">
    <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl"> Your Applications</p>
    </div>
    
      <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[100vh] p-3 justify-around">
        {
          applications.map((a)=>{
            console.log(a.application)
            console.log(a.application.stay_start_date)
            console.log(a.occupants)
            console.log("\n\n")
            return(<ApplicationListItem key={a.application} application={a}/>)
          })
        }
        
      </div>
    
  </div>
          )
  }else{
    return(
    <div> 
      <p class="text-center">No Applications yet</p>
    </div>)
    }
}

const mapStateToProps = (state, props) => {
  var user= state.user.user;
  var userType=state.user.userType
  if(userType==null || user==null){
    console.log("user is null")
      user=JSON.parse(sessionStorage.getItem("user"))
      userType=JSON.parse(sessionStorage.getItem("userType"))

  }

  return {
    user: user,
    userType: userType,
  };
};

export default connect(mapStateToProps)(ApplicationsList)