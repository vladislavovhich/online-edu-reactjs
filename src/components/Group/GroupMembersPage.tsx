import React, { useState } from "react";
import { useGroupGet } from "../../hooks/useGroupGet.hook";
import { useUserProfile } from "../../hooks/useUserProfile.hook";
import { User } from "../User/User";
import { Modal } from "react-bootstrap";
import { GroupAddUsersModal } from "./GroupAddUsersModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeMember } from "../../store/slices/group.slice";

export const GroupMembersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userAuthorized } = useUserProfile();
    const { group, groupId } = useGroupGet();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveMember =
        (userId: number) => (e: React.MouseEvent<HTMLElement>) => {
            if (!groupId) {
                return;
            }

            dispatch(removeMember({ groupId, userId }));
        };

    if (!group || !groupId) {
        return null;
    }

    return (
        <div className="d-flex flex-column">
            {group.creator.id === userAuthorized?.id && (
                <>
                    <input
                        type="button"
                        className="btn-darker mb-2"
                        value="Добавить участников"
                        onClick={handleShow}
                    />

                    <hr className="my-2" />
                </>
            )}

            <GroupAddUsersModal
                handleClose={handleClose}
                isShow={show}
                userAuthorized={userAuthorized}
                members={group.members}
                groupId={group.id}
            />

            {group.members.map((member, index) => (
                <div
                    key={index}
                    className="d-flex flex-row align-items-center mt-2"
                >
                    <User {...member} userAuthorized={userAuthorized} />

                    {group.creator.id === userAuthorized?.id &&
                        userAuthorized?.id !== member.id && (
                            <input
                                type="button"
                                className="btn btn-danger ms-3"
                                value="Исключить из группы"
                                onClick={handleRemoveMember(member.id)}
                            />
                        )}
                </div>
            ))}
        </div>
    );
};
