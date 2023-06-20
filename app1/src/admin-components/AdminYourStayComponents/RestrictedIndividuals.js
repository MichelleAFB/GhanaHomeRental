import React from 'react'
import { useState,useEffect } from 'react'


//outside
import axios from 'axios'
import RestrictedIndividualsitem from './RestrictedIndividualsitem'

function RestrictedIndividuals({application}) {

  const[isLoading,setIsLoading]=useState(false)
  const[restrictedIndividuals,setRestrictedIndividuals]=useState()
  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
       resolve()
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  },[])


  if(!isLoading){
  return (
    <div class="flex flex-col p-3 bg-gray-200 rounded-md w-full">
       
    </div>
  )
  
  }else{
    return(<div></div>)
  }
}

export default RestrictedIndividuals