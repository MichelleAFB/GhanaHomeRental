import React from 'react'
import { useState,useEffect } from 'react'

//outside
import axios from 'axios'
//redux

import { useDispatch,connect } from 'react-redux'
function ReviewModal({visibility,application}) {

  const[isLoading,setIsLoading]=useState(true)
  const[files,setFiles]=useState()
  const[review,setReview]=useState()

  console.log(visibility)
  
  useEffect(()=>{
    if(!visibility && application!=null){
      setIsLoading(false)
    }

  },[visibility])

  if(!isLoading){
  return (
    <div class='bg-gray-200' data-testId="modal-public">
     
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
     
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
        <div class=' bg-white  rounded-xl shadow-lg bg-white dark:border-gray-700 mb-5'>
          <div class='p-4 sm:p-7 flex flex-col'>
            <p class="text-center font-bold">Stay</p>
              <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
         <div class="flex flex-col m-3 p-2">
          <p class="text-center">
            
            You checkout at:{application.application.checkoutTime}
          </p>
          <label class="m-2 text-xl font-semibold">Leave A Review:</label>
          <textarea rows="10" cols="40" class="rounded-md m-2" onClick={(e)=>{
            setReview(e.target.value)
          }}>

          </textarea>
          <input type="file" class="m-2" multiple="multiple" accept="image/jpeg, image/png, image/jpg" onChange={(e)=>{
            setFiles(e.target.files)
          }}/>
              </div>
          </div>
        </div>
      </main>
    </div>
  </div>
    )
  }else{
    return(<div></div>)
  }
}

const mapStateToProps = (state, props) => {
  var visibility= state.user.reviewModalVisibility;
  var application=state.user.reviewModalApplication
  console.log("visibility"+visibility)
  console.log(application)

  return {
   visibility:visibility,
   application:application
  };
};
export default ReviewModal