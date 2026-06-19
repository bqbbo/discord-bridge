import { useState } from "react";
import { Statuses } from "../types/statuses";
import { StatusContext } from "./StatusContext";

const StatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<Statuses>({
        status: "disconnected",
    });

    return (
        <StatusContext.Provider value={{ status, setStatus }}>
            {children}
        </StatusContext.Provider>
    );
};

export default StatusProvider;
