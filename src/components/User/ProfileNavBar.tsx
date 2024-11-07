import {
    faPersonChalkboard,
    faComments,
    faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../types/auth.types";
import { IconNavLink } from "./IconNavLink";

interface Props {
    user: User;
    currentUser: User | null;
}

export const ProfileNavBar = (props: Props) => {
    return (
        <div className="d-flex flex-row justify-content-center py-3">
            <IconNavLink
                text="Курсы"
                url={
                    props.currentUser && props.currentUser.id == props.user.id
                        ? `/profile/courses`
                        : `/profile/${props.user.id}/courses`
                }
                icon={faPersonChalkboard}
            />

            {props.currentUser && props.currentUser.id == props.user.id && (
                <>
                    <div className="mx-4">
                        <IconNavLink
                            text="Группы"
                            url="/profile/groups"
                            icon={faComments}
                        />
                    </div>

                    <IconNavLink
                        text="Настройки"
                        url="/profile/update"
                        icon={faGear}
                    />
                </>
            )}
        </div>
    );
};
