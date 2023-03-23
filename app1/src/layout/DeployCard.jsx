import React from 'react'
import Heroku from '../assets/Heroku.svg'
import Netlify from '../assets/Netlify.svg'
function DeployCard() {
  return (
    <div class="flex flex-col bg-gray-600 p-3 rounded-md">
    <p class="m-5" > <span class=" font-poppins font-medium   outline-none text-white text-5xl">Deploy</span></p>
  

    <p class="text-white text-lg"> The goal is to ultimately deploy to AWS. We are not there yet..</p>
    <div class="flex flex-col p-3 bg-gray-300 rounded-md mt-3">
        <div class="flex align-middle"><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Backend:</h1>
        <div><img src={Heroku} alt="heroku"/></div>
        </div>
        <div class="mt-3">
          
          <p class="font-poppins font-medium  outline-none">
            First attempted to deploy backend with AWS elastic beanstalk.I believe the issue occured I made some sort of breaking change tothe EC2 instance sustaining it.I used AWS CloudFront to implement SSL Certificate and housed ElasticBeanstalk server in S3 Bucket.
          </p>
          <p class="border-box font-poppins font-medium  outline-non mt-2">
           ..Ultimately  deployed with Heroku
          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500"></span>
          </p>
        </div>
      </div>
      <div class="flex flex-col p-3 bg-gray-300 rounded-md mt-3">
        <div class="flex"><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">FrontEnd:</h1>
        <div><img src={Netlify} alt="netlify" height="80px" width="80px"/></div>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            First attemped to house in AWS S3 Bucket which was successful, however because the backend deployment to aws was not successfully, it is not in use.
          </p>
          <p class="border-box font-poppins font-medium  outline-non mt-2">
           ..Ultimately deployed with netlify
          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500"></span>
          </p>
        </div>
      </div>
      <div class="flex flex-col p-3 bg-gray-300 rounded-md mt-3">
        <div class="flex"><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Domain:</h1>
        <div><img src={Netlify} alt="netlify" height="80px" width="80px"/></div>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            First attemped to house in AWS Route53 to house domain.Acquired an SSL Certificate through AWS.  
          </p>
          <p class="border-box font-poppins font-medium  outline-non mt-2">
           ..Ultimately deployed with netlify
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

export default DeployCard