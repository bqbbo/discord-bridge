import Button from "./Button";

const VoiceControl = () => {
    return (
        <div className="voice-control">
            <Button
                text="Voice Control"
                onClick={() => console.log("Voice Control Clicked")}
            />
        </div>
    );
};

export default VoiceControl;
