import React from 'react'
import {useState,useEffect} from 'react'
//outside
import axios from 'axios'

//redux
import {connect}from 'react-redux'
function ApplicationsList({user,userType}) {

  const[isLoading,setIsLoading]=useState(true)
  const[applications,setApplications]=useState()

  useEffect(()=>{

    const prom= new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/client-applications/get-all-applications",{firstname:user.firstname,lastname:user.lastname,email:user.email}).then((response)=>{
        console.log(response)
        if(response.data.success){
          setApplications(response.data.applications)
        }
        resolve()
      })
      
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[])

  if(!isLoading){
  return (
    <div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
    <div class="m-3 flex w-full justify-center"><p class="text-center text-white"> New Applications</p>
    </div>
    
      <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[250px] p-3 justify-around">
        {applications.map((a)=>{
          return (
            <p>{a.firstname}</p>
              )
         })}
      </div>
    
  </div>
          )
        }
}

const mapStateToProps = (state, props) => {
  const user= state.user.user;
  const userType=state.user.userType

  return {
    user: user,
    userType: userType,
  };
};

export default connect(mapStateToProps)(ApplicationsList)