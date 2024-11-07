import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateGroup } from "../../store/slices/group-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { GroupEdit } from "./GroupEdit";
import { restoreUpdateThunk } from "../../store/slices/group-edit.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { useGroupGet } from "../../hooks/useGroupGet.hook";

interface Props {
    navigateTo?: string | undefined;
}

export const GroupUpdatePage = (props: Props) => {
    const {
        name,
        description,
        update: updateGroupThunk,
    } = useSelector((state: RootState) => state.groupEdit);
    const { group, groupId, getGroupThunk } = useGroupGet();

    if (!group || !groupId) {
        return null;
    }

    const url = props.navigateTo ?? "/profile";

    return (
        <WithPrealoader status={getGroupThunk.status}>
            <GroupEdit
                navigateTo={url}
                type={"update"}
                thunk={updateGroupThunk}
                thunkAction={() =>
                    updateGroup({ id: groupId, name, description })
                }
                restoreThunk={restoreUpdateThunk}
                text={"Обновление группы"}
                buttonText={"Обновить группу"}
                group={group}
            />
        </WithPrealoader>
    );
};
