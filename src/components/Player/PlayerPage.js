import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
import NoSelected from "./NoSelected";
import {useSelector} from "react-redux";

export default function PlayerPage(props) {
    const video = useSelector(state => state.player.selectedVideo);
    if (video === null) return <NoSelected/>

    const {title, description, videoURI} = video

    return (
        <React.Fragment>
            <div>
                <h2 className="Title"> {title} </h2>
                <ReactPlayer
                    url={videoURI}
                    controls={true}
                    width="90%"
                    height="90%"
                    playing={true}
                    pip={props.hidden}
                />
                <p className="Description"> {description}</p>
            </div>
        </React.Fragment>
    );

}
