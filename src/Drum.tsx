import React, { useState } from "react";
import { AudioClip } from "./types";
 
interface DrumProps {
    audioClip: AudioClip; // to manage the audio play
    isPowerOn: boolean; // to handle power button state
    onMousePlay: () => void; // to handle mouse play
}

const Drum: React.FC<DrumProps> = ({ audioClip, isPowerOn, onMousePlay }) => {
    const [isActive, setIsActive] = useState(false);
    
    const handleMouseDown = () => {
        setIsActive(true);
        onMousePlay(); // Calling the onMousePlay function passed from the parent
    };

    const handleMouseUp = () => {
        setIsActive(false);
    }

    return (
        <button
            className={`drum-pad ${isActive ? "active" : ""}`} // backticks allows JS expressions to be embedded within a string
            id={`drum-${audioClip.keyTrigger}`} // unique identifier for each drum pad button based on its trigger key
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            tabIndex={0} // allow the button to be focused and receive key events  
            disabled={!isPowerOn}
        >
            <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
            {audioClip.keyTrigger}
        </button>
    )
}

export default Drum;
