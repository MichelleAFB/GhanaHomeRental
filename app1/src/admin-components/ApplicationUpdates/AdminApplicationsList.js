import React from 'react'
import {useState,useEffect} from 'react'

//css
import "../../css/ApplicationList.css"
//outside
import axios from 'axios'
import AdminApplicationListItem from './AdminApplicationListItem'

//redux
import {connect,useDispatch} from 'react-redux'
import { setTotalNewApplications } from '../../redux/admin-applications/admin-applications-actions'
import { setActiveApplication,setHasActiveApplication } from '../../redux/admin-applications/admin-applications-actions'

function AdminApplicationsList({totalNewApplications}) {

  const[isLoading,setIsLoading]=useState(true)
  const[applications,setApplications]=useState()
  const[searchPaid,setSearchPaid]=useState(false) 
  const[searchApplied,setSearchApplied]=useState(false)
  

  const[active,setActive]=useState()
  const dispatch=useDispatch()
  useEffect(()=>{
    var apps
    
    const prom=new Promise((resolve,reject)=>{
        axios.get("https://ghanahomestayserver.onrender.com/admin-applications/applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            setApplications(response.data.applications)
            apps=response.data.applications
          const storageApps=JSON.parse(sessionStorage.getItem("applications"))
          if(storageApps==null){
            sessionStorage.setItem("applications",JSON.stringify(response.data.applications))
          }
            
            if(response.data.applications.length>0){
               dispatch(setTotalNewApplications(response.data.applications.length))
            }
          }
          
        }).then(()=>{
          console.log("after prom")
          resolve(apps)
        })

    })

    prom.then((apps)=>{
        var hasActive=false
        console.log("apps")
        console.log(apps)
        console.log(applications)
        const prom1=new Promise((resolve1,reject1)=>{
          apps.map((a)=>{
            console.log(a)
            axios.get("https://ghanahomestayserver.onrender.com/admin-current-resident/getActiveStatus/"+a.application._id).then((response1)=>{
              console.log("response1")
              console.log(response1)
              if(response1.data.success==false){
                reject1()
              }
              if(response1.data.success &&response1.data.currentlyOccupied==true){
                console.log("occupied:"+response1.data.currentlyOccupied)
                dispatch(setActiveApplication(a))
                hasActive=true
                setActive(a)
                dispatch(setHasActiveApplication(true))
              } 
            })
            setTimeout(()=>{
                resolve1()
            },800)
          })

        })

        prom1.then((hasActive)=>{
          console.log("hasActive:"+hasActive)
          if(active==null){
            console.log("no active app") 
          }
          console.log(active)
          
          setIsLoading(false)
        })
      
    })
  },[]) 

  console.log(isLoading)

  if(!isLoading && applications!=null && !searchPaid && !searchApplied){ 
     return(
<div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md w-3/4">
  <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl">  Applications</p>
  </div>
   <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
      placeholder="Search..."/>
      <div class="flex justify-around p-2">
      <button class={searchPaid ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
      setSearchPaid(!searchPaid)
      setSearchApplied(false)
    }} >Paid</button>
    <button class={searchPaid ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
      setSearchApplied(!searchApplied)
      setSearchPaid(false)
    }} >Applied</button>
      </div>
       
  
    <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[60vh] p-3 justify-around">
   {
            applications.map((e) => {
              console.log(applications)
                return(<AdminApplicationListItem application={e}/>)
              })
          }
      
    </div>
</div>      
)
}  if(!isLoading && applications!=null && searchPaid && !searchApplied){ 
  return(
<div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
<div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl">  Applications</p>
</div>
<input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
   placeholder="Search..."/>
   <div class="flex justify-around p-2">
   <button class={searchPaid ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
   setSearchPaid(!searchPaid)
   setSearchApplied(false)
 }} >Paid</button>
 <button class={searchApplied ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
   setSearchApplied(!searchApplied)
   setSearchPaid(false)
 }} >Applied</button>
   </div>
    

 <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[60vh] p-3 justify-around">
{
         applications.map((e) => {
          console.log(e.application.application_status)
          if(e.application.application_status=="PAYED") 
             return(<AdminApplicationListItem application={e}/>)
           })
       }
   
 </div>
</div>      
)
}
if(!isLoading && applications!=null  && !searchPaid && searchApplied){ 
  return(
<div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
<div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl">  Applications</p>
</div>
<input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
   placeholder="Search..."/>
   <div class="flex justify-around p-2">
   <button class={searchPaid ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
   setSearchPaid(!searchPaid)
   setSearchApplied(false)
 }} >Paid</button>
 <button class={searchApplied ? "bg-green-400 p-2 rounded-md":"bg-white border-gray-300 border-2 p-2 rounded-md"} onClick={()=>{
   setSearchApplied(!searchApplied)
   setSearchPaid(false)
 }} >Applied</button>
   </div>
    

 <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[60vh] p-3 justify-around">
{
         applications.map((e) => {
          console.log(e.application.application_status)
          if(e.application.application_status=="APPLIED") 
             return(<AdminApplicationListItem application={e}/>)
           })
       }
   
 </div>
</div>      
)
}


if(!isLoading && (applications==null || totalNewApplications==0)){
  console.log("no Applications")
  return( 
    <div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
  <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl"> No  Applications</p>
    </div>
   <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
      placeholder="Search..."/>
      </div>
      
  )
  }
  else{
    return(<div></div>)
  }
}

const mapStateToProps = (state, props) => {
  var totalNewApplications= state.adminApplications.totalNewApplications;

  return {
   totalNewApplciations:totalNewApplications
  };
};

export default connect(mapStateToProps)(AdminApplicationsList)
/*
   if(!isLoading){ return(<div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
    <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl"> Your Applications</p>
    </div>
     <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
        placeholder="Search..."/>
    
      <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[100vh] p-3 justify-around">
     {
              applications.map((e) => {
                  return(<NewApplicationListItem application={e}/>)
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
*/