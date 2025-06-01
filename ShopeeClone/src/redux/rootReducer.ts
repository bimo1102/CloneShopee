import { combineReducers } from '@reduxjs/toolkit'
import languageReducer from '../redux/language/languageSlice'

const rootReducer = combineReducers({
  language: languageReducer
})

export default rootReducer
