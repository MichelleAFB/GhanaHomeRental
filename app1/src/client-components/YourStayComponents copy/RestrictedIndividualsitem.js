
import {useState,useEffect} from 'react'

//outside
import axios from 'axios'

//assets
import IonIcon from '@reacticons/ionicons'
import GuestTable from './GuestTable'
import RestrictedTable from './RestrictedTable'

function RestrictedIndividualsitem({occupant}) {
  
  const[isLoading,setIsLoading]=useState(true)
  const[guests,setGuests]=useState()
  const[show,setShow]=useState(false)
  const[total,setTotal]=useState(5)
  console.log(occupant)
  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
      axios.get("http://localhost:3012/current-resident/restricted-individuals/"+occupant.application_id+"/"+occupant.id).then((response)=>{
        console.log(response)
        setGuests(response.data.guests)
        resolve()
      })

    })

    prom.then(()=>{
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
    console.log(guests)
   // console.log(guests.length)
  return (
    <div class="flex flex-col">
      <p class="text-xl font-bold text-red-500 text-center">Restricted Individuals</p>
     
      
       
              <RestrictedTable occupant={occupant} guests={ guests}/>  
    </div>
   
  )
  }else{
    return(<div></div>)
  }
}

export default RestrictedIndividualsitem