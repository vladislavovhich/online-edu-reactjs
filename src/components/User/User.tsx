import React from "react";
import { User as UserType } from "../../types/auth.types";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../helpers/color-avatar.helper";
import { Link } from "react-router-dom";

interface Props extends UserType {}

export const User = (props: Props) => {
    const bgColor = props.role == "MENTOR" ? "bg-success" : "bg-primary";
    const text = props.role == "MENTOR" ? "Учитель" : "Студент";

    return (
        <div className="d-flex flex-row align-items-center">
            <Avatar
                {...stringAvatar(`${props.name} ${props.surname}`, 56, 56)}
            />

            <Link
                to={`/profile/${props.id}`}
                className="text-darker link h4 mx-2"
            >
                {`${props.name} ${props.surname}`}
            </Link>
            <div className={`${bgColor} text-white badge badge-c`}>{text}</div>
        </div>
    );
};
