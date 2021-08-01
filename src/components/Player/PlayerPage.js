import React, {useState} from "react";
import ReactPlayer from "react-player";
import "./Player.css";
import NoSelected from "./NoSelected";
import {useSelector} from "react-redux";

export default function PlayerPage(props) {
    const [playing, setPlaying] = useState(true)
    const video = useSelector(state => state.player.selectedVideo);
    if (video === null) return <NoSelected/>
    const {title, description, url} = video


    return (
        <React.Fragment>
            <div>
                <h2 className="Title"> {title} </h2>
                <ReactPlayer
                    url={url}
                    controls={true}
                    width="90%"
                    height="90%"
                    playing={playing}
                    pip={props.hidden && playing}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                />
                <p className="Description"> {description}</p>
            </div>
        </React.Fragment>
    );

}
