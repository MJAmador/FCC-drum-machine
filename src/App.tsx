import "./App.css";
import { AudioClip } from "./types";
import Drum from "./Drum";
import PowerButton from './PowerButton';
import VolumeBar from './VolumeBar';
import BankSelector from './BankSelector';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const audioClipsBank1: AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];

const audioClipsBank2: AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    description: "Chord 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    description: "Chord 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    description: "Chord 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    description: "Shaker",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    description: "Open HH"
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    description: "Closed HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    description: "Punchy Kick",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    description: "Side Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    description: "Snare",
  },
]

function App() {
  const [isPowerOn, setIsPowerOn] = useState(true); //initial power state
  const [volume, setVolume] = useState(30); // initial volume value
  const [currentBank, setCurrentBank] = useState(1); // initial bank sounds

  // Selecting set of audio based on the value of currentBank
  const audioClips = currentBank === 1 ? audioClipsBank1 : audioClipsBank2;

  const buttonRef = useRef<HTMLButtonElement>(null);

  // hook to focuse on the drum pad when the page loads
  useEffect(() => {
      if (buttonRef.current) {
      buttonRef.current.focus();
      }
  }, []);

  // function to handle power
  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
  };

  // function to handle volume state
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);

    audioClips.forEach((clip) => { // itirates over each element in the "audioClips" array
      const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
      if (audioElement) {
        audioElement.volume = newVolume / 100; //"newVolume" is divided by 100 to convert it to the appropriarte range
      }
    });

    // This updates the display element to show the current volume level
    const displayElement = document.getElementById("display");
    if (displayElement) {
      displayElement.innerText = `Volume: ${newVolume}`; // if "displayElement" is found in the document, it updates its "innerText" property, displaying the current volume level interpolated witht the "newVolume" value
    }
  };

  // function to toggle between sound banks
  const changeBank = () => {
    setCurrentBank(currentBank === 1 ? 2 : 1);
  };

  // function to handle keyboard events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyTrigger = e.key.toUpperCase();
    const clip = audioClips.find((clip) => clip.keyTrigger === keyTrigger);
    if (clip && isPowerOn) {
      const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
      if (audioElement) {
        audioElement.currentTime = 0; // Ensures that the audio starts playing from the start each time is triggered
        audioElement.play();
        document.getElementById("display")!.innerText = clip.description;
        audioElement.parentElement?.classList.add("active"); // Adds the CSS class "active" to the parent element of the audio element, so a visual effect can be apply
        setTimeout(() => {
          // this removes the "active" class after a short delay (100 milliseconds)
          audioElement.parentElement?.classList.remove("active");
        }, 100);
      }
    }
  };

  return (
    <div className="container" id="drum-machine" onKeyDown={handleKeyPress}>
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum  
            key={clip.keyTrigger}
            audioClip={clip} 
            isPowerOn={isPowerOn}
            onMousePlay={() => {
              if (isPowerOn) {
                const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
                if (audioElement) {
                  audioElement.currentTime = 0;
                  audioElement.play();
                  document.getElementById("display")!.innerText = clip.description;
                }
              }
            }}
          />
        ))}
      </div>
      <div className="logo">
        <p className="inner-logo">FCC</p>
        <i className="inner-logo fab fa-free-code-camp"></i>
      </div>
      <div className="controls">
        <div>
          <button 
            type="button" 
            ref={buttonRef} 
            onClick={togglePower} 
            style={{ width: "50px"}}
          >
            <PowerButton isPowerOn={isPowerOn} togglePower={togglePower} />
          </button>
        </div>
        <div id="display">Volume: {volume}</div> 
        <div>
          <VolumeBar volume={volume} handleVolumeChange={handleVolumeChange} />
        </div>
        <div>
          <BankSelector currentBank={currentBank} changeBank={changeBank} />
        </div>    
      </div>
    </div>
  );
}

export default App;
