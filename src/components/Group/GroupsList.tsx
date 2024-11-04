import React from "react";
import { User } from "../../types/auth.types";
import { Group } from "../../types/group.types";

interface Props {
    currentUser: User | null;
    groups: Group[];
    loadGroupsFunc: () => void;
}

export const GroupsList = (props: Props) => {
    const { currentUser, groups, loadGroupsFunc } = props;

    return <div></div>;
};
