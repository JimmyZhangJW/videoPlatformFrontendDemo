import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../stateSlices/indexSlice";
import { setSelectedVideo } from "../../stateSlices/playerSlice";

export default function VideoPreview(props) {
  const dispatch = useDispatch();
  const video = useSelector(state => state.player.allVideos[props.id]);
  const videoClicked = () => {
    dispatch(setSelectedVideo(video));
    dispatch(setIndex(1));
  };
  return (
    <Card elevation={7} style={{ maxWidth: 345, maxHeight: 500 }}>
      <CardActionArea onClick={videoClicked}>
        <CardMedia style={{ height: 200 }} image={props.avatarImg} title="" />
        <CardContent style={{ alignItems: "left" }}>
          <Typography gutterBottom variant="h6" component="div">
            {props.title}
          </Typography>
          <Typography
            style={{ height: 50, overflow: "scroll" }}
            variant="body2"
            color="text.secondary"
          >
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
