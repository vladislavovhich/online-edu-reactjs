import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteGroup } from "../../store/slices/group-edit.slice";
import { RootState } from "../../store/store";
import { GroupEdit } from "./GroupEdit";
import { restoreDeleteThunk } from "../../store/slices/course-edit.slice";
import { useDispatch } from "react-redux";
import { WithPrealoader } from "../common/WithPreloader";
import { useGroupGet } from "../../hooks/useGroupGet.hook";

export const GroupDeletePage = () => {
    const { delete: groupDeleteThunk } = useSelector(
        (state: RootState) => state.groupEdit
    );
    const { group, groupId, getGroupThunk } = useGroupGet();

    if (!group || !groupId) {
        return null;
    }

    return (
        <WithPrealoader status={getGroupThunk.status}>
            <GroupEdit
                navigateTo={`/profile`}
                type={"delete"}
                thunk={groupDeleteThunk}
                thunkAction={() => deleteGroup(groupId)}
                restoreThunk={restoreDeleteThunk}
                text={"Удаление группы"}
                buttonText={"Удалить группу"}
                group={group}
            />
        </WithPrealoader>
    );
};
