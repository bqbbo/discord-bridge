import "../styles/Header.css";

const Header = () => {
    return (
        <header className="header component-secondary">
            <div className="status-box">Not connected.</div>
            <div className="app-title">Discord Bridge</div>
            <div className="socials">Socials</div>
        </header>
    );
};

export default Header;
