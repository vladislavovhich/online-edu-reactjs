import React from "react";
import { IconNavLink } from "../User/IconNavLink";
import {
    faGear,
    faPersonChalkboard,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/auth.types";

interface Props {
    courseId: number;
    user: User | null;
    mentorId: number;
}

export const CourseNavBar = (props: Props) => {
    return (
        <div className="d-flex flex-row justify-content-between py-2">
            <IconNavLink
                text="Лекции"
                url={`/courses/${props.courseId}/lectures`}
                icon={faPersonChalkboard}
            />

            <IconNavLink
                text="Студенты"
                url={`/courses/${props.courseId}/students`}
                icon={faUserGroup}
            />

            {props.user && props.user.id == props.mentorId && (
                <IconNavLink
                    text="Настройки"
                    url={`/courses/${props.courseId}/settings`}
                    icon={faGear}
                />
            )}
        </div>
    );
};
