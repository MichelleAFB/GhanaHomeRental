import React from 'react'
import { useEffect,useState } from 'react'

//outside
import axios from 'axios'
import ReviewItem from './ReviewItem'
function ReviewWindow() {

  const[isLoading,setIsLoading]=useState(true)
  const [applications,setApplications]=useState()

  useEffect(()=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    const app=[]
    const prom=new Promise((resolve,reject)=>{
      axios.get("https://ghanahomerental.herokuapp.com/client-applications/get-all-applications/"+user.firstname+"/"+user.lastname+"/"+user.email).then((response)=>{
        console.log(response)
        if(response.data.success && response.data.applications!=null){
          const apps=response.data.applications
          apps.map((a)=>{
            console.log("review:"+a.application.review)
            console.log( a.application.application_status=="CHECKEDOUT")
            if( a.application.application_status=="CHECKEDOUT"&& a.application.review==null ){
              console.log(a)
                app.push(a)
                console.log(app)
            }
          })
          setTimeout(()=>{
            console.log(app)
            resolve(app)
          },1000)  
       
        }
      })
    })

    prom.then((app)=>{
      console.log("got apps")
      console.log(app)
      setApplications(app)
      if(app.length>0){
        setIsLoading(false)
      }
     
    })
  },[])

if(!isLoading){
  return (
    <div class="flex flex-col w-full bg-purple-400 rounded-md m-3 p-3 ">
      <p class="text-2xl text-center font-bold text-white">Tell Us About Your Stay</p>
    <div class=" overflow-y-scroll overflow-hidden w-full flex-col content-center h-[40vh] p-3 justify-around">
      {
        applications.map((a)=>{ 
          return(<ReviewItem application={a}/>)
        })
      }
      </div>
    </div>
   )
  }else{
    return(<div></div>)
  }
}

export default ReviewWindow