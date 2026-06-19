import useGuild from "../contexts/GuildContext";

import "../styles/ChannelList.css";

const ChannelList = () => {
    const { guild } = useGuild();

    return (
        <aside className="channel-list component-primary">
            <div className="channel-list-header">
                <h2>Channels</h2>
            </div>
            <div className="channel-list-entries">
                <h2>{guild?.name}</h2>
            </div>
        </aside>
    );
};

export default ChannelList;
