import APIForm from "./APIForm";
import VoiceControl from "./VoiceControl";
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
            <APIForm />
            <ChannelText />
            <div className="copyright">
                <p>
                    &copy; {getYear()} Discord Bridge - For non-commercial use
                    only.
                </p>
            </div>
        </div>
    );
};

export default Footer;
