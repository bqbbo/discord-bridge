import APIForm from "./APIForm";
import VoiceControl from "./VoiceControl";

import "../styles/Footer.css";

const getYear = () => {
    const date = new Date();
    return date.getFullYear();
};

const Footer = () => {
    return (
        <div className="footer">
            <APIForm />
            <VoiceControl />
            <div className="copyright">
                &copy; {getYear()} Discord Bridge - For non-commercial use only.
            </div>
        </div>
    );
};

export default Footer;
