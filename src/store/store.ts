import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './reducers/counterSlice';
import dataReducer from './reducers/dataSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
