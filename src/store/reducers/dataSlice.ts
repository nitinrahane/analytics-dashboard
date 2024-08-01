import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ResponseData {
  PhrasedQuestion: string;
  Response: string;
  Sentiment: 'Positive' | 'Neutral' | 'Negative';
  Score: number;
  Polarity: number;
  Emotion: 'Happiness' | 'Sadness' | 'Anger' | 'Others';
  Entities: string;
  Themes: string;
  ActionableInsight: string;
  SemanticAnalysis: string;
  PositiveAspects: string;
  NegativeAspects: string;
}

export interface DataState {
  data: ResponseData[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ResponseData[]>) {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
