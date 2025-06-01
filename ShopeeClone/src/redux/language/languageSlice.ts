import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'
import { createAppAsyncThunk } from '../types'
import { LanguageState } from 'src/domain/models/ILanguage'

const getLanguageFromLocalStorage = (): string => {
  return localStorage.getItem('language') || 'vi'
}
const initialState: LanguageState = {
  language: getLanguageFromLocalStorage()
}
export const fetchLanguage = createAppAsyncThunk<void, void, { state: RootState }>(
  'language/fetchLanguage',
  async (_, { dispatch }) => {
    const savedLanguage = localStorage.getItem('language') || 'vi'
    dispatch(setLanguage(savedLanguage))
  }
)
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    }
  }
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
