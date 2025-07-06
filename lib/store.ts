import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from '@/features/dashboardSlice'
import themeReducer from '@/features/themeSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,    
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch