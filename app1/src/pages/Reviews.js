import React from 'react'
import { useEffect,useState } from 'react'


//outside
import axios from 'axios'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';


//components
import Review from '../client-components/Review'

function Reviews() {


  const[isLoading,setIsLoading]=useState(true)
  const[reviews,setReviews]=useState()
  const [applications,setApplications]=useState()

  useEffect(()=>{


    var arr
    const arr2=[]
    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/client-applications/get-all-reviews").then((response)=>{
      console.log(response)
      if(response.data.success){
          setReviews(response.data.reviews)
          arr=response.data.reviews
      }
      resolve()
      })
    })

    prom.then(()=>{
      console.log(arr)
      const prom1=new Promise((resolve1,reject1)=>{
        axios.get("http://localhost:3012/admin-applications/applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            //setApplications(response.data.applications)
            var index=0
            arr.map((r)=>{
              console.log(r)
              response.data.applications.map((a)=>{
                if(a.application.id==r.application_id){
                  console.log("match")
                  arr[index].application=a;
                 
                  index++
                }
              })
            })
          } 
        })
        setTimeout(()=>{
          resolve1(arr)
        },800)
       
    })

    prom1.then((arr)=>{
       const prom2=new Promise((resolve2,reject2)=>{
          setApplications(arr)
          resolve2()
       })

       prom2.then(()=>{
        setIsLoading(false)
       })
    })
  })

  },[])


  if(!isLoading && applications!=null){
  return (
    
  
      <div class="flex flex-col">
        <div class="flex flex-col bg-gray-300 rounded-md m-5">
          
        <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[100vh] p-3 justify-around">
          {
            applications.map((a)=>{
                return(<Review application={a}/>)
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