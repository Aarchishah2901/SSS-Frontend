import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  selections: {},
  messages: {},
};

const jobdashboardSlice = createSlice({
  name: 'jobdashboard',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setSelections: (state, action) => {
      state.selections = action.payload;
    },
    updateSelection: (state, action) => {
      const { appId, data } = action.payload;
      state.selections[appId] = data;
    },
    setMessage: (state, action) => {
      const { appId, message } = action.payload;
      state.messages[appId] = message;
    },
  },
});

export const {
  setApplications,
  setSelections,
  updateSelection,
  setMessage,
} = jobdashboardSlice.actions;

export default jobdashboardSlice.reducer;