import React from "react";
import "./App.css";
import LeftPanel from "./Nav/LeftPanel";
import Grid from "@material-ui/core/Grid";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

function App() {

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
                            { /* @TODO: render three different pages */ }
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default App;
