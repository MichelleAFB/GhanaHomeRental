
//react
import React from 'react'
import {useEffect,useState} from 'react'

import { Link } from 'react-router-dom'


function IntroductionPage({children}) {
  return (
    <div class="flex flex-col">
      <div class="flex bg-gray-300 w-full p-3">
        <div class="flex">
          <Link to="/gallery" class="m-2"> <p class="text-xl text-gray-600 font-bold">Gallery</p></Link>
          <Link to="/gallery" class="m-2"> <p class="text-xl text-gray-600 font-bold">About</p></Link>
          <Link to="/gallery" class="m-2"> <p class="text-xl text-gray-600 font-bold">Reserve</p></Link>
        </div>
      </div>
      <div class="flex flex-col w-full bg-gray-100 p-3" >

      </div>


    </div>
  )
}

export default IntroductionPage