import React from 'react' 
import ReactIcon from '../assets/ReactIcon.png'

function FrontendCard() {
  return (
    <div class="flex flex-col bg-gray-600 p-3 rounded-md m-3">
    <div class="flex">
        <p class="m-5" > <span class=" font-poppins font-medium   outline-none text-white text-5xl">Frontend</span></p>
        <div class="mt-2"><img src={ReactIcon} alt="react"/></div>
    </div>
      <div class="flex flex-col p-3 bg-gray-300 rounded-md">
        
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">State Management</h1>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium text-xl outline-none">Redux</p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
             All conditional components are mapped to data in a Redux Store.

          </p>
        </div>
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500">Libraries used: <span class="text-black">react-redux, redux</span></span>

          </p>
          
        </div>
      </div>
      <br/>

      <div class="flex flex-col p-3 bg-gray-300 rounded-md">
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">UI</h1>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium text-xl outline-none">Styling animations, component libraries</p>
        </div>
        <div class="mt-3 ">
          <div class="flex">
          <div class="m-2">
              <p class="font-poppins font-medium  outline-none text-xl">Styling:</p>
             </div>
            <div class="mt-2">
              <p class="font-poppins font-medium  outline-none">TailwindCSS</p>
             </div>
            <div class="m-2">
              <p class="font-poppins font-medium  outline-none">Google Fonts</p>
             </div>
          </div>
        </div>
        <div class="mt-3 ">
          <div class="flex">
          <div class="m-2">
              <p class="font-poppins font-medium  outline-none text-xl">Animations:</p>
             </div>
            <div class="mt-2">
              <p class="font-poppins font-medium  outline-none">Framer Motion</p>
             </div>
          </div>
        </div>

        <div class="mt-3 ">
          <div class="flex">
          <div class="m-2">
              <p class="font-poppins font-medium  outline-none text-xl">Components:</p>
             </div>
            <div class="m-2">
              <p class="font-poppins font-medium  outline-none">React-toastify</p>
             </div>
            <div class="m-2">
              <p class="font-poppins font-medium  outline-none">React-Slick</p>
             </div>
          </div>
        </div>

        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            <span class="text-orange-500">Libraries used:GoogleOAuth,Passport,Bcrypt</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col p-3 bg-gray-300 rounded-md mt-3">
        <div><h1 class="font-poppins font-medium  text-2xl outline-none text-green-800">Other</h1>
        </div>

        
        <div class="mt-3">
          <p class="font-poppins font-medium  outline-none">
            EmailJS: send automated emails to clients
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

export default FrontendCard