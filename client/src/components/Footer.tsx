import { SocialButton } from "./Button";
import VoiceControl from "./VoiceControl";
import NetStats from "./NetStats";
import APIForm from "./APIForm";
import ChannelText from "./ChannelText";

import "../styles/Footer.css";

const getYear = () => {
    const date = new Date();
    return date.getFullYear();
};

const Footer = () => {
    return (
        <footer className="footer component-tertiary">
            <VoiceControl />
            <NetStats />
            <APIForm />
            <ChannelText />
            <div className="webnote-container">
                <div className="copyright component-tertiary">
                    <p>
                        &copy; {getYear()} Discord Bridge - For non-commercial
                        use only.
                    </p>
                </div>
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
            </div>
        </footer>
    );
};

export default Footer;
