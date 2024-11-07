import React from "react";
import { Group } from "../../types/group.types";
import { IconNavLink } from "../User/IconNavLink";
import { faEnvelope, faGear, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useGroupGet } from "../../hooks/useGroupGet.hook";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface Props {
    group: Group;
}

export const GroupNavBar = (props: Props) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { group, groupId, getGroupThunk } = useGroupGet();

    if (!group || !groupId) {
        return null;
    }

    return (
        <div className="d-flex flex-row justify-content-center">
            <IconNavLink
                text={"Сообщения"}
                icon={faEnvelope}
                url={`/groups/${props.group.id}/messages`}
            />

            <div className="mx-4">
                <IconNavLink
                    text={"Участники"}
                    icon={faUsers}
                    url={`/groups/${props.group.id}/members`}
                />
            </div>

            {user && user.id == group.creator.id && (
                <IconNavLink
                    text={"Настройки"}
                    icon={faGear}
                    url={`/groups/${props.group.id}/settings`}
                />
            )}
        </div>
    );
};
