import React from 'react'
import{useState,useEffect} from 'react'
//redux
import { useDispatch,connect,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminCurrentApplicationWindow({visibility,application}) {

  const navigate=useNavigate()
  console.log("HELLLLLLO"+ visibility)
  console.log(application) 
  const[isLoading,setIsLoading]=useState(true)
  const visstate=useSelector(state=> state.user.isCurrentlyOccupied)
  console.log("isitate:"+visstate)
  
  useEffect(()=>{
    if(application!=null){
      setIsLoading(false)
    }

  },[application])
console.log(visibility)
  if( !isLoading){
   return (
     <div class="w-full flex flex-col m-3 bg-green-500 rounded-md p-3">
      <div class="flex flex-col w-full">
        <p class="text-center text-white font-bold text-xl">Your Stay</p>
      </div>
      <button class="bg-green-700 rounded-md p-3" onClick={()=>{
        navigate('/admin-your-stay/'+application.application.id)

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
  var visibility= state.adminApplications.isCurrentlyOccupied;
  var application=state.adminApplications.activeApplication
  
  console.log("visibility"+application)
 
  console.log(state.user)

  return {
   visibility:visibility,
   application:application
  };
};

export default connect(mapStateToProps)(AdminCurrentApplicationWindow)