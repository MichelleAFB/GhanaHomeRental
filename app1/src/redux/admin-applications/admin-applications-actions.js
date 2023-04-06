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
  console.log("setting application")
  console.log(application)
  return{
    type:actionTypes.SET_APPLICATION,
    payload:{
      application:application
    }
   
  }
}

export function setApplicationModalVisibility(visibility){
  return{
    type:actionTypes.SET_APPLICATION_VISIBILITY,
    payload:{
      visibility:visibility
    }
   
  }
}

export function setVisibility(vis){
  console.log(actionTypes.SET_VISIBILITY+ " "+vis)
  return{
    type:actionTypes.SET_VISIBILITY,
    payload:{
      visibility:vis
    }
   
  }
}

