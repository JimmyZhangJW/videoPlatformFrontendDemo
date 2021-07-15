import {createSlice} from "@reduxjs/toolkit";

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

const IndexHomePage = 0
const IndexPlayerPage = 1
const IndexUploadPage = 2

export const {setIndex} = indexSlice.actions;
export default indexSlice.reducer;
export {IndexHomePage, IndexPlayerPage, IndexUploadPage}
