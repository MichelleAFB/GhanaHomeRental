import * as actionTypes from './user-types'


const initialState={
  user:null,
  userType:"",
  isCurrentlyOccupied:false,
  currentlyOccupiedApplication:null,
  reviewModalVisibility:false,
  reviewModalApplication:null

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
      case actionTypes.SET_REVIEW_MODAL_VISIBILITY:
            console.log("REDUX:SETTING REVIEW VISIBILITY")
            console.log(action)
            return{
              ...state,
             reviewModalVisibility:action.payload.reviewModalVisibility
            }
        case actionTypes.SET_REVIEW_MODAL_APPLICATION:
              console.log("REDUX:SETTING REVIEW MODAL")
              return{
                ...state,
               reviewModalApplication:action.payload.reviewModalApplication
              }
    
      default:
        return state
    }
}