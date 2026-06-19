import Header from "./components/Header";
import ChannelList from "./components/ChannelList";
import DiscordBody from "./components/DiscordBody";
import Footer from "./components/Footer";

import handleStatusChange from "./scripts/status";
import { useEffect } from "react";
import { botSocket } from "./scripts/botSocket";
import { Statuses } from "./types/statuses";
import { useStatus } from "./contexts/StatusContext";

import "./styles/App.css";
import "./styles/Color.css";

const App = () => {
    const { setStatus } = useStatus();

    /*
    /  The code below is a workaround for using setStatus in a non-react environment;
    /  This attaches a socketIO listener to the app component itself
    /  and passes in the setter, instead of using the setter directly in a TypeScript file.
    /  setStatus never changes, so it is safe to include in the dependency array.
    */

    useEffect(() => {
        const onStatus = (update: Statuses) => {
            handleStatusChange(update, setStatus);
        };

        botSocket.on("bot:status", onStatus);

        return () => {
            botSocket.off("bot:status", onStatus);
        };
    }, [setStatus]);

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
