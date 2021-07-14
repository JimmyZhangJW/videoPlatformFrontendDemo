import { configureStore } from "@reduxjs/toolkit";
import indexReducer from "./stateSlices/indexSlice";
import uploadReducer from "./stateSlices/uploadSlice";
import playReducer from "./stateSlices/playerSlice";
export default configureStore({
  reducer: {
    indexer: indexReducer,
    uploader: uploadReducer,
    player: playReducer
  }
});
