import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/core/Skeleton";
import VideoPreview from "./VideoPreview";
import { useSelector } from "react-redux";

const generateDummy = num => {
  let ids = [];
  for (let i = 0; i < num; i++) {
    ids.push(i);
  }
  return ids.map(id => {
    return (
      <Grid key={"dummy" + id} item xs={4}>
        <Box>
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{ maxWidth: 345 }}
            width="100%"
            height={200}
          />
          <Skeleton animation="wave" style={{ maxWidth: 345 }} width="100%" />
          <Skeleton animation="wave" style={{ maxWidth: 345 }} width="100%" />
          <Skeleton animation="wave" style={{ maxWidth: 345 }} width="100%" />
          <Skeleton animation="wave" width="60%" />
        </Box>
      </Grid>
    );
  });
};

const generatePreviews = previews => {
  return previews.map((video, id) => {
    return (
      <Grid key={"cardGrid" + id} item xs={4}>
        <VideoPreview
          id={id}
          title={video.title}
          url={"http://localhost:8080/" + video.videoURI}
          avatarImg={video.avatarImg}
          description={video.description}
        />
      </Grid>
    );
  });
};

export default function HomePage() {
  const previews = useSelector(state => state.player.allVideos);
  return (
    <div>
      <Grid container spacing={2} rowSpacing={4}>
        {generatePreviews(previews)}
        {generateDummy(20)}
      </Grid>
    </div>
  );
}
