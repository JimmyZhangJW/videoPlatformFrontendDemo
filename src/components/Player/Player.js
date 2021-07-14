import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
import NoSelected from "./NoSelected";
import { useSelector } from "react-redux";
export default function Player() {
  const selectedVideo = useSelector(state => state.player.selectedVideo);

  return (
    <React.Fragment>
      {Object.keys(selectedVideo).length === 0 ? (
        <NoSelected />
      ) : (
        <div>
          <h2 className="Title"> {selectedVideo.title} </h2>
          <ReactPlayer
            url={"http://localhost:8080/" + selectedVideo.videoURI}
            controls={true}
            width="90%"
            height="90%"
            playing={true}
          />
          <p className="Description"> {selectedVideo.description}</p>
        </div>
      )}
    </React.Fragment>
  );
}
