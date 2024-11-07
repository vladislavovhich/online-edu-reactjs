import React from "react";
import { User } from "../../types/auth.types";
import { Group } from "../../types/group.types";
import { thunkStatusType } from "../../store/store.types";
import { GroupPreview } from "./GroupPreview";

interface Props {
    currentUser: User | null;
    groups: Group[];
    loadGroupsFunc: () => void;
    loadGroupsState: thunkStatusType;
}

export const GroupsList = (props: Props) => {
    const { currentUser, groups, loadGroupsFunc, loadGroupsState } = props;

    return (
        <div className="d-flex flex-column">
            {groups.map((group, index) => (
                <div key={index.toString()}>
                    <hr />
                    <GroupPreview {...group} currentUser={currentUser} />
                </div>
            ))}
        </div>
    );
};
