import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, getUsers } from "../../store/slices/user.slice";
import { AppDispatch, RootState } from "../../store/store";
import { WithPrealoader } from "../common/WithPreloader";
import { Button, Modal } from "react-bootstrap";
import { User as UserType } from "../../types/auth.types";
import { User } from "../User/User";
import {
    addMember,
    restoreAddMemberThunk,
} from "../../store/slices/group.slice";
import { useNavigate } from "react-router";

interface Props {
    handleClose: () => void;
    isShow: boolean;
    userAuthorized: UserType | null;
    members: UserType[];
    groupId: number;
}

export const GroupAddUsersModal = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { addMember: addMemberThunk } = useSelector(
        (state: RootState) => state.group
    );
    const {
        users,
        getUsers: getUsersThunk,
        loadUsers: loadUsersThunk,
        pageSize,
        nextPage,
    } = useSelector((state: RootState) => state.user);

    const handleOnClickAdd =
        (userId: number) => (e: React.MouseEvent<HTMLElement>) => {
            dispatch(
                addMember({
                    userId,
                    groupId: props.groupId,
                })
            );
        };

    const loadUsersFunc = () => {
        if (!nextPage) {
            return;
        }

        dispatch(
            loadUsers({
                page: nextPage,
                pageSize,
            })
        );
    };

    useEffect(() => {
        dispatch(getUsers({ page: 1, pageSize }));
    }, []);

    useEffect(() => {
        if (addMemberThunk.status == "succeeded") {
            dispatch(restoreAddMemberThunk());
            props.handleClose();
            navigate(`/groups/${props.groupId}/members`);
        }
    }, [addMemberThunk.status]);

    return (
        <Modal
            show={props.isShow}
            onHide={props.handleClose}
            dialogClassName="user-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Список пользователей</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WithPrealoader status={getUsersThunk.status}>
                    <>
                        <h3 className="text-darker">Пользователи</h3>

                        <hr className="my-3" />

                        <div className="d-flex flex-column">
                            {users.map((user, index) => (
                                <div
                                    className="d-flex flex-row align-items-center mt-2"
                                    key={index.toString()}
                                >
                                    <User
                                        {...user}
                                        userAuthorized={props.userAuthorized}
                                    />
                                    {!props.members.some(
                                        (member) => member.id === user.id
                                    ) && (
                                        <input
                                            type="button"
                                            className="btn btn-success ms-3"
                                            value="Добавить"
                                            onClick={handleOnClickAdd(user.id)}
                                        />
                                    )}
                                </div>
                            ))}

                            {nextPage && (
                                <WithPrealoader status={getUsersThunk.status}>
                                    <input
                                        type="button"
                                        value="Load"
                                        onClick={loadUsersFunc}
                                        className="mt-2 btn-darker"
                                    />
                                </WithPrealoader>
                            )}
                        </div>
                    </>
                </WithPrealoader>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
