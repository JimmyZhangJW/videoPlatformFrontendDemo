import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {CardActionArea} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useDispatch} from "react-redux";
import {setSelectedVideo} from "../../stateSlices/playerSlice";
import {IndexPlayerPage, setIndex} from "../../stateSlices/indexSlice";

/**
 * Render a video preview on the homepage
 * @param props requires a video and its id
 * @returns {JSX.Element}
 * @constructor
 */
export default function VideoPreview(props) {
    const {avatarImg, title, description} = props.video
    const dispatch = useDispatch();

    return (
        <Grid key={"video-preview-" + props.id} item xs={4}>
            <Card elevation={7} style={{maxWidth: 345, maxHeight: 500}}>
                <CardActionArea onClick={() => {
                    dispatch(setSelectedVideo(props.video))
                    dispatch(setIndex(IndexPlayerPage))
                }}>
                    <CardMedia style={{height: 200}} image={avatarImg}/>
                    <CardContent style={{alignItems: "left"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography
                            style={{height: 50, overflow: "scroll"}}
                            variant="body2"
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
