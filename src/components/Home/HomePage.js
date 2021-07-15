import React from "react";
import Grid from "@material-ui/core/Grid";
import VideoPreview from "./VideoPreview";
import DummyPreview from "./DummyPreview";

import { useSelector } from "react-redux";

/**
 * Render a homepage with video previews and dummy placeholders
 * @returns {JSX.Element}
 * @constructor
 */
export default function HomePage() {
  const videos = useSelector(state => state.player.allVideos);

  return (
    <div>
      <Grid container spacing={2} rowSpacing={4}>
        {/*render video previews*/}
        {videos.map((video, idx) => <VideoPreview video={video} id={idx}/>)}

        {/*render video placeholders*/}
        {[...Array(20)].map(() => <DummyPreview/> )}
      </Grid>
    </div>
  );
}
