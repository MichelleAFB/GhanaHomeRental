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