import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardPanels } from "@/constants/panels";

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

const loadInitialPanelOrder = (): number[] => {
  if(typeof window !== 'undefined') {
    const stored = localStorage.getItem('panelOrder')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const initialState: DashboardState = {
  panelOrder: loadInitialPanelOrder(),
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

      if (typeof window !== 'undefined') {
        localStorage.setItem('panelOrder', JSON.stringify(state.panelOrder))
      }
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