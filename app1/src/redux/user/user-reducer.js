import * as actionTypes from './user-types'


const initialState={
  user:null,
  userType:"",
  isCurrentlyOccupied:false,
  currentlyOccupiedApplication:null

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
      case actionTypes.SET_CURRENTLY_OCCUPIED:
        console.log("REDUX:SETTING USER TYPE")
        return{
          ...state,
          isCurrentlyOccupied:action.payload.isCurrentlyOccupied
        }
     case actionTypes.SET_CURRENTLY_OCCUPIED_APPLICATION:
          console.log("REDUX:SETTING USER TYPE")
          return{
            ...state,
            currentlyOccupiedApplication:action.payload.application
          }
    
      default:
        return state
    }
}