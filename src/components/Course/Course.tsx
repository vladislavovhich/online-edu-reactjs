import React from "react";
import { Link } from "react-router-dom";
import { GetCourse } from "../../types/course.types";
import { User } from "../../types/auth.types";
import { CourseTopBar } from "./CourseTopBar";
import { CourseInfo } from "./CourseInfo";

interface Props extends GetCourse {
    currentUserId: number | undefined;
    authorizedUserId: number | undefined;
    index: number;
    currentUser: User | null;
}

export const Course = (props: Props) => {
    const mentor = props.mentor;
    const canEditCourses =
        !!props.currentUserId &&
        !!props.authorizedUserId &&
        props.authorizedUserId == props.mentor.id;

    return (
        <div
            className={`d-flex flex-column border px-4 py-4 mt-3 border-rounded`}
        >
            <CourseTopBar
                mentor={mentor}
                canEditCourses={canEditCourses}
                courseId={props.id}
                currentUser={props.currentUser}
            />

            <hr className="my-2" />

            <CourseInfo
                name={props.name}
                description={props.description}
                extraClass="justify-content-between"
            />

            <hr className="my-2" />

            <div className="d-flex flex-column">
                <Link
                    className="badge bg-darker text-wrap"
                    to={`/courses/${props.id}`}
                >
                    Подробнее...
                </Link>

                <hr className="my-2 mb-0" />

                <div className="badge bg-darker text-wrap mt-2">
                    Студентов: {props.studentsAmount}
                </div>
                <div className="badge bg-darker text-wrap mt-2 ">
                    Лекций: {props.lecturesAmount}
                </div>
            </div>
        </div>
    );
};
