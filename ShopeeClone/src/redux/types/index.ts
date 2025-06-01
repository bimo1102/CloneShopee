import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../configureStore'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
