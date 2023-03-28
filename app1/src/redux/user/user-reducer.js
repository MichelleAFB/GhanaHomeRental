import * as actionTypes from './user-types'


const initialState={
  user:null,
  userType:""

}

export  const userReducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.SET_USER_TYPE:
      console.log("REDUX:SETTING USER")
      return{
        ...state,
        userType:action.payload.userType
      }
  
    case actionTypes.SET_USER:
      console.log("REDUX:SETTING USER TYPE")
      return{
        ...state,
        user:action.payload.user
      }
    
      default:
        return state
    }
}