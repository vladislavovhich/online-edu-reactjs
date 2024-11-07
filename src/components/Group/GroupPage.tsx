import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { findOneGroup } from "../../store/slices/group-edit.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { GroupNavBar } from "./GroupNavBar";
import { User } from "../User/User";
import { useGroupGet } from "../../hooks/useGroupGet.hook";

export const GroupPage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { group, groupId, getGroupThunk } = useGroupGet();

    if (!group || !groupId) {
        return null;
    }

    return (
        <WithPrealoader status={getGroupThunk.status}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center">
                    <User {...group.creator} userAuthorized={user} />
                    <h3 className="h3 text-darker ms-3">{group.name}</h3>
                </div>

                <hr className="my-2" />

                <div className="text-darker text-break h4">
                    {group.description}
                </div>

                <hr className="mt-2 mb-3" />

                <GroupNavBar group={group} />

                <hr className="mt-3 mt-2" />

                <div className="d-flex flex-column">
                    <Outlet />
                </div>
            </div>
        </WithPrealoader>
    );
};
