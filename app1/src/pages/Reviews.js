import React from 'react'
import { useEffect,useState } from 'react'


//outside
import axios from 'axios'
import Review from '../client-components/Review'

function Reviews() {


  const[isLoading,setIsLoading]=useState(true)
  const[reviews,setReviews]=useState()
  const [applications,setApplications]=useState()

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/client-applications/get-all-reviews").then((response)=>{
      console.log(response)
      if(response.data.success){
          setReviews(response.data.reviews)
      }
      resolve()
      })
    })

    prom.then(()=>{

      const prom1=new Promise((resolve1,reject1)=>{
        axios.get("http://localhost:3012/admin-applications/applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            setApplications(response.data.applications)
          }
        })
        resolve1()
    })

    prom1.then(()=>{
      setIsLoading(false)
    })
  })

  },[])


  if(!isLoading && applications!=null){
  return (
    
    <div className='home'>
      <div class="flex flex-col">
        <div class="flex">
     
          {
            applications.map((a)=>{
              reviews.map((r)=>{
               
                if(r.application_id==a.application.id){
                  console.log("r:"+r.application_id)
                  console.log("a:"+a.application.id)
                  
                    return(
                    <div class="bg-green-300 p-3 m-3">

                    </div>)
                }
              })

            })
          }
         
        </div>
      </div>
    </div>
  )
  }else{
    return(<div></div>)
  }
}

export default Reviews