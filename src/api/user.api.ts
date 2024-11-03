import { Api } from "./api";
import { User } from "../types/auth.types";
import { AxiosError } from "axios";
import { UserUpdate } from "../types/user.types";
import {
    Pagination,
    PaginationResponse,
    UserCoursesPagination,
} from "../types/common.types";
import { LectureUsersPagination } from "../types/course.types";

export const UserApi = {
    async findCourseStudents(data: LectureUsersPagination) {
        try {
            const { page, pageSize, courseId } = data;
            const response = await Api.get<PaginationResponse<User>>(
                `/courses/${courseId}/students`,
                {
                    params: { page, pageSize },
                }
            );

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async findMany(data: Pagination) {
        try {
            const response = await Api.get<PaginationResponse<User>>(`/users`, {
                params: data,
            });

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

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
