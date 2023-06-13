import React from 'react'

//redux
import { useDispatch } from 'react-redux'
import { setReviewModalApplication,setReviewModalVisibility } from '../redux/user/user-actions'
import { useEffect,useState } from 'react'
function ReviewItem({application}) {

  const dispatch=useDispatch()
  console.log(application.application)
  const[show,setShow]=useState(false)
  

  useEffect(()=>{
    if(application.review!=null){

    }
  })
  if(application.application.review==null || application.application.review=="" || application.application.length==0){
  return (
    <div class="flex h-full">
    <div class="flex flex-col bg-gray-200 rounded-md p-3 m-3">
      <p class="text-center font-bold">Your Stay</p>
      <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
     
      <button class="bg-purple-400 rounded-md p-3" onClick={()=>{
        const prom=new Promise((resolve,reject)=>{
          dispatch(setReviewModalApplication(application))
          setTimeout(()=>{
            resolve()
          },400)
        })

        prom.then(()=>{
          dispatch(setReviewModalVisibility(true))
        })
      }}>
        <p class="text-white font-bold">Review</p>
      </button>
      </div>
    </div>
  )
    }if(application.application.review!="" || application.application.review.length!=0 || application.application.review!=null){
      <div class="flex h-full">
      <div class="flex flex-col bg-gray-200 rounded-md p-3 m-3">
        <p class="text-center font-bold">Your Stay</p>
        <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
        {
          show?
          <p>{application.application.review}</p>:
          <p>{application.application.review.substring(0,15)}</p>
        }
        <button class="bg-purple-700 rounded-md p-3" onClick={()=>{
          const prom=new Promise((resolve,reject)=>{
           
          })
  
          prom.then(()=>{
            dispatch(setReviewModalVisibility(true))
          })
        }}>
          <p class="text-white font-bold">Review</p>
        </button>
        </div>
      </div>
    }
    else{
      return(<div></div>)
    }
}

export default ReviewItem