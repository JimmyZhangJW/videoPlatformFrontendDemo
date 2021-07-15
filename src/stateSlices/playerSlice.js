import { createSlice } from "@reduxjs/toolkit";
import * as fakeVideos from "../FakeVideos.json"

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    allVideos: fakeVideos.videos,
    selectedVideo: null,
  },
  reducers: {
    setVideos: (state, action) => {
      state.allVideos = action.payload
    },
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload
    },
  }
});

export const {setVideos, setSelectedVideo} = playerSlice.actions;
export default playerSlice.reducer;
