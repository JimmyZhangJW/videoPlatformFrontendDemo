import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import VideoPreview from "./VideoPreview";
import DummyPreview from "./DummyPreview";

import {useSelector, useDispatch} from "react-redux";
import {setVideos} from "../../stateSlices/playerSlice"

/**
 * Render a homepage with video previews and dummy placeholders
 * @returns {JSX.Element}
 * @constructor
 */
export default function HomePage() {
    const videos = useSelector(state => state.player.allVideos);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchMyVideos() {
            let response = await fetch('http://localhost:8080/videoMetas')
            response = await response.json()
            dispatch(setVideos(response))
        }

        fetchMyVideos()
    }, [])

    return (
        <div>
            <Grid container spacing={2} rowSpacing={4}>
                {/*render video previews*/}
                {videos.map((video, idx) => <VideoPreview video={video} id={idx}/>)}

                {/*render video placeholders when the real video data is still loading*/}
                {videos.length === 0 && [...Array(10)].map(() => <DummyPreview/>)}
            </Grid>
        </div>
    );
}
