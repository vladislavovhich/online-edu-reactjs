import { User } from "./auth.types";

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
