import React from "react";
import "./Player.css";
import Alert from "@material-ui/core/Alert";

export default function NoSelected() {
    return (
        <Alert variant="filled" severity="info">
            您还没有选择播放的视频哦
        </Alert>
    );
}
