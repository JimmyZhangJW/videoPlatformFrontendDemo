import React from "react";
import "./Upload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDispatch } from "react-redux";
import {
  updateFileName,
  stepForward
} from "../../stateSlices/uploadSlice";

export default function UploadButton() {
  const dispatch = useDispatch();
  return (
    <div className="ButtonContainer">
      <form id="video_uploader" className="wrapper">
        <div className="file-upload">
          <input
            type="file"
            id="video_file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={e => {
              if (e.target.files[0] == null) {
                return;
              }
              dispatch(updateFileName(e.target.files[0].name));
              dispatch(stepForward());
              console.log(e.target.files[0]);
            }}
          />
          <CloudUploadIcon className="cloud-icon" />
        </div>
      </form>
    </div>
  );
}
