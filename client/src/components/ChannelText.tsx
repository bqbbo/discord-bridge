import { TextInput, Button } from "./Button";

import "../styles/ChannelText.css";

const ChannelText = () => {
    return (
        <div className="channel-text component-secondary">
            <div className="channel-text-entry-container component-input">
                <TextInput
                    className="channel-text-input"
                    placeholder="Type a message..."
                    onChange={() => {}}
                />
                <Button className="emoji-button" text="😀" onClick={() => {}} />
            </div>
            <Button
                className="channel-text-input-button"
                text="Send"
                onClick={() => {}}
            />
        </div>
    );
};

export default ChannelText;
