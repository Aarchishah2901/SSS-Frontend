// import { configureStore } from '@reduxjs/toolkit';
// import jobdashboardReducer from '../features/jobdashboard/jobdashboardslice';
// import Cookies from 'js-cookie';

// // --- Load Redux state from cookies ---
// const loadStateFromCookies = () => {
//   try {
//     const cookieState = Cookies.get('reduxState');
//     return cookieState ? JSON.parse(cookieState) : undefined;
//   } catch (err) {
//     console.error("Could not load state from cookie", err);
//     return undefined;
//   }
// };

// // --- Save Redux state to cookies ---
// const saveStateToCookies = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     Cookies.set('reduxState', serializedState, { expires: 7 }); // expires in 7 days
//   } catch (err) {
//     console.error("Could not save state to cookie", err);
//   }
// };

// const persistedState = loadStateFromCookies();

// export const store = configureStore({
//   reducer: {
//     jobdashboard: jobdashboardReducer,
//   },
//   preloadedState: persistedState,
// });

// // Subscribe to store changes and update cookie
// store.subscribe(() => {
//   saveStateToCookies(store.getState());
// });

import { configureStore } from '@reduxjs/toolkit';
import jobdashboardReducer from '../features/jobdashboard/jobdashboardslice';
import Cookies from 'js-cookie';

// Load Redux state from cookies
const loadStateFromCookies = () => {
  try {
    const cookieState = Cookies.get('reduxState');
    return cookieState ? JSON.parse(cookieState) : undefined;
  } catch (err) {
    console.error("Could not load state from cookie", err);
    return undefined;
  }
};

// Save Redux state to cookies
const saveStateToCookies = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set('reduxState', serializedState, { expires: 7 });
  } catch (err) {
    console.error("Could not save state to cookie", err);
  }
};

const persistedState = loadStateFromCookies();

export const store = configureStore({
  reducer: {
    jobdashboard: jobdashboardReducer,
  },
  preloadedState: persistedState,
});

// Update cookie on state change
store.subscribe(() => {
  saveStateToCookies(store.getState());
});