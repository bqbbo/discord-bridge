import { useState } from "react";
import { Button, TextInput } from "./Button";
import { handleConnect } from "../scripts/botSocket";

import "../styles/APIForm.css";

const APIForm = () => {
    const [token, setToken] = useState("");
    return (
        <div className="api-form component-secondary">
            <div className="api-form-input">
                <TextInput
                    className="api-form-token-input"
                    placeholder="Enter API Key"
                    onChange={setToken}
                />
                <Button
                    className="api-form-connect-button"
                    text="Connect"
                    onClick={async () => await handleConnect(token)}
                />
            </div>
            <div className="api-form-info">API Form Info</div>
        </div>
    );
};

export default APIForm;
