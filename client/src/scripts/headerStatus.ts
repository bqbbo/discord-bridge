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

export { headerStatus, headerStatusIcon };
