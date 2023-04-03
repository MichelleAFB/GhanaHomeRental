import React from 'react'

//outside
import {motion} from 'framer'

import{connect} from 'react-redux'
function ApplicationModal() {
  if(visibility){
  return (
    <div class='bg-gray-200' data-testId="modal-public">
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
     
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
        <div class=' bg-white  rounded-xl shadow-lg dark:bg-pink-400 dark:border-gray-700 mb-5'>
          <div class='p-4 sm:p-7'>
            <div class='text-center'>
              {application.occupants.length}
            </div>
          </div>
          </div>
          </main>
      
      </div>
      </div>
  )
}
}
const mapStateToProps = (state, props) => {
  var visibility= state.adminApplications.visibility;
  var application=state.adminApplications.application

  return {
   visibility:visibility,
   application:application
  };
};
export default connect(mapStateToProps)(ApplicationModal)