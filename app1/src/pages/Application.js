import React from 'react'
import { useParams } from 'react-router-dom'
function Application() {

  const {email} =useParams()
  const {phone}=useParams()
  const {firstname}=useParams()
  const {lastname}=useParams()

  console.log(firstname)
  console.log(lastname)
  return (
    <div class="bg-gray-400">
      Application
      </div>
  )
}

export default Application
