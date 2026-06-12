import Header from "./components/Header";
import ChannelList from "./components/ChannelList";
import DiscordBody from "./components/DiscordBody";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
    return (
        <div id="app">
            <Header />
            <ChannelList />
            <DiscordBody />
            <Footer />
        </div>
    );
};

export default App;
