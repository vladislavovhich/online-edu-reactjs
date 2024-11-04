import { AxiosError } from "axios";
import { Pagination, PaginationResponse } from "../types/common.types";
import {
    CreateGroup,
    Group,
    GroupPagination,
    UpdateGroup,
} from "../types/group.types";
import { Api } from "./api";

export const GroupApi = {
    async findOne(groupId: number) {
        try {
            const response = await Api.get<{ group: Group }>(
                `/groups/${groupId}`
            );

            return response.data.group;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async getUserGroups(data: Pagination) {
        try {
            const response = await Api.get<PaginationResponse<Group>>(
                `/users/groups`,
                { params: data }
            );

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async getGroups(data: GroupPagination) {
        try {
            const { userId, page, pageSize } = data;
            const response = await Api.get<PaginationResponse<Group>>(
                `/users/${userId}/groups`,
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

    async create(data: CreateGroup) {
        try {
            const response = await Api.post<{ group: Group }>("/groups", data);

            return response.data.group;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async update(data: UpdateGroup) {
        try {
            const { id, name, description } = data;
            const response = await Api.patch<{ group: Group }>(
                `/groups/${id}`,
                { name, description }
            );

            return response.data.group;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async delete(groupId: number) {
        try {
            await Api.delete(`/groups/${groupId}`);
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },
};
