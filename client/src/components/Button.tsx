import "../styles/Button.css";

type ButtonProps = {
    text: string;
    onClick: () => void;
};

type SocialButtonProps = {
    text: string;
    image: string;
    link: string;
};

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button className="button component-voice" onClick={onClick}>
            {text}
        </button>
    );
};

const SocialButton = ({ text, image, link }: SocialButtonProps) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <img className="social-button" src={image} alt={text} />
        </a>
    );
};

export { Button, SocialButton };
