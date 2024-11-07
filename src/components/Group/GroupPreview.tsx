import React from "react";
import { Group } from "../../types/group.types";
import { User as UserType } from "../../types/auth.types";
import { User } from "../User/User";
import { Link } from "react-router-dom";
import { group } from "console";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconTextLink } from "../common/IconTextLink";

interface Props extends Group {
    currentUser: UserType | null;
}

export const GroupPreview = (props: Props) => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row">
                    <User
                        {...props.creator}
                        userAuthorized={props.currentUser}
                        avatarSize={42}
                    />

                    <Link
                        to={`/groups/${props.id}`}
                        className="h4 link text-darker ms-3 mt-1"
                    >
                        {props.name}
                    </Link>
                </div>

                {props.currentUser &&
                    props.currentUser.id == props.creator.id && (
                        <div className="d-flex flex-row">
                            <IconTextLink
                                url={`/groups/${props.id}/update`}
                                text="Редактировать"
                                icon={faPencil}
                            />

                            <IconTextLink
                                url={`/groups/${props.id}/delete`}
                                text="Удалить"
                                icon={faTrash}
                                extraClass="ms-2"
                            />
                        </div>
                    )}
            </div>
        </div>
    );
};
