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
  return (
    <div>
      <Grid container spacing={2} rowSpacing={4}>
        {/* @TODO: how can you render video previews using VideoPreview? */}

        {/* @TODO: how can you render 20 video placeholders using DummyPreview? */}
      </Grid>
    </div>
  );
}
