import React from "react";
import "./Upload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

/**
 * UploadButton renders a blue upload button
 * @param props requires onChange
 * @returns {JSX.Element}
 * @constructor
 */
export default function UploadButton(props) {
    const {onChange} = props

    return (
        <div className="ButtonContainer">
            <form id="video_uploader" className="wrapper">
                <div className="file-upload">
                    <input
                        type="file"
                        id="video_file"
                        accept="video/mp4,video/webm"
                        onChange={(e) => onChange(e)}
                    />
                    <CloudUploadIcon className="cloud-icon"/>
                </div>
            </form>
        </div>
    );
}
