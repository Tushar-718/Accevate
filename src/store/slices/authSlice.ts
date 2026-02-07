import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userid: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userid: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userid = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logoutAuth: (state) => {
      state.userid = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserId, setAuthToken, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
