import React from "react";
import { User } from "../../types/auth.types";
import { Message as MessageType } from "../../types/message.types";
import { MessageEdit } from "./MessageEdit";
import { Group } from "../../types/group.types";
import { Message } from "./Message";
import { WithPrealoader } from "../common/WithPreloader";
import { thunkStatusType } from "../../store/store.types";

interface Props {
    currentUser: User | null;
    messages: MessageType[];
    loadMessagesFunc: () => void;
    group: Group;
    nextPage: number | undefined;
    loadMessagesStatus: thunkStatusType;
}

export const MessagesList = (props: Props) => {
    const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
        props.loadMessagesFunc();
    };

    return (
        <div className="d-flex flex-column border-danger">
            <div className="d-flex flex-column">
                <MessageEdit groupId={props.group.id} />

                <div>
                    {props.messages.map((message, index) => (
                        <div key={index}>
                            <hr />

                            <Message
                                {...message}
                                currentUser={props.currentUser}
                            />
                        </div>
                    ))}

                    {props.nextPage && (
                        <WithPrealoader status={props.loadMessagesStatus}>
                            <input
                                type="button"
                                className="btn-darker w-100 mt-2"
                                value="Load"
                                onClick={handleOnClick}
                            />
                        </WithPrealoader>
                    )}
                </div>
            </div>
        </div>
    );
};
