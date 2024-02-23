interface PowerButtonProps {
    isPowerOn: boolean; // to handle power button state
    togglePower: () => void; // to handle toggle power
}

const PowerButton = ({ isPowerOn, togglePower }: PowerButtonProps) => {
    return (
        <div className="power-button" onClick={togglePower}>
            {isPowerOn ? "OFF" : "ON"}
        </div>
    );
}

export default PowerButton;