import React from 'react'

import NodeJS from '../assets/NodeJS.png'
import Express from '../assets/Express.png'
import MySql from '../assets/MySql.svg'

import Axios from '../assets/Axios.png'
import Cheerio from '../assets/Cheerio.png'
import Puppeteer from '../assets/Puppeteer.svg'

import BCrypt from '../assets/BCrypt.png'
import GoogleOAuth from '../assets/GoogleOAuth.png'


function BackendCard() {
  return (
    <div class="flex flex-col bg-gray-600 p-3 rounded-md">
    <p class="m-5" > <span class=" font-poppins font-medium   outline-none text-white text-5xl">Backend/Rest API</span></p>
    <div class="flex p-3 m-3 align-middle">
          <div class="flex p-3 justify-between ">
            <div class="m-2"><img src={NodeJS} alt="NodeJS" height="90px" width="90px" class="m-1"/></div>
            <div class="m-2"><img src={Express} alt="Express"  class="m-3 justify-center"/></div>
            <div class="m-2"><img src={MySql} alt="Mysql" class="m-1" height="100px" width="100px"/></div>
        </div>
    </div>
      <div class="flex flex-col p-3 bg-gray-300 rounded-md">
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Step 1</h1>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium text-xl outline-none"> We need data</p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            Using browser manipulation library cheerio, we go to AAC Dallas' event page
            hit "Click More " to continuosly reveal all http requests. These http requests are supply the html we need to parse event information from! Parse out act, date of act, time of act and store into database. Store the image related to each event in db as well The default access type for all events is <span class="text-purple-500">private</span>

          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500">Libraries used:</span>
           

          </p>
          <div class="flex p-3 ">
          <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">Puppeteer</p><img src={Puppeteer} alt="puppeteer" height="60px" width="60px"/></div>
            <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">Cheerio</p><img src={Cheerio} alt="cheerio" height="60px" width="60px"/></div>
            <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">Axios</p><img src={Axios} alt="axios" height="100px" width="100px"/></div>
          </div>
          
          
        </div>
      </div>
      <br/>

      <div class="flex flex-col p-3 bg-gray-300 rounded-md">
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Step 2</h1>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium text-xl outline-none"> Created endpoints for setting up admin users, employee users, and public users</p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            Created endpoints for managing new users for admin,employee, and public user.
            Endpoints:create new users, recover password,query user data

          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500">Libraries used:</span>
          </p>
        </div>
        <div class="flex p-3 ">
          <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">GoogleOAuth</p><img src={GoogleOAuth} alt="googleoauth" height="60px" width="60px"/></div>
            <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">PassportJS</p></div>
            <div class="m-2 flex flex-col"><p class="font-poppins font-medium  outline-none">BCrypt</p><img src={BCrypt} alt="bcrypt" height="100px" width="100px"/></div>
        </div>
          
          
     
      </div>

      <div class="flex flex-col p-3 bg-gray-300 rounded-md mt-3">
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Step 3</h1>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium text-xl outline-none"> Created endpoints for managing reservation protocols for public clients and employees</p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            Created endpoints for managing new users for admin,employee, and public user.
            Endpoints:create new users, recover password,query user data
          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500"></span>
          </p>
        </div>
      </div>
     
     

    </div>
  )
}

export default BackendCard