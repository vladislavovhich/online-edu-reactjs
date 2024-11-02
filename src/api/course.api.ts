import { AxiosError } from "axios";
import {
    Pagination,
    PaginationResponse,
    UserCoursesPagination,
} from "../types/common.types";
import { Course, CourseUpdate, GetCourse } from "../types/course.types";
import { Api } from "./api";

export const CourseApi = {
    async loadCourses(data: UserCoursesPagination) {
        const { userId, page, pageSize } = data;

        try {
            const response = await Api.get<PaginationResponse<GetCourse>>(
                `/users/${userId}/courses`,
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

    async getCourses(userId: number) {
        try {
            const response = await Api.get<PaginationResponse<GetCourse>>(
                `/users/${userId}/courses`
            );

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async findOne(courseId: number) {
        try {
            const response = await Api.get<{ course: GetCourse }>(
                `/courses/${courseId}`
            );

            return response.data.course;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async create(data: Course) {
        try {
            const response = await Api.post<{ course: Course }>(
                "/courses",
                JSON.stringify(data)
            );

            return response.data.course;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async update(data: CourseUpdate) {
        try {
            const { name, description } = data;

            const response = await Api.patch<{ course: Course }>(
                `/courses/${data.courseId}`,
                JSON.stringify({
                    name,
                    description,
                })
            );

            return response.data.course;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async delete(courseId: number) {
        try {
            const response = await Api.delete<string>(`/courses/${courseId}`);

            return response.data;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },
};
