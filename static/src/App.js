import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from "react-player";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [happyValue, setHappyValue] = useState(50);
  const [sadValue, setSadValue] = useState(50);
  const [angryValue, setAngryValue] = useState(50);
  const [romanticValue, setRomanticValue] = useState(50);
  const [anxiousValue, setAnxiousValue] = useState(50);
  const [songLink, setSongLink] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

 
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
        {showResult === false &&
        <Grid item xs={"auto"}>
          <h2>What's the mood today?</h2>
          Happy
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => setHappyValue(e.target.value)}
          />
          Sad
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => setSadValue(e.target.value)}
          />
          Angry
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => setAngryValue(e.target.value)}
          />
          Romantic
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => setRomanticValue(e.target.value)}
          />
          Anxious
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            className="App-slider"
            onChange={(e) => setAnxiousValue(e.target.value)}
          />
          <Button variant="contained" color="success" onClick = {async () => { setShowResult(true);
          const moods = {"happyValue":happyValue, "sadValue": sadValue, "angryValue":angryValue, "romanticValue":romanticValue, "anxiousValue":anxiousValue };
          console.log(JSON.stringify(moods));
          let headerData = new Headers();
          headerData.append('Accept', '*');
          headerData.append("Access-Control-Allow", "*");
          headerData.append('Content-Type', 'application/json');
          headerData.append('Access-Control-Allow-Origin', '*');
          headerData.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          headerData.append("Access-Control-Allow-Headers", "*");
          const response = await axios.post(
            'http://127.0.0.1:5000/',
            {"happyValue":happyValue, "sadValue": sadValue, "angryValue":angryValue, "romanticValue":romanticValue, "anxiousValue":anxiousValue },
            { headers: headerData }
          );
          
          console.log(response);
          setSongLink(response.data);
          if (response.ok) {
            console.log("response worked!");
          }
         }} >
            Done
          </Button>
        </Grid>
}
        {showResult === true &&
        <Grid item xs={"auto"}>
          <h2 >Here is your song for the day</h2>
          <h2><a href={songLink}>Visit Spotify</a></h2>
          <ReactPlayer url="https://www.youtube.com/watch?v=jPDKi-i618U" />
          <Button variant="contained" color="success" onClick = {() => setShowResult(false)}>
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
