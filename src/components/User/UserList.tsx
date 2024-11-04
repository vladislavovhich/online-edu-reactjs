import React from "react";
import { User as UserType } from "../../types/auth.types";
import { loadUsers } from "../../store/slices/user.slice";
import { User } from "./User";
import { thunkStatusType, ThunkType } from "../../store/store.types";
import { WithPrealoader } from "../common/WithPreloader";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface Props {
    users: UserType[];
    loadUsers: () => void;
    hasNextPage: boolean;
    status: thunkStatusType;
}

export const UserList = (props: Props) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const onClickLoadUsers = (e: React.MouseEvent<HTMLElement>) =>
        props.loadUsers();

    return (
        <div className="d-flex flex-column">
            {props.users.map((user, index) => (
                <div className="mt-3">
                    <User
                        {...user}
                        key={index.toString()}
                        userAuthorized={user}
                    />
                </div>
            ))}

            {props.hasNextPage && (
                <WithPrealoader status={props.status}>
                    <input
                        type="button"
                        value="Load"
                        onClick={onClickLoadUsers}
                        className="mt-2 btn-darker"
                    />
                </WithPrealoader>
            )}
        </div>
    );
};
