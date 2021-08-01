import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        allVideos: [],
        selectedVideo: null,
    },
    reducers: {
        setVideos: (state, action) => {
            state.allVideos = action.payload
        },
        setSelectedVideo: (state, action) => {
            state.selectedVideo = action.payload
        }
    }
});

export const {setVideos, setSelectedVideo} = playerSlice.actions;
export default playerSlice.reducer;
