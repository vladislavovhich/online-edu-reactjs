import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { setText } from "../../store/slices/message-edit.slice";
import { FormField } from "../Form/FormField";
import {
    restoreSendMessageThunk,
    sendMessage,
} from "../../store/slices/message-all.slice";
import { useDispatch } from "react-redux";
import { WithPrealoader } from "../common/WithPreloader";

const FormSchema = Yup.object().shape({
    text: Yup.string().min(1).max(35).required(),
});

interface Form {
    text: string;
}

interface Props {
    groupId: number;
}

export const MessageEdit = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { text } = useSelector((state: RootState) => state.messageEdit);
    const { sendMessage: sendMessageThunk } = useSelector(
        (state: RootState) => state.messageAll
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: { text },
    });

    const onSubmit = (data: Form) => {
        dispatch(setText(""));
        dispatch(sendMessage({ text: data.text, groupId: props.groupId }));
    };

    useEffect(() => {
        if (sendMessageThunk.status === "succeeded") {
            dispatch(restoreSendMessageThunk());
        }
    }, [sendMessageThunk.status]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row d-flex flex-row align-items-center justify-content-center">
                    <FormField
                        type="text"
                        register={register("text")}
                        value={text}
                        placeholder="Введите текст сообщения"
                        error={undefined}
                        id="text"
                        action={setText}
                        labelText="Текст сообщения"
                        clearError={clearErrors}
                        extraClass="mt-1 col-9"
                    />

                    <input
                        type="submit"
                        className="btn-darker col-2 mt-1 ms-2"
                        value="Отправить"
                        disabled={
                            !!errors.text ||
                            sendMessageThunk.status === "succeeded"
                        }
                    />
                </div>
            </form>
        </div>
    );
};
