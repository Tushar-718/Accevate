import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
  isLoading: boolean;
  message: string | null;
}

const initialState: LoaderState = {
  isLoading: false,
  message: null,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) state.message = null;
    },
    setLoadingMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
});

export const { setLoading, setLoadingMessage } = loaderSlice.actions;
export default loaderSlice.reducer;
