import { AxiosError } from "axios";
import { Api } from "./api";
import { Lecture, LectureCreate, LectureUpdate } from "../types/lecture.types";

export const LectureApi = {
    async create(data: LectureCreate) {
        try {
            const { name, description, subject, date, courseId } = data;
            const response = await Api.post<{ lecture: Lecture }>(
                `/courses/${courseId}/lectures`,
                {
                    name,
                    description,
                    subject,
                    date,
                }
            );

            return response.data.lecture;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async update(data: LectureUpdate) {
        try {
            const { name, description, subject, date, id } = data;

            const response = await Api.patch<{ lecture: Lecture }>(
                `/lectures/${id}`,
                {
                    name,
                    description,
                    subject,
                    date,
                }
            );

            return response.data.lecture;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async delete(lectureId: number) {
        try {
            await Api.delete(`/lectures/${lectureId}`);
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async online(lectureId: number) {
        try {
            await Api.put(`/lectures/${lectureId}/online`);
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async offline(lectureId: number) {
        try {
            await Api.put(`/lectures/${lectureId}/offline`);
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async getLectures(courseId: number) {
        try {
            const response = await Api.get<{ lectures: Lecture[] }>(
                `/courses/${courseId}/lectures`
            );

            return response.data.lectures;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },

    async findOne(lectureId: number) {
        try {
            const response = await Api.get<{ lecture: Lecture }>(
                `/lectures/${lectureId}`
            );

            return response.data.lecture;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data);
            }

            throw e;
        }
    },
};
