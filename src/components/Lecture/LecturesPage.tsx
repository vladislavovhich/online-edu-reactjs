import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../../types/auth.types";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { WithPrealoader } from "../common/WithPreloader";
import { LecturesList } from "./LecturesList";
import { useDispatch } from "react-redux";
import { getLectures } from "../../store/slices/course-full.slice";
import { GetCourse } from "../../types/course.types";

interface Props {
    course: GetCourse;
    user: User | null;
    courseMentorId: number;
}

export const LecturesPage = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { lectures, getLectures: getLecturesThunk } = useSelector(
        (state: RootState) => state.courseFull
    );

    useEffect(() => {
        dispatch(getLectures(props.course.id));
    }, [props.course.id]);

    return (
        <div className="d-flex flex-column">
            <h3 className="h3 text-darker">Лекции</h3>

            <hr className="mt-0 mb-3" />

            {props.user && props.user.id == props.course.mentor.id && (
                <Link
                    to={`/courses/${props.course.id}/add-lecture`}
                    className="btn-darker"
                >
                    Добавить лекцию
                </Link>
            )}

            <WithPrealoader status={getLecturesThunk.status}>
                <LecturesList
                    lectures={lectures}
                    course={props.course}
                    user={props.user}
                />
            </WithPrealoader>
        </div>
    );
};
