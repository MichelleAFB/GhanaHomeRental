import * as actionTypes from './admin-applications-types'


export function setTotalNewApplications(count){
  return{
    type:actionTypes.SET_TOTAL_NEW_APPLICATIONS,
    payload:{
      count:count
    }
  }
}

export function decrementTotalNewApplications(){
  return{
    type:actionTypes.DECREMENT_TOTAL_NEW_APPLICATIONS,
   
  }
}

export function setApplication(application){
  return{
    type:actionTypes.SET_APPLICATION,
    payload:{
      application:application
    }
   
  }
}

export function setApplicationModalVisibility(visibility){
  console.log("CHANGING APPLICATION MODAL:"+visibility)
  return{
    type:actionTypes.SET_APPLICATION_VISIBILITY,
    payload:{
      visibility:visibility
    }
   
  }
}
