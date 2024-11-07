import React, { useEffect } from "react";
import { useGroupGet } from "../../hooks/useGroupGet.hook";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { WithPrealoader } from "../common/WithPreloader";
import { MessagesList } from "../Message/MessagesList";
import { useDispatch } from "react-redux";
import {
    getMessages,
    loadMessages,
} from "../../store/slices/message-all.slice";

export const GroupMessagesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user: userAuth } = useSelector((state: RootState) => state.auth);
    const { group, groupId, getGroupThunk } = useGroupGet();
    const {
        messages,
        getMessages: getMessagesThunk,
        loadMessages: loadMessagesThunk,
        page,
        pageSize,
        nextPage,
    } = useSelector((state: RootState) => state.messageAll);

    const loadMessagesFunc = () => {
        if (!groupId || !nextPage) {
            return;
        }

        dispatch(loadMessages({ page: nextPage, pageSize, groupId }));
    };

    useEffect(() => {
        if (!groupId || !group) {
            return;
        }

        dispatch(getMessages({ page, pageSize, groupId }));
    }, [groupId]);

    if (!group || !groupId) {
        return null;
    }

    return (
        <WithPrealoader status={getMessagesThunk.status}>
            <MessagesList
                messages={messages}
                currentUser={userAuth}
                loadMessagesFunc={loadMessagesFunc}
                group={group}
                nextPage={nextPage}
                loadMessagesStatus={loadMessagesThunk.status}
            />
        </WithPrealoader>
    );
};
