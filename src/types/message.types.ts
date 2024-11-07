import { User } from "./auth.types";
import { Pagination } from "./common.types";

export interface Message {
    id: number;
    text: string;
    sender: User;
    createdAt: Date;
}

export interface CreateMessage {
    groupId: number;
    text: string;
}

export interface UpdateMessage extends CreateMessage {
    id: number;
}

export interface MessagePagination extends Pagination {
    groupId: number;
}
