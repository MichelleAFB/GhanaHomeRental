import React from 'react'
import {useState,useEffect} from 'react'

//css
import "../css/ApplicationList.css"
//outside
import axios from 'axios'
import NewApplicationListItem from './NewApplicationListItem'

//redux
import {connect,useDispatch} from 'react-redux'
import { setTotalNewApplications } from '../redux/admin-applications/admin-applications-actions'
function NewApplicationsList({totalNewApplications}) {

  const[isLoading,setIsLoading]=useState(true)
  const[applications,setApplications]=useState()
  const [searchPaid,setSearchPaid]=useState(false)
  const[searchApplied,setSearchApplied]=useState(false)

  const dispatch=useDispatch()
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
        axios.get("https://ghanahomerental.herokuapp.com/admin-applications/new-applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            setApplications(response.data.applications)
            if(response.data.applications.length>0){
               dispatch(setTotalNewApplications(response.data.applications.length))
            }
          }
          resolve()
        })

    })

    prom.then(()=>{
        setIsLoading(false)
    })
  },[totalNewApplications]) 

  if(!isLoading && applications!=null && totalNewApplications!=0 && !searchPaid && !searchApplied){ 
     return(
<div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
  <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl"> New Applications</p>
  </div>
   <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
      placeholder="Search..."/>
   
  
    <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[60vh] p-3 justify-around">
   {
            applications.map((e) => {
                return(<NewApplicationListItem application={e}/>)
              })
          }
      
    </div>
</div>      
)
}if(!isLoading && (applications==null || totalNewApplications==0)){
  console.log("no Applications")
  return( 
    <div class="flex flex-col w-full p-4 bg-gray-400 m-5 rounded-md">
  <div class="m-3 flex w-full justify-center"><p class="text-center text-white text-2xl"> No  Applications</p>
    </div>
   <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
      placeholder="Search..."/>
      </div>
      
  )
  }else{
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
}

const mapStateToProps = (state, props) => {
  var totalNewApplications= state.adminApplications.totalNewApplications;

  return {
   totalNewApplciations:totalNewApplications
  };
};

export default connect(mapStateToProps)(NewApplicationsList)
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