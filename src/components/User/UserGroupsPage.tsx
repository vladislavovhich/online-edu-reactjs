import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile.hook";
import { getGroups, loadGroups } from "../../store/slices/group.slice";
import { AppDispatch, RootState } from "../../store/store";
import { WithPrealoader } from "../common/WithPreloader";
import { GroupsList } from "../Group/GroupsList";

export const UserGroupsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useUserProfile();
    const {
        groups,
        pageSize,
        nextPage,
        getGroups: getGroupsThunk,
        loadGroups: loadGroupsThunk,
    } = useSelector((state: RootState) => state.group);

    const loadGroupsFunc = () => {
        if (!nextPage || !user) {
            return;
        }

        dispatch(loadGroups({ page: nextPage, pageSize, userId: user.id }));
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        dispatch(getGroups({ page: 1, pageSize, userId: user.id }));
    }, [user]);

    return (
        <div className="d-flex flex-column row">
            <h3 className="text-darker h3 mt-2">Группы</h3>

            <hr className="my-2" />

            <div className="d-flex flex-column">
                <Link to="/groups/create" className="btn-darker">
                    Создать группу
                </Link>

                <WithPrealoader status={getGroupsThunk.status}>
                    <GroupsList
                        groups={groups}
                        loadGroupsFunc={loadGroupsFunc}
                        currentUser={user}
                    />
                </WithPrealoader>
            </div>
        </div>
    );
};
