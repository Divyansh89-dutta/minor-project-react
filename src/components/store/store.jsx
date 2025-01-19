import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';
import tvReducer from './reducers/tvSlice';
import personReducer from './reducers/people';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});

export default store; // Ensure default export for consistency
