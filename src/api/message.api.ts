import { AxiosError } from "axios";
import {
    CreateMessage,
    Message,
    MessagePagination,
} from "../types/message.types";
import { Api } from "./api";
import { PaginationResponse } from "../types/common.types";

export const MessageApi = {
    getMessages: async (data: MessagePagination) => {
        try {
            const { groupId, page, pageSize } = data;

            const response = await Api.get<PaginationResponse<Message>>(
                `/groups/${groupId}/messages`,
                { params: { page, pageSize } }
            );

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    sendMessage: async (data: CreateMessage) => {
        try {
            const response = await Api.post<{ message: Message }>(
                `/groups/${data.groupId}/messages`,
                { text: data.text }
            );

            return response.data.message;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },
};
