import {combineReducers} from 'redux'
import {userReducer} from './user/user-reducer'
import { adminApplicationsReducer } from './admin-applications/admin-applications-reducer'
export const rootReducer=combineReducers({
  user:userReducer,
  adminApplications:adminApplicationsReducer
})