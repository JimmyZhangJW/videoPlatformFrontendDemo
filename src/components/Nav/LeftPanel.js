import React from "react";
import List from "@material-ui/core/List";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import {useSelector, useDispatch} from "react-redux";
import {IndexHomePage, IndexPlayerPage, IndexUploadPage, setIndex} from "../../stateSlices/indexSlice";

export function LeftPanel() {
    const selectedIndex = useSelector(state => state.indexer.selectedIndex);
    const dispatch = useDispatch();
    return (
        <div>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    selected={selectedIndex === IndexHomePage}
                    onClick={() => dispatch(setIndex(IndexHomePage))}
                >
                    <ListItemIcon>
                        <MovieCreationIcon/>
                    </ListItemIcon>
                    <ListItemText primary="主页"/>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === IndexPlayerPage}
                    onClick={() => dispatch(setIndex(IndexPlayerPage))}
                >
                    <ListItemIcon>
                        <OndemandVideoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="播放器"/>
                </ListItemButton>
                <Divider/>
                <ListItemButton
                    selected={selectedIndex === IndexUploadPage}
                    onClick={() => dispatch(setIndex(IndexUploadPage))}
                >
                    <ListItemIcon>
                        <CloudUploadIcon/>
                    </ListItemIcon>
                    <ListItemText primary="上传"/>
                </ListItemButton>
            </List>
        </div>
    );
}

export default LeftPanel;
