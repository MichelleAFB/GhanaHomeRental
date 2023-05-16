import React from 'react'
import {useState,useEffect} from 'react'

//outside
import axios from 'axios'
import GuestItem from './GuestItem'
import RestrictedIndividualsitem from './RestrictedIndividualsitem'
function Guests({application}) {



  const[isLoading,setIsLoading]=useState(true)
  const[guests,setGuests]=useState()

  console.log(application)
  
  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      axios.get("https://ghanahomerental.herokuapp.com/current-resident/guests/"+application.application.id).then((response)=>{
        console.log(response.data)
        setGuests(response.data.guests)
        
      })
      
      resolve()

    })

    prom.then(()=>{
        setIsLoading(false)
    })

  },[])

  
  if(!isLoading){
    console.log(application)

    application.occupants.map((o)=>{
      console.log(o.association)
    })
  return (
    <div class="flex flex-col p-3 bg-gray-200 rounded-md w-full min-h-screen ">
      <p class="text-xl text-center">Manage Guests and Restricted Individuals </p>
      <p class="text-center">For our long term residents(2 weeks or more) We ask that for visits who visit the property regulary (more than 2 times a week) be registered under 'guest status'.</p>
      <p class="text-center">We value your safety, so if there are people you wish for security to hyper vigilante of near the property, please list them as a restricted person. You may upload an image of the person so security can easily identify them.</p>
       {
         application.occupants.map((o)=>{
          console.log(o.firstname)
          return(
            <GuestItem occupant={o}/>
          )
        })
       }
        
        
    </div>
  )
  }else{
    return(<div></div>)
  }
}

export default Guests
