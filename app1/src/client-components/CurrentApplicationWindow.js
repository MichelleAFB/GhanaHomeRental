import React from 'react'
import{useState,useEffect} from 'react'

//outside
import axios from 'axios';
//redux
import { useDispatch,connect,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactFromModule from 'react'
import { setApplication } from '../redux/admin-applications/admin-applications-actions';

function CurrentApplicationWindow() {
  console.log(React === ReactFromModule) 
  
  const navigate=useNavigate()
  const[application,setApplication]=useState()
  
  const[isLoading,setIsLoading]=useState(true)
 
  useEffect(()=>{
   const prom=new Promise((resolve,reject)=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    axios.get("http://localhost:3012/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
      console.log(response)
      if(response.data.applications!=null && response.data.success){
        const apps=response.data.applications
        apps.map((a)=>{
          console.log(a)
          axios.get("http://localhost:3012/current-resident/getActiveStatus/"+a.application.id).then((response1)=>{
            console.log(response1)
            if(response1.data.success && response1.isCurrentlyOccupied){
              setApplication(a)
              resolve()
            }
          })
        })
      }
    })
   })

   prom.then(()=>{
    setIsLoading(false)
   })

  },[])


  if( !isLoading){
   return (
     <div class="w-full flex flex-col m-3 bg-green-500 rounded-md p-3">
      <div class="flex flex-col w-full">
        <p class="text-center text-white font-bold text-xl">Your Stay</p>
      </div>
      <p class="font-bold">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
      <button class="bg-green-700 rounded-md p-3 m-3" onClick={()=>{
        navigate('/your-stay/'+application.application.id)

      }}>
       <p class="text-white">Go to console</p> 
      </button>
     </div>
   )
  }else{
    return(<div>hi</div>)
  }
}
const mapStateToProps = (state, props) => {
  console.log("here")
  var visibility= state.user.isCurrentlyOccupied;
  var application=state.user.currentlyOccupiedApplication
  console.log("visibility"+application)
 
  console.log(state.user)

  return {
   visibility:visibility,
   application:application
  };
};

export default (CurrentApplicationWindow)