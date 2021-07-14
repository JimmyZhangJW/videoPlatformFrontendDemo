import React from "react";
import "./App.css";
import LeftPanel from "./Nav/LeftPanel";
import Player from "./Player/Player";
import UploadStepper from "./Upload/UploadStepper";
import Grid from "@material-ui/core/Grid";
import HomePage from "./Home/HomePage";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function App() {
  const index = useSelector(state => state.indexer.selectedIndex);

  let mainComponent;
  if (index === 0) {
    mainComponent = <HomePage />;
  } else if (index === 1) {
    mainComponent = <Player />;
  } else if (index === 2) {
    mainComponent = <UploadStepper />;
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Grid container spacing={0}>
          <Grid item xs={1.5}>
            <div className="LeftPanel">
              <LeftPanel />
            </div>
          </Grid>
          <Grid item xs={10.5}>
            <div className="MainArea">{mainComponent}</div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
