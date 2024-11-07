import React from "react";
import { Message as MessageType } from "../../types/message.types";
import { User as UserType } from "../../types/auth.types";
import { User } from "../User/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface Props extends MessageType {
    currentUser: UserType | null;
}

export const Message = (props: Props) => {
    const date = new Date(props.createdAt);

    return (
        <div className="d-flex flex-column bordered border py-3 px-4">
            <User
                {...props.sender}
                userAuthorized={props.currentUser}
                avatarSize={30}
            />

            <hr className="my-2" />

            <div className="text-darker text-break fs-5">{props.text}</div>

            <hr className="my-2" />

            <div className="text-darker">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ms-2 fs-6">{date.toLocaleString()}</span>
            </div>
        </div>
    );
};
