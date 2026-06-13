import { SocialButton } from "./Button";

import "../styles/Header.css";

const Header = () => {
    return (
        <header className="header component-secondary">
            <div className="status-box">
                <img
                    class="status-icon"
                    src="/img/no-wifi.png"
                    alt="Status Icon"
                />
                <p id="status-text" className="status-text">
                    Not connected.
                </p>
            </div>
            <div className="app-title">Discord Bridge</div>
            <div className="socials">
                <SocialButton
                    text="GitHub"
                    image="/img/github.svg"
                    link="https://github.com/bqbbo/discord-bridge"
                />
                <SocialButton
                    text="Discord Developers"
                    image="/img/discord-dev.png"
                    link="https://discord.com/developers/applications"
                />
            </div>
        </header>
    );
};

export default Header;
