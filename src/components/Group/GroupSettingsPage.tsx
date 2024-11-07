import React, { useEffect } from "react";
import { GroupUpdatePage } from "./GroupUpdatePage";
import { useGroupGet } from "../../hooks/useGroupGet.hook";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    deleteGroup,
    restoreDeleteThunk,
} from "../../store/slices/group-edit.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useUserProfile } from "../../hooks/useUserProfile.hook";

export const GroupSettingsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { groupId } = useGroupGet();
    const { delete: deleteThunk } = useSelector(
        (state: RootState) => state.groupEdit
    );

    useEffect(() => {
        if (deleteThunk.status === "succeeded") {
            dispatch(restoreDeleteThunk());

            navigate(`/profile`);
        }
    }, [deleteThunk.status, dispatch, navigate]);

    if (!groupId) {
        return null;
    }

    const onClickDeleteGroup = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(deleteGroup(groupId));
    };

    return (
        <WithPrealoader status={deleteThunk.status}>
            <div className="d-flex flex-column">
                <div className="ms-2">
                    <GroupUpdatePage navigateTo={`/groups/${groupId}`} />
                </div>

                <input
                    type="button"
                    className="btn-darker col-6 border mt-2"
                    value="Удалить"
                    onClick={onClickDeleteGroup}
                />
            </div>
        </WithPrealoader>
    );
};
