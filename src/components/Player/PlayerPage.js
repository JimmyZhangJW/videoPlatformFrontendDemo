import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
import NoSelected from "./NoSelected";
import {useSelector} from "react-redux";

export default function PlayerPage(props) {
    const video = null;
    if (video === null) return <NoSelected/>

    const {title, description, videoURI} = video

    return (
        <React.Fragment>
            <div>
                {/* @TODO: render a video player when the provided video is not null */}
            </div>
        </React.Fragment>
    );

}
