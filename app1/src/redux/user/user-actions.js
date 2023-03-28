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