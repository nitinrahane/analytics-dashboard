import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SurveyDataState, SurveyResponse } from '../../interfaces';

const initialState: SurveyDataState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SurveyResponse[]>) {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
