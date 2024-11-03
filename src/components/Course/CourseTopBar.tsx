import React, { useEffect } from "react";
import { User } from "../../types/auth.types";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../helpers/color-avatar.helper";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {
    restoreSubscribeThunk,
    setCourseId,
    subscribe,
    unsubscribe,
} from "../../store/slices/course-all.slice";
import { IconTextLink } from "../common/IconTextLink";
import { WithPrealoader } from "../common/WithPreloader";
import {
    addCurrentUserCourse,
    removeCurrentUserCourse,
} from "../../store/slices/auth.slice";
import { useSelectedCourse } from "../../hooks/useSelectedCourse.hook";
import { addCourse, removeCourse } from "../../store/slices/course.slice";
import { useUserProfile } from "../../hooks/useUserProfile.hook";

interface Props {
    mentor: User;
    canEditCourses: boolean;
    courseId: number;
    currentUser: User | null;
    showSettings?: boolean | undefined;
}

export const CourseTopBar = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const subscribeThunk = useSelector(
        (state: RootState) => state.courseAll.subscribe
    );
    const unsubscribeThunk = useSelector(
        (state: RootState) => state.courseAll.unsubscribe
    );
    const { mentor, canEditCourses, courseId, currentUser } = props;
    const selectedCourse = useSelectedCourse();
    const { userAuthorized } = useUserProfile();

    const handleSubscribeClick = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(subscribe(props.courseId));
        dispatch(setCourseId(props.courseId));
    };
    const handleUnsubscribeClick = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(unsubscribe(props.courseId));
        dispatch(setCourseId(props.courseId));
    };

    useEffect(() => {
        if (subscribeThunk.status == "succeeded" && selectedCourse) {
            dispatch(restoreSubscribeThunk());
            dispatch(addCurrentUserCourse(selectedCourse));
            dispatch(addCourse(selectedCourse));
        }
    }, [subscribeThunk.status]);

    useEffect(() => {
        if (unsubscribeThunk.status == "succeeded" && selectedCourse) {
            dispatch(restoreSubscribeThunk());
            dispatch(removeCurrentUserCourse(selectedCourse));
            dispatch(removeCourse(selectedCourse));
        }
    }, [unsubscribeThunk.status]);

    return (
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row">
                <Avatar
                    {...stringAvatar(
                        `${mentor.name} ${mentor.surname}`,
                        42,
                        42
                    )}
                />
                <Link
                    to={
                        userAuthorized?.id == mentor.id
                            ? "/profile"
                            : `/profile/${mentor.id}`
                    }
                    className="link h5 mt-2 ms-1"
                >
                    {`${mentor.name} ${mentor.surname}`}
                </Link>
            </div>

            {(
                props.showSettings === undefined
                    ? canEditCourses
                    : props.showSettings
            ) ? (
                <div className="d-flex flex-row">
                    <IconTextLink
                        url={`/courses/${courseId}/update`}
                        text="Редактировать"
                        icon={faPencil}
                    />

                    <IconTextLink
                        url={`/courses/${courseId}/delete`}
                        text="Удалить"
                        icon={faTrash}
                        extraClass="ms-2"
                    />
                </div>
            ) : (
                !!userAuthorized &&
                userAuthorized.id != mentor.id &&
                (userAuthorized.courses.some((id) => id == courseId) ? (
                    <WithPrealoader status={unsubscribeThunk.status}>
                        <input
                            type="button"
                            value="Удалить"
                            className="btn btn-danger"
                            onClick={handleUnsubscribeClick}
                        />
                    </WithPrealoader>
                ) : (
                    <WithPrealoader status={subscribeThunk.status}>
                        <input
                            type="button"
                            value="Добавить"
                            className="btn btn-success"
                            onClick={handleSubscribeClick}
                        />
                    </WithPrealoader>
                ))
            )}
        </div>
    );
};
