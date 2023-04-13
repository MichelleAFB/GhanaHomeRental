import * as actionTypes from './user-types'

export function setUser(user){
  return{
    type:actionTypes.SET_USER,
    payload:{
      user:user
    }

  }
}

export function setUserType(type){
  return{
    type:actionTypes.SET_USER_TYPE,
    payload:{
      userType:type
    }

  }
}

export function setCurrentlyOccupied(value){
  return{
    type:actionTypes.SET_CURRENTLY_OCCUPIED,
    payload:{
      isCurrentlyOccupied:value
    }

  }
}

export function setCurrentlyOccupiedApplication(application){
  return{
    type:actionTypes.SET_CURRENTLY_OCCUPIED_APPLICATION,
    payload:{
      application:application
    }

  }
}