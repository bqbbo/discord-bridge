import "../styles/Button.css";

type TextInputProps = {
    placeholder: string;
    onChange: ((value: string) => void) | undefined;
    className?: string;
};

type DropdownInputProps = {
    placeholder: string;
    options: string[];
    onChange: ((value: string) => void) | undefined;
    className?: string;
};

type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
};

type SocialButtonProps = {
    text: string;
    image: string;
    link: string;
};

const TextInput = ({ placeholder, onChange, className }: TextInputProps) => {
    return (
        <input
            className={`text-input component-input ${className || ""}`}
            type="text"
            placeholder={placeholder}
            onChange={(e) => onChange && onChange(e.target.value)} // Call useState setter provided by parent component
        />
    );
};

const DropdownInput = ({
    placeholder,
    options,
    onChange,
    className,
}: DropdownInputProps) => {
    return (
        <select
            className={`dropdown-input component-input ${className || ""}`}
            onChange={(e) => onChange && onChange(e.target.value)} // Call useState setter provided by parent component
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
            {options.length === 0 && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
        </select>
    );
};

const Button = ({ text, onClick, className }: ButtonProps) => {
    return (
        <button
            className={`button component-button ${className || ""}`}
            onClick={onClick}
        >
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

export { TextInput, DropdownInput, Button, SocialButton };
