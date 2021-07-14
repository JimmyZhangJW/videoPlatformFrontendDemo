import { createSlice } from "@reduxjs/toolkit";
export const indexSlice = createSlice({
  name: "index",
  initialState: {
    selectedIndex: 0
  },
  reducers: {
    setIndex: (state, action) => {
      state.selectedIndex = action.payload;
    }
  }
});

export const { setIndex } = indexSlice.actions;
export default indexSlice.reducer;
