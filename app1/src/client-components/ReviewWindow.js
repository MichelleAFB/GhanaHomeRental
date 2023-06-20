import React from 'react'
import { useEffect,useState } from 'react'

//outside
import axios from 'axios'
import ReviewItem from './ReviewItem'
function ReviewWindow() {

  const[isLoading,setIsLoading]=useState(true)
  const [applications,setApplications]=useState()
  const [hasEmptyReviews,setHasEmptyReviews]=useState(false)
  const[allApplications,setAllApplications]=useState()

  useEffect(()=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    const app=[]
    var emptyReviews=false
    const prom=new Promise((resolve,reject)=>{
      axios.get("https://ghanahomestayserver.onrender.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
        console.log(response)
        if(response.data.success && response.data.applications!=null){
          const apps=response.data.applications
          setAllApplications(apps)
          apps.map((a)=>{
            console.log(a.application.review)
            console.log("review")
            if( a.application.application_status=="CHECKEDOUT" ){
              console.log(a)
              if(a.application.review=="" && a.application.review==''){
                app.push(a)
                console.log(app)
                console.log(a)
                resolve(app)
                console.log(app)
              }                 
            }
          })
          setTimeout(()=>{
            resolve()
          },500)
         
       
        }
      })
    })
 
    prom.then((app)=>{ 
      console.log("got apps")
      console.log(app)
      setApplications(app)
    const prom1=new Promise((resolve1,reject1)=>{
      setApplications(app)
      setTimeout(()=>{
        resolve1()
      },300)
    })

    prom.then(()=>{
      setIsLoading(false)
    })
      
    })
  },[])


if(!isLoading && applications!=null){
  console.log(applications) 

  return (
    <div class="flex flex-col w-full bg-purple-400 rounded-md m-3 p-3 ">
      <p class="text-2xl text-center font-bold text-white">Tell Us About Your Stay</p>
    <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[40vh] p-3 justify-around">
      {
        allApplications.map((a)=>{ 
          return(<ReviewItem application={a}/>)
        })
      }
      </div>
    </div>
   )
  }else{
    console.log(applications)
    return(<div></div>)
  }
}

export default ReviewWindow