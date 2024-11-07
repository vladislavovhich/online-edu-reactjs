import { RouteObject } from "react-router";
import { GroupUpdatePage } from "../components/Group/GroupUpdatePage";
import { GroupDeletePage } from "../components/Group/GroupDeletePage";
import { GroupPage } from "../components/Group/GroupPage";
import { GroupMessagesPage } from "../components/Group/GroupMessagesPage";
import { GroupMembersPage } from "../components/Group/GroupMembersPage";
import { GroupSettingsPage } from "../components/Group/GroupSettingsPage";

export const groupsRoutes: RouteObject[] = [
    {
        path: "/groups/:groupId/update",
        element: <GroupUpdatePage />,
    },
    {
        path: "/groups/:groupId/delete",
        element: <GroupDeletePage />,
    },
    {
        path: "/groups/:groupId",
        element: <GroupPage />,
        children: [
            {
                path: "/groups/:groupId/messages",
                element: <GroupMessagesPage />,
            },
            {
                path: "/groups/:groupId/members",
                element: <GroupMembersPage />,
            },
            {
                path: "/groups/:groupId/settings",
                element: <GroupSettingsPage />,
            },
        ],
    },
];
