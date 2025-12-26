import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../src/features/userSlice.js'


export const store = configureStore({
  reducer: {
    user: userSlice
  },
})
