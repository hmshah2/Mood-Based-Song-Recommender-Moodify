import logo from './logo.svg';
import './App.css';
// import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

function App() {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="App">
      <h1> Mood-based Spotify song recommendations </h1>

      <Container  maxWidth="sm">
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {showResult == false &&
        <Grid item xs={6}>
          <h2>What's the mood today?</h2>
          mood 1
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
          />

          mood 2
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
          />

          mood 3
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
          />

          mood 4
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
          />

          mood 5
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <Button variant="contained" color="success" onClick = {() => setShowResult(true)}>
            Done
          </Button>
        </Grid>
}
        {showResult == true &&
        <Grid item xs={6}>
          <h2>Here is your song for the day</h2>
          <Button variant="contained" color="success" onClick = {() => setShowResult(false)}>
            Back
          </Button>
        </Grid>
}
      </Grid>
      </Container>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          What's the mood today?
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
