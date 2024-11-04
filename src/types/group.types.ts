import { User } from "./auth.types";
import { Pagination } from "./common.types";
import { Message } from "./message.types";

export interface Group {
    id: number;
    name: string;
    description: string;
    creator: User;
    members: User[];
    lastMessage: Message | null;
}

export interface CreateGroup {
    name: string;
    description: string;
}

export interface UpdateGroup extends CreateGroup {
    id: number;
}

export interface GroupPagination extends Pagination {
    userId: number;
}
