import React from "react";
import { Lecture as Lecturetype } from "../../types/lecture.types";
import { Lecture } from "./Lecture";
import { GetCourse } from "../../types/course.types";
import { User } from "../../types/auth.types";

interface Props {
    lectures: Lecturetype[];
    course: GetCourse;
    user: User | null;
}

export const LecturesList = (props: Props) => {
    return (
        <div className="d-flex flex-column mt-3">
            {props.lectures.map((lecture, index) => (
                <Lecture
                    {...lecture}
                    course={props.course}
                    user={props.user}
                    key={index.toString()}
                />
            ))}
        </div>
    );
};
