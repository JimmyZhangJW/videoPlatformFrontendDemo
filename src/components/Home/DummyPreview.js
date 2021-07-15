import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/core/Skeleton";
import Box from "@material-ui/core/Box";

/**
 * Render a dummy preview (placeholder) on the homepage
 * @param props requires an id
 * @returns {JSX.Element}
 * @constructor
 */
export default function DummyPreview(props) {
    return (
        <Grid key={"dummy-preview-" + props.id} item xs={4}>
            <Box>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    style={{maxWidth: 345}}
                    width="100%"
                    height={200}
                />
                <Skeleton animation="wave" style={{maxWidth: 345}} width="100%"/>
                <Skeleton animation="wave" style={{maxWidth: 345}} width="100%"/>
                <Skeleton animation="wave" style={{maxWidth: 345}} width="100%"/>
                <Skeleton animation="wave" width="60%"/>
            </Box>
        </Grid>
    );
}
