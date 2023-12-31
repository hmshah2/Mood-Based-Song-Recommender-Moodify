import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from "react-player";

function App() {
  // setting default values of state variables
  const [show_result, set_show_result] = useState(false);
  const [happy_value, set_happy_value] = useState(50);
  const [sad_value, set_sad_value] = useState(50);
  const [angry_value, set_angry_value] = useState(50);
  const [romantic_value, set_romantic_value] = useState(50);
  const [anxious_value, set_anxious_value] = useState(50);
  const [song_link, set_song_link] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

  async function handleOnClick() { 
    set_show_result(true);
    const moods = {"happy_value":happy_value, "sad_value": sad_value, "angry_value":angry_value, "romantic_value":romantic_value, "anxious_value":anxious_value };
    let headerData = new Headers();
    headerData.append('Accept', '*'); // CORS permissions
    headerData.append("Access-Control-Allow", "*");
    headerData.append('Content-Type', 'application/json');
    headerData.append('Access-Control-Allow-Origin', '*');
    headerData.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headerData.append("Access-Control-Allow-Headers", "*");
    const response = await axios.post(
      'http://127.0.0.1:5000/',
      {"happy_value":happy_value, "sad_value": sad_value, "angry_value":angry_value, "romantic_value":romantic_value, "anxious_value":anxious_value },
      { headers: headerData }
    );
    set_song_link(response.data); // connecting the FLASK API to the React Frontend
    if (response.ok) {
      console.log("response worked!");
    }
  }
  
 
  return (
    <div className="App-body" align="center">
      <header className="App-header">
        <p align = "left">
         CS222 PROJECT
        </p>
      </header>
      
      <h1 color="white">MOOD-BASED SONG RECOMMENDATIONS</h1>
      
      <Container  maxWidth="sm" >
        <Grid container>
        {show_result === false &&
        <Grid item xs={"auto"}>
          <h2>What's the mood today?</h2> 
          Happy
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => set_happy_value(e.target.value)}
          />
          Sad
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => set_sad_value(e.target.value)}
          />
          Angry
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => set_angry_value(e.target.value)}
          />
          Romantic
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => set_romantic_value(e.target.value)}
          />
          Anxious
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => set_anxious_value(e.target.value)}
          />
          <Button variant="contained" color="success" onClick = {handleOnClick} >
            Done
          </Button>
        </Grid>
}
        {show_result === true &&
        <Grid item xs={"auto"}>
          <h2 >Here is your song for the day</h2>
          <h3><a href={song_link}>Visit Spotify</a></h3>
          <ReactPlayer url="https://www.youtube.com/watch?v=jPDKi-i618U" />
          <Button variant="contained" color="success" onClick={() => set_show_result(false)}>
            Back
          </Button>
        </Grid>
}
      </Grid>
      </Container>
    </div>
  );
}

export default App;
