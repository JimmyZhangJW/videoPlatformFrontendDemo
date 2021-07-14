import { createSlice } from "@reduxjs/toolkit";
import { fakeVideo } from "../components/Home/fakeVideoData";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    allVideos: [fakeVideo],
    selectedVideo: {},
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
