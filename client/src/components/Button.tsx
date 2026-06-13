import "../styles/Button.css";

type ButtonProps = {
    text: string;
    onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button className="button component-voice" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
