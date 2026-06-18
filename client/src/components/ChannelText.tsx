import { useState } from "react";
import { TextInput, Button } from "./Button";
import { handleSendMessage } from "../scripts/botMessage";

import "../styles/ChannelText.css";

const ChannelText = () => {
    const [message, setMessage] = useState("");

    return (
        <div className="channel-text component-secondary">
            <div className="channel-text-entry-container component-input">
                <TextInput
                    className="channel-text-input"
                    placeholder="Type a message..."
                    onChange={setMessage}
                />
                <Button className="emoji-button" text="😀" onClick={() => {}} />
            </div>
            <Button
                className="channel-text-input-button"
                text="Send"
                onClick={async () => await handleSendMessage(message)}
            />
        </div>
    );
};

export default ChannelText;
