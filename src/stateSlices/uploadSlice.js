import { createSlice } from "@reduxjs/toolkit";
export const uploadSlice = createSlice({
  name: "uploader",
  initialState: {
    fileName: "",
    fileChunks: [],
    avatarImg: "",
    step: 0,
    title: "",
    description: ""
  },
  reducers: {
    stepForward: state => {
      if (state.step === 0) {
        state.step = 1;
      }
    },
    stepBackward: state => {
      if (state.step === 1) {
        state.step = 0;
        state.title = "";
        state.description = "";
        state.avatarImg = "";
      }
    },
    updateFileChunks: (state, action) => {
      state.fileChunks = action.payload;
    },
    updateFileName: (state, action) => {
      state.fileName = action.payload;
      state.title = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateAvatarImg: (state, action) => {
      state.avatarImg = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload
    }
  }
});

export const { stepForward, stepBackward, updateAvatarImg, updateDescription, updateFileChunks, updateFileName, updateTitle } = uploadSlice.actions;
export default uploadSlice.reducer;
