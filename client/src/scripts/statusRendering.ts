import { Statuses, RenderStatus } from "../types/statuses";

const headerStatus = (status: Statuses) => {
    return RenderStatus[status.status];
};

const headerStatusIcon = (status: Statuses) => {
    switch (status.status) {
        case "connected":
            return "/img/connected.png";
        case "update":
            return "/img/connected.png";
        default:
            return "/img/disconnected.png";
    }
};

const APIFormUser = (status: Statuses) => {
    if (status.status === "connected" || status.status === "update") {
        return status.tag;
    }
    return "Unknown";
};

export { headerStatus, headerStatusIcon, APIFormUser };
