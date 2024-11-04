import React from "react";
import { useSelector } from "react-redux";
import {
    createGroup,
    restoreCreateThunk,
} from "../../store/slices/group-edit.slice";
import { RootState } from "../../store/store";
import { GroupEdit } from "./GroupEdit";

export const GroupCreatePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const {
        name,
        description,
        group,
        findOne: getGroupThunk,
        create: createGroupThunk,
    } = useSelector((state: RootState) => state.groupEdit);

    if (!user) {
        return null;
    }

    return (
        <GroupEdit
            navigateTo={`/profile`}
            type={"create"}
            thunk={createGroupThunk}
            thunkAction={() => createGroup({ name, description })}
            restoreThunk={restoreCreateThunk}
            text={"Создание группы"}
            buttonText={"Добавить группу"}
            group={null}
        />
    );
};
