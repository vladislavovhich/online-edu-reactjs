export interface Lecture {
    id: number;
    name: string;
    description: string;
    subject: string;
    date: string;
    isOver: boolean;
    fileUrl: string;
    createdAt: string;
}

export interface LectureUpdate extends Lecture {
    id: number;
}

export interface LectureCreate {
    courseId: number;
    name: string;
    description: string;
    subject: string;
    date: Date;
}
