import { Dispatch, SetStateAction } from "react";
import { Statuses } from "../types/statuses";

const handleUpdateStatus = async (update: string) => {
    console.log("Bot update:", update); // Implement update handling here
};

const handleErrorStatus = async (error: string) => {
    console.error("Bot error:", error); // Implement alert system here
};

const handleStatusChange = async (
    socketStatus: Statuses,
    setStatus: Dispatch<SetStateAction<Statuses>>,
) => {
    setStatus(socketStatus);

    if (socketStatus.status === "error") {
        handleErrorStatus(socketStatus.message || "An unknown error occurred.");
    } else if (socketStatus.status === "update") {
        handleUpdateStatus(
            socketStatus.message || "The server issued an unknown update.",
        );
    } else {
        console.log("Bot status changed:", socketStatus.status); // Implement UI update here
    }
};

export default handleStatusChange;
