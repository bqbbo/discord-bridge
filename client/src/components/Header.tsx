import ServerSelect from "./ServerSelect";
import MiscButtons from "./MiscButtons";

import "../styles/Header.css";

const Header = () => {
    return (
        <header className="header component-secondary">
            <div className="status-box">
                <img
                    className="status-icon"
                    src="/img/disconnected.png"
                    alt="Status Icon"
                />
                <p id="status-text" className="status-text">
                    Not connected.
                </p>
            </div>
            <div className="app-title">Discord Bridge</div>
            <ServerSelect />
            <MiscButtons />
        </header>
    );
};

export default Header;
