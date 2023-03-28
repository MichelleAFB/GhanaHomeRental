import React from 'react'
import {useState,useEffect} from 'react'

//outside
import axios from 'axios'
function NewApplicationsList() {

  const[isLoading,setIsLoading]=useState(true)
  const[applications,setApplications]=useState()
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
        axios.get("http://localhost:3012/admin-applications/new-applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            setApplications(response.data.applications)
            resolve()
          }
        })

    })

    prom.then(()=>{
        setIsLoading(false)
    })
  },[])

  if(!isLoading){
    return (
      <div>NewApplicationsList
        {applications.map((a)=>{
          return (<p>{a.firstname}</p>)
        })}
      </div>
      )
  }else{
    return(<div></div>)
  }
}

export default NewApplicationsList