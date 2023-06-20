import React from 'react'
import { useState,useEffect } from 'react'

//outside
import axios from 'axios'
function GuestTable({occupant,guests}) {

  const[guestsList,setGuestsList]=useState(guests)
  const[isLoading,setIsLoading]=useState(true)

    console.log(occupant)
    console.log(guests)

    useEffect(()=>{
      const prom=new Promise((resolve,reject)=>{
        var newguests;
        if(guests.length!=3){
        if(guests.length==0){
           newguests=[{firstname:"",lastname:"",phone:"",email:""},
                    {firstname:"",lastname:"",phone:"",email:""},
                    {firstname:"",lastname:"",phone:"",email:""}]
                    setGuestsList(newguests)
        }else
        { 
          const g0= (guests[0]==null)?  {firstname:"",lastname:"",phone:"",email:""} : guests[0]
          const g1= (guests[1]==null)?  {firstname:"",lastname:"",phone:"",email:""} : guests[1]
          const g2= (guests[2]==null)?  {firstname:"",lastname:"",phone:"",email:""} : guests[2]
         
          newguests={g0,g1,g2}
      
       setGuestsList(newguests)
      }
      }
      resolve()
      })

      prom.then(()=>{
        setIsLoading(false)
      })

    },[])

    if(!isLoading){
      console.log(guestsList)
      console.log(occupant._id)
  return (
    <div class="flex-col w-full p-3">
      <p class="text-lg font-bold text-center">Guests</p>
    <table class="w-full p-3">
    <tr class="border-gray-400 border-2">
      <th class="border-gray-400 border-2">First</th>
      <th class="border-gray-400 border-2" >Last</th>
      <th class="border-gray-400 border-2">Phone</th>
      <th class="border-gray-400 border-2">Email</th>
    </tr>
   
      {guests[0]!=null ?
        <tr>
          <td><input type='text'default={guests[0].firstname} placeholder={guests[0].firstname}  name='firstname'onChange={(e)=>{
            var g=guests
            guestsList[0].firstname=e.target.value
            setGuestsList(guestsList)
        }} id="first_0"class="w-full"/></td>
          <td><input type='text' default={guests[0].lastname} placeholder={guests[0].lastname}  name='lastname' onChange={(e)=>{
            var g=guests
            guestsList[0].lasttname=e.target.value
            setGuestsList(guestsList)
        }}id="last_0"class="w-full"/></td>
          <td><input type='text' default={guests[0].phone} placeholder={guests[0].phone}  name='phone' onChange={(e)=>{
            var g=guests
            guestsList[0].phone=e.target.value
            setGuestsList(guestsList)
        }}id="phone_0"class="w-full"/></td>
          <td><input type='email'default={guests[0].email}  placeholder={guests[0].email}  name='email' onChange={(e)=>{
            var g=guestsList
            console.log(g)
            console.log("help")
            console.log(guestsList)
            g[0].email=e.target.value
            setGuestsList(g)
            console.log(guestsList)
        }}id="email_0" class="w-full"/></td>
        </tr>:
        <tr>
          <td><input type='text' id="first_0" onChange={(e)=>{
            var g=guests
            guestsList[0].firstname=e.target.value
            setGuestsList(guestsList)
        }} class="w-full"/></td>
          <td><input type='text'  id="last_0" onChange={(e)=>{
            var g=guests
            guestsList[0].lastname=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='text' id="phone_0" onChange={(e)=>{
            var g=guests
            guestsList[0].phone=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='email' id="email_0" onChange={(e)=>{
            
            guestsList[0].email=e.target.value
            console.log(guestsList)
            setGuestsList(guestsList)
        }} class="w-full"/></td>
        </tr>}
        {guests[1]!=null ?
        <tr>
          <td><input type='text'default={guests[1].firstname} placeholder={guests[1].firstname}  name='firstname' onChange={(e)=>{
              var g=guests
              guestsList[1].firstname=e.target.value
              setGuestsList(guestsList)
          }} id="first_0"class="w-full"/></td>
          <td><input type='text' default={guests[1].lastname} placeholder={guests[1].lastname}  name='lastname' onChange={(e)=>{
              var g=guests
              guestsList[1].lastname=e.target.value
              setGuestsList(guestsList)
              console.log("here")
              console.log(guestsList)
          }}id="last_0"class="w-full"/></td>
          <td><input type='text' default={guests[1].phone} placeholder={guests[1].phone}  name='phone' onChange={(e)=>{
              var g=guests
              guestsList[1].phone=e.target.value
              setGuestsList(guestsList)
              console.log("here")
              console.log(guestsList)
          }} id="phone_0"class="w-full"/></td>
          <td><input type='email'default={guests[1].email} placeholder={guests[1].email}  name='email'id="email_0" onChange={(e)=>{
              var g=guests
              guestsList[1].email=e.target.value
              setGuestsList(guestsList)
              console.log("here")
              console.log(guestsList)
          }} class="w-full"/></td>
        </tr>:
        <tr>
          <td><input type='text' id="first_0" onChange={(e)=>{
              var g=guests
              guestsList[1].firstname=e.target.value
              setGuestsList(guestsList)
          }} class="w-full"/></td>
          <td><input type='text'  id="last_0" onChange={(e)=>{
              var g=guests
              guestsList[1].lastname=e.target.value
              setGuestsList(guestsList)
              console.log(guestsList)
          }}class="w-full"/></td>
          <td><input type='text' id="phone_0" onChange={(e)=>{
            var g=guests
            guestsList[1].phone=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='email' id="email_0" onChange={(e)=>{
            var g=guests
            guestsList[1].email=e.target.value
            setGuestsList(guestsList)
            console.log(guestsList)
        }} class="w-full"/></td>
        </tr>}
        {guests[2]!=null ?
        <tr>
          <td><input type='text'default={guests[2].firstname} placeholder={guests[2].firstname} name='firstname'id="first_0" onChange={(e)=>{
            var g=guests
            guestsList[2].firstname=e.target.value
            setGuestsList(guestsList)
        }} class="w-full"/></td>
          <td><input type='text' default={guests[2].lastname}  placeholder={guests[2].lastname} name='lastname'id="last_0" onChange={(e)=>{
            var g=guests
            guestsList[2].lastname=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='text' default={guests[2].phone} placeholder={guests[2].phone}  name='phone'id="phone_0" onChange={(e)=>{
            var g=guests
            guestsList[2].phone=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='email'default={guests[2].email} placeholder={guests[2].email}  name='email'id="email_0" onChange={(e)=>{
            var g=guests
            guestsList[2].email=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
        </tr>:
        <tr>
          <td><input type='text' id="first_0" onChange={(e)=>{
            var g=guests
            guestsList[2].firstname=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='text'  id="last_0" onChange={(e)=>{
            var g=guests
            guestsList[2].lastname=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='text' id="phone_0" onChange={(e)=>{
            var g=guests
            guestsList[2].phone=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
          <td><input type='email' id="email_0" onChange={(e)=>{
            var g=guests
            guestsList[2].email=e.target.value
            setGuestsList(guestsList)
        }}class="w-full"/></td>
        </tr>}
       
    </table>
    <button class="bg-green-400 rounded-md w-full  flex-col justify-items-center p-3 m-2" onClick={()=>{
        const prom=new Promise((resolve,reject)=>{
          axios.post("http://localhost:3012/current-resident/edit-guests/"+occupant.application_id+"/"+occupant._id,{guests:guestsList}).then((response)=>{
            console.log(response)
            if(response.data.success){
              alert("SUCCESS: "+response.data.no_guests+" have been added to "+occupant.firstname+ " "+occupant.lastname+"'s guest list")
            }
          })
        })
    }}>
          <p class="text-center text-white font-bold">
            Submit
          </p>
        </button>
    </div>
  )
    }else{
      return(<div></div>)
    }
}

export default GuestTable