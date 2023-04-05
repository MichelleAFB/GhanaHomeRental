import * as actionTypes from './admin-applications-types'


const initialState={
  totalNewApplications:null,
  visibility:false,
  application:null,

}

export  const adminApplicationsReducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.SET_TOTAL_NEW_APPLICATIONS:
      console.log("REDUX:SETTING USER")
      return{
        ...state,
        totalNewApplications:action.payload.count
      }
  
    case actionTypes.DECREMENT_TOTAL_NEW_APPLICATIONS:
      console.log("REDUX:SETTING USER TYPE")
      return{
        ...state,
        totalNewApplications:(state.totalNewApplications-1)
      }
    case actionTypes.SET_VISIBILITY:
        console.log("REDUX:SETTING MODAL VISIBILITY")
        return{
          ...state,
          visibility:action.payload.visibility
        }
     case actionTypes.SET_APPLICATION:
      console.log("REDUX:SETTING Application")
      return{
        ...state,
        application:action.payload
      }
     
    
      default:
        return state
    }
}