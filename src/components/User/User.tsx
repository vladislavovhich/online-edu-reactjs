import React from "react";
import { User as UserType } from "../../types/auth.types";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../helpers/color-avatar.helper";
import { Link } from "react-router-dom";

interface Props extends UserType {
    userAuthorized: UserType | null;
    avatarSize?: number | undefined;
}

export const User = (props: Props) => {
    const bgColor = props.role == "MENTOR" ? "bg-success" : "bg-primary";
    const text = props.role == "MENTOR" ? "Учитель" : "Студент";
    const avatarSize = props.avatarSize ? props.avatarSize : 56;
    const url =
        props.userAuthorized && props.userAuthorized.id == props.id
            ? "/profile"
            : `/profile/${props.id}`;

    return (
        <div className="d-flex flex-row align-items-center">
            <Avatar
                {...stringAvatar(
                    `${props.name} ${props.surname}`,
                    avatarSize,
                    avatarSize
                )}
            />

            <Link to={url} className="text-darker link h4 mx-2">
                {`${props.name} ${props.surname}`}
            </Link>
            <div className={`${bgColor} text-white badge badge-c`}>{text}</div>
        </div>
    );
};
