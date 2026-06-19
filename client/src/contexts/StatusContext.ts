import { useContext, createContext } from "react";
import { StatusContextType } from "../types/statuses";

const StatusContext = createContext<StatusContextType | null>(null);

const useStatus = () => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("useStatus must be used within a StatusProvider");
    }
    return context;
};

export { StatusContext, useStatus };
export default useStatus;
