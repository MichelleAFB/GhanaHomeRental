import React from 'react'

function CompanyCard() {
  return (
    <div class="flex flex-col bg-gray-600 p-3 rounded-md">
    <p class="m-5" > <span class=" font-poppins font-medium   outline-none text-white text-5xl">Backend/Rest API</span></p>
   

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

export default CompanyCard