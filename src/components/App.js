import React from "react";
import "./App.css";
import LeftPanel from "./Nav/LeftPanel";
import PlayerPage from "./Player/PlayerPage";
import Grid from "@material-ui/core/Grid";
import HomePage from "./Home/HomePage";
import {useSelector} from "react-redux";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {IndexHomePage, IndexPlayerPage, IndexUploadPage} from "../stateSlices/indexSlice";
import UploadPage from "./Upload/UploadPage";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

function App() {
    const index = useSelector(state => state.indexer.selectedIndex);

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <Grid container spacing={0}>
                    <Grid item xs={1.5}>
                        <div className="LeftPanel">
                            <LeftPanel/>
                        </div>
                    </Grid>
                    <Grid item xs={10.5}>
                        <div className="MainArea">
                            <div hidden={index !== IndexHomePage}><HomePage/></div>
                            <div hidden={index !== IndexPlayerPage}><PlayerPage hidden={index !== IndexPlayerPage}/></div>
                            <div hidden={index !== IndexUploadPage}><UploadPage/></div>
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default App;
