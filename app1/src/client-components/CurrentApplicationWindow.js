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
    var app
   const prom=new Promise((resolve,reject)=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
      console.log(response)
      if(response.data.applications!=null && response.data.success){
        const apps=response.data.applications
        apps.map((a)=>{
          console.log(a.application)
          axios.get("https://ghanahomestayserver.onrender.com/client-applications/getActiveStatus/"+a.application._id).then((response1)=>{
            console.log(response1)
            if(response1.data.success && response1.data.currentlyOccupied){
              setApplication(a)
              console.log("found")
              app=a
              setTimeout(()=>{
                resolve(a)
              },500)
            
            }
            
          })
        })
      }
    })
   })

   prom.then(()=>{
    console.log(app)
    console.log(app)
    const prom1=new Promise((resolve1,reject1)=>{
      setApplication(app)
      setTimeout(()=>{
          resolve1()
      },400)
    })

    prom1.then(()=>{
      setIsLoading(false)
    })
    
   })

  },[])

  console.log(isLoading)
  if( !isLoading ){
   return (
     <div class="w-9/10 flex flex-col m-3 bg-green-500 rounded-md p-3">
      <div class="flex flex-col w-full">
        <p class="text-center text-white font-bold text-xl">Your Stay</p>
      </div>
      <p class="font-bold text-center mt-5">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
      <button class="bg-green-700 rounded-md p-3 m-3" onClick={()=>{
        navigate('/your-stay/'+application.application._id)

      }}>
       <p class="text-white">Go to console</p> 
      </button>
     </div>
   )
  }else{
    return(<div></div>)
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