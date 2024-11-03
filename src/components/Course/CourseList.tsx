import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GetCourse } from "../../types/course.types";
import { Course } from "./Course";
import { thunkStatusType } from "../../store/store.types";
import { WithPrealoader } from "../common/WithPreloader";
import { User } from "../../types/auth.types";

interface Props {
    courses: GetCourse[];
    currentUser: User | null;
    currentUserId: number | undefined;
    authorizedUserId: number | undefined;
    loadCoursesFunc: () => void;
    nextPage: number | undefined;
    loadStatus: thunkStatusType;
}

export const CourseList = (props: Props) => {
    const {
        courses,
        currentUserId,
        authorizedUserId,
        loadCoursesFunc,
        nextPage,
        loadStatus,
    } = props;

    const handleOnClick = () => {
        loadCoursesFunc();
    };

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-column">
                {courses != undefined &&
                    courses.map((course, index) => (
                        <Course
                            {...course}
                            currentUserId={currentUserId}
                            authorizedUserId={authorizedUserId}
                            key={index.toString()}
                            index={index}
                            currentUser={props.currentUser}
                        />
                    ))}
                {nextPage && (
                    <WithPrealoader status={loadStatus}>
                        <button
                            className="btn-darker mt-3"
                            onClick={handleOnClick}
                        >
                            Load
                        </button>
                    </WithPrealoader>
                )}
            </div>
        </div>
    );
};
