import React from 'react'
import { useEffect,useState } from 'react'


//outside
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel';
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
      axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-reviews").then((response)=>{
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
        axios.get("https://ghanahomestayserver.onrender.com/admin-applications/applications").then((response)=>{
          console.log(response)
          if(response.data.success){
            //setApplications(response.data.applications)
            var index=0
            console.log(response.data)
            arr.map((r)=>{
              console.log(r)
              response.data.applications.map((a)=>{
                console.log(a)
                if(a.application._id==r.application_id){
                  console.log("match")
                  arr[index].application=a;
                  console.log(arr)
                 
                  index++
                }
              })
            })
          } 
        })
        setTimeout(()=>{
          resolve1(arr)
        },1000)
       
    })

    prom1.then((arr)=>{
       const prom2=new Promise((resolve2,reject2)=>{
          setApplications(arr)
         setTimeout(()=>{ 
          resolve2()
         },500) 
       })

       prom2.then(()=>{
        setIsLoading(false)
       })
    })
  })

  },[])


  if(!isLoading && applications!=null){
  return (
    
    <div class="flex h-full">
      <div class="flex flex-col ">
        <div class="flex flex-col   p-5 bg-gray-400">
       <div class="p-10">
        <Carousel autoPlay showThumbs={true} thumbWidth={200} >
          {
            applications.map((a)=>{
                return(<Review application={a}/>)
            })
          }
          </Carousel>
          </div>
         
        </div>
      </div>
     </div>
  )
  }else{
    return(<div></div>)
  }
}

export default Reviews