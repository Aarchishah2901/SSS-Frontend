import { createSlice } from "@reduxjs/toolkit";

const selectionSlice = createSlice({
  name: "selections",
  initialState: {},
  reducers: {
    setSelections(state, action) {
      return { ...action.payload };
    },
    updateSelection(state, action) {
      const { appId, data } = action.payload;
      state[appId] = data;
    },
    setMessage(state, action) {
      const { appId, message } = action.payload;
      if (state[appId]) {
        state[appId].message_to_user = message;
      }
    },
  },
});

export const { setSelections, updateSelection, setMessage } = selectionSlice.actions;
export default selectionSlice.reducer;