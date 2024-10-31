import { User } from "./auth.types"

export interface Course {
    name: string
    description: string
}

export interface CourseUpdate extends Course {
    courseId: number
}

export interface GetCourse {
    id: number
    name: string
    description: string
    studentsAmount: number
    lecturesAmount: number
    mentor: User
    createdAt: string
}