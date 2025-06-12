import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Panel = {
  id: number
  title: string
  path: string
  color: string
  subheader?: string
}

interface DashboardState {
  panelOrder: number[]
  removedPanels: number[]
  searchQuery: string
  isDirty: boolean
}

const initialState: DashboardState = {
  panelOrder: [],
  removedPanels: [],
  searchQuery: '',
  isDirty: false,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPanelOrder: (state, action: PayloadAction<number[]>) => {
      state.panelOrder = action.payload
      state.isDirty = true
    },
    removePanel: (state, action: PayloadAction<number>) => {
      state.panelOrder = state.panelOrder.filter(id => id !== action.payload)
      state.removedPanels.push(action.payload)
      state.isDirty = true
    },
    addPanel: (state, action: PayloadAction<number>) => {
      if(!state.panelOrder.includes(action.payload)) {
        state.panelOrder.push(action.payload)
        state.removedPanels = state.removedPanels.filter(id => id !== action.payload)
        state.isDirty = true
      }
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetLayout: () => initialState,
    markSaved: (state) => {
      state.isDirty = false
    }
  }
})

export const { 
  setPanelOrder,
  removePanel,
  addPanel,
  updateSearchQuery,
  resetLayout,
  markSaved,
} = dashboardSlice.actions
export default dashboardSlice.reducer