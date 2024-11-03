import React, { useEffect } from "react";
import { getUsers, loadUsers } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { WithPrealoader } from "../common/WithPreloader";
import { UserList } from "./UserList";

export const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        users,
        getUsers: getUsersThunk,
        loadUsers: loadUsersThunk,
        pageSize,
        nextPage,
    } = useSelector((state: RootState) => state.user);
    const loadCoursesFunc = () => {
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

    return (
        <WithPrealoader status={getUsersThunk.status}>
            <>
                <h3 className="text-darker">Пользователи</h3>

                <hr className="my-3" />

                <UserList
                    users={users}
                    hasNextPage={!!nextPage}
                    loadUsers={loadCoursesFunc}
                    status={loadUsersThunk.status}
                />
            </>
        </WithPrealoader>
    );
};
