import ServerSelect from "./ServerSelect";
import MiscButtons from "./MiscButtons";

import { headerStatus, headerStatusIcon } from "../scripts/statusRendering";
import useStatus from "../contexts/StatusContext";

import "../styles/Header.css";

const Header = () => {
    const { status } = useStatus();

    return (
        <header className="header component-secondary">
            <div className="status-box">
                <img
                    className="status-icon"
                    src={headerStatusIcon(status)}
                    alt="Status Icon"
                />
                <p id="status-text" className="status-text">
                    {headerStatus(status)}
                </p>
            </div>
            <div className="app-title">Discord Bridge</div>
            <ServerSelect />
            <MiscButtons />
        </header>
    );
};

export default Header;
