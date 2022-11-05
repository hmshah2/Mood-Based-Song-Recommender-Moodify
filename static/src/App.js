import logo from './logo.svg';
import './App.css';
import Slider from '@mui/material/Slider';





function App() {
  
  return (
    <div className="App">
      <h1> Mood-based Spotify song recommendations </h1>
      <header className="App-header">
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
      </header>
      {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack> */}
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
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
