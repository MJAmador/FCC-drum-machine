interface VolumeBarProps {
    volume: number; // to make the volume level visual
    handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // to set the volume level
}

const volumeBar = ({ volume, handleVolumeChange }: VolumeBarProps) => {
    return (
        <div className="volume-bar">
            <input 
                type="range" 
                name="volume" 
                id="volume" 
                min="0" 
                max="100" 
                title="Volume Control" 
                placeholder="Adjust Volume"
                value={volume} 
                onChange={handleVolumeChange} 
            />
        </div>
    );
}

export default volumeBar;