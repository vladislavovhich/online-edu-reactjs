import { Api } from "./api";
import { User } from "../types/auth.types";
import { AxiosError } from "axios";
import { UserUpdate } from "../types/user.types";

export const UserApi = {
    async findOne(userId: number) {
        try {
            const response = await Api.get<{ user: User }>(`/users/${userId}`);

            return response.data.user;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async update(data: UserUpdate) {
        try {
            const { password, name, surname } = data;
            const response = await Api.patch<{ user: User }>(`/users`, {
                name,
                surname,
                password,
            });

            return response.data.user;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },
};
