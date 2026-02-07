import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  dynamicColor: string | null;
}

const initialState: DashboardState = {
  dynamicColor: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDynamicColors: (state, action: PayloadAction<string>) => {
      state.dynamicColor = action.payload;
    },
    clearDashboardData: (state) => {
      state.dynamicColor = null;
    }
  },
});

export const { setDynamicColors, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
