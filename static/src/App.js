import logo from './logo.svg';
import './App.css';
// import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

function App() {
  const [showResult, setShowResult] = useState(false);
  const muiTheme = createMuiTheme({});

  return (
    <div className="App-body" align="center">
      <header className="App-header">
        <p align = "left">
         CS222 PROJECT
        </p>
      </header>
      <h1 color= "white">MOOD-BASED SONG RECOMMENDATIONS</h1>
      <Container  maxWidth="sm" >
        <Grid container>
        {showResult == false &&
        <Grid item xs={"auto"}>
          <h2>What's the mood today?</h2>
          mood 1
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
          />

          mood 2
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
          />

          mood 3
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
          />

          mood 4
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
          />

          mood 5
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
          />
          <Button variant="contained" color="success" onClick = {() => setShowResult(true)}>
            Done
          </Button>
        </Grid>
}
        {showResult == true &&
        <Grid item xs={"auto"}>
          <h2>Here is your song for the day</h2>
          

          <ThemeProvider>
            <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
          </ThemeProvider>;

          <Button variant="contained" color="success" onClick = {() => setShowResult(false)}>
            Back
          </Button>
        </Grid>
}
      </Grid>
      </Container>
      {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack> */}
      {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      {/* <Slider
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={"valuetext"}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      /> */}
    </div>
  );
}

export default App;
