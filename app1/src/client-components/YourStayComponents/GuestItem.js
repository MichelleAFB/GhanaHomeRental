import React from 'react'
import {useState,useEffect} from 'react'

//outside
import axios from 'axios'

//assets
import IonIcon from '@reacticons/ionicons'
import GuestTable from './GuestTable'
import RestrictedIndividualsitem from './RestrictedIndividualsitem'
import RestrictedTable from './RestrictedTable'

function GuestItem({occupant}) {

  const[isLoading,setIsLoading]=useState(true)
  const[guests,setGuests]=useState()
  const[show,setShow]=useState(false)
  const[total,setTotal]=useState(5)
  const[restricted,setRestricted]=useState()
  console.log(occupant)
  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/current-resident/guests/"+occupant.application_id+"/"+occupant.id).then((response)=>{
        console.log(response)
        setGuests(response.data.guests)
        axios.get("http://localhost:3012/current-resident/restricted-individuals/"+occupant.application_id+"/"+occupant.id).then((response1)=>{
          console.log("\n\n")
          console.log(response1)
          setRestricted(response1.data.restricted_individuals)
          resolve()
        })
      })
    })

    prom.then(()=>{
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
    console.log(show)
   // console.log(guests.length)
  return (
    <div class="flex flex-col">
       <div class="w-full flex bg-gray-600 m-2 rounded-md p-3">

          <div class="flex w-1/2">
              <p class="text-white">
                 {occupant.firstname} {occupant.lastname}
              </p>
          </div>

          <button class="flex w-1/2 justify-end" onClick={()=>{
            setShow(!show)
            console.log(show)
          }}>
            <span class="text-white"><IonIcon name="chevron-down-outline" size="medium"/></span>
            </button>
      </div>
      <div class="flex-col">

      </div>
      
        {
          show?
          <div class="bg-gray-300 rounded-md flex flex-col w-full">
              <GuestTable occupant={occupant} guests={ guests}/>
              <RestrictedTable occupant={occupant} restricted={restricted}/>
              
            </div>:
            <div></div>

        }
      
   
    </div>
   
  )
  }else{
    return(<div></div>)
  }
}

export default GuestItem