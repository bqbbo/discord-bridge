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
        <div className="footer component-tertiary">
            <VoiceControl />
            <NetStats />
            <APIForm />
            <ChannelText />
            <div className="copyright component-tertiary">
                <p>
                    &copy; {getYear()} Discord Bridge - For non-commercial use
                    only.
                </p>
            </div>
        </div>
    );
};

export default Footer;
