import React from 'react'
import { useState } from 'react'

//assets
import { Avatar } from '@material-ui/core'

function AdminApplicantOccupant({occupant}) {

  const[showInfo,setShowInfo]=useState(false)

  
  return (
    <div class="flex m-2">
      <Avatar onClick={()=>{
        setShowInfo(!showInfo)
      }}/>
      {
        !showInfo  ? <div class="m-2"><p>{occupant.firstname} {occupant.lastname}</p></div>:<p></p>
      }
      {
        showInfo && occupant.child==0? 
          <div class="  bg-cyan-300 m-2 rounded-md p-3">
              <table>
                <tr>
                  <th class="border-black border-2 p-2">name</th>
                  <th class="border-black border-2 p-2">email</th>
                  <th class="border-black border-2 p-2">age</th>
                  <th class="border-black border-2 p-2">association</th>
                </tr>
                <tr>
                  <td class="border-black border-2 p-2">{occupant.firstname} {occupant.lastname}</td>
                  <td class="border-black border-2 p-2">{occupant.email}</td>
                  <td class="border-black border-2 p-2">{occupant.age}</td>
                  <td class="border-black border-2 p-2">{occupant.association}</td>
                </tr>
             
                
              </table>
            
             
          </div>
                  :
                  <div></div>
      }
       {
        showInfo && occupant.child!=0 ? 
          <div class="flex  bg-cyan-300 m-2 rounded-md p-3 ">
              <table >
                <tr >
                  <th class="border-black border-2 p-2">name</th>
                  <th class="border-black border-2 p-2">age</th>
                  <th class="border-black border-2 p-2">association</th>
                </tr>
                <tr>
                   <td class="border-black border-2 p-2">{occupant.firstname} {occupant.lastname}</td>
                    <td class="border-black border-2 p-2">{occupant.age}</td>
                    <td class="border-black border-2 p-2">{occupant.association}</td>
                 </tr>
               
                
              </table>
          </div>
                  :
                  <div></div>
      }
    </div>
  )
}

export default AdminApplicantOccupant