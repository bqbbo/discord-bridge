import { DropdownInput } from "./Button";

import "../styles/ServerSelect.css";

const ServerSelect = () => {
    return (
        <div className="server-select">
            <div className="server-select-input">
                <p>Select Server</p>
                <DropdownInput
                    className="server-select-dropdown"
                    placeholder="No servers available"
                    options={[]}
                    onChange={() => {}}
                />
            </div>
            <div className="server-select-info">
                <p>Server Name: </p>
                <p>Permissions: </p>
                <p>DB ServerID: </p>
            </div>
        </div>
    );
};

export default ServerSelect;
