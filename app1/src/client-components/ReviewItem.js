import React from 'react'

//redux
import { useDispatch } from 'react-redux'
import { setReviewModalApplication,setReviewModalVisibility } from '../redux/user/user-actions'
function ReviewItem({application}) {

  const dispatch=useDispatch()
  console.log(application)
  return (
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
  )
}

export default ReviewItem