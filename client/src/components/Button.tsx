import "../styles/Button.css";

type TextInputProps = {
    placeholder: string;
    onChange: ((value: string) => void) | undefined;
    className?: string;
};

type DropdownInputProps = {
    placeholder: string;
    options: Array<{ label: string; value: string }>;
    onChange: ((value: string) => void) | undefined;
    value?: string | null;
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
    value,
    className,
}: DropdownInputProps) => {
    return (
        <select
            className={`dropdown-input component-input ${className || ""}`}
            value={value ?? ""}
            onChange={(e) => onChange && onChange(e.target.value)} // Call useState setter provided by parent component
        >
            {/* Default option on page load */}
            <option value="" disabled hidden>
                Select a server.
            </option>

            {/* If there are no options, show a visible disabled message */}
            {options.length === 0 ?
                <option value="" disabled>
                    {placeholder}
                </option>
            :   options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))
            }
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
