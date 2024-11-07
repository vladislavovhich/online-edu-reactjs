import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { findOneGroup } from "../store/slices/group-edit.slice";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";

export const useGroupGet = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { group, findOne: getGroupThunk } = useSelector(
        (state: RootState) => state.groupEdit
    );
    const params = useParams<{ groupId: string }>();
    const groupId = params.groupId ? parseInt(params.groupId) : null;

    useEffect(() => {
        if (!groupId || (group && groupId && group.id == groupId)) {
            return;
        }

        dispatch(findOneGroup(groupId));
    }, [groupId]);

    return { group, groupId, getGroupThunk };
};
