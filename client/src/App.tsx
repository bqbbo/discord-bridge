import Header from "./components/Header";
import ChannelList from "./components/ChannelList";
import DiscordBody from "./components/DiscordBody";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <ChannelList />
                <DiscordBody />
            </main>
            <Footer />
        </div>
    );
};

export default App;
