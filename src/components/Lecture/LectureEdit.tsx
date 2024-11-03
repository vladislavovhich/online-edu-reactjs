import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../store/store";
import { Lecture } from "../../types/lecture.types";
import { AsyncThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { ThunkType } from "../../store/store.types";
import { WithPrealoader } from "../common/WithPreloader";
import { FormField } from "../Form/FormField";
import { FormTextArea } from "../Form/FormTextArea";
import {
    setDate,
    setSubject,
    setName,
    setDescription,
} from "../../store/slices/lecture-edit.slice";
import { FormDateField } from "../Form/FormDateField";
import { TextField } from "@mui/material";

interface Props {
    navigateTo: string;
    type: "delete" | "update" | "create";
    thunk: ThunkType;
    thunkAction: () => AsyncThunkAction<any, any, any>;
    restoreThunk: () => UnknownAction;
    text: string;
    buttonText: string;
    lecture: Lecture | null;
}

const FormSchema = Yup.object().shape({
    name: Yup.string().min(1).max(35).required(),
    description: Yup.string().min(1).max(255).required(),
    subject: Yup.string().min(1).max(35).required(),
    date: Yup.date().min(new Date()).required(),
});

interface Form {
    name: string;
    description: string;
    subject: string;
    date: Date;
}

export const LectureEdit = (props: Props) => {
    const {
        navigateTo,
        type,
        thunk,
        thunkAction,
        restoreThunk,
        text,
        buttonText,
        lecture,
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { name, description, subject, date } = useSelector(
        (state: RootState) => state.lectureEdit
    );
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        setValue,
        getValues,
    } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: { name, description, subject, date: new Date(date) },
    });

    useEffect(() => {
        if (thunk.status == "succeeded") {
            dispatch(restoreThunk());

            navigate(navigateTo);
        }
    }, [thunk.status]);

    if (!courseId) {
        return null;
    }

    const submitAction = () => {
        if (type == "delete") {
            return () => {
                dispatch(thunkAction());
            };
        } else {
            return handleSubmit((data: Form) => {
                dispatch(thunkAction());
            });
        }
    };

    return (
        <div>
            <form onSubmit={submitAction()}>
                <div className="row d-flex flex-column">
                    <h3 className="h3 text-darker">{text}</h3>

                    <hr className="col-6" />

                    {type == "delete" && lecture ? (
                        <>
                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Название лекции"
                                defaultValue={name}
                                size="small"
                                className="col-6 mt"
                            />

                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Описание лекции"
                                defaultValue={description}
                                size="small"
                                multiline
                                rows={4}
                                className="col-6 mt-3"
                            />

                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Тема лекции"
                                defaultValue={subject}
                                size="small"
                                className="col-6 mt-3"
                            />

                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Дата лекции"
                                defaultValue={new Date(
                                    date
                                ).toLocaleDateString()}
                                size="small"
                                className="col-6 mt-3"
                            />
                        </>
                    ) : (
                        <>
                            <FormField
                                type="text"
                                register={register("name")}
                                value={name}
                                placeholder="Введите название лекции"
                                error={errors.name}
                                id="name"
                                action={setName}
                                labelText="Название лекции"
                                clearError={clearErrors}
                                extraClass="mt-1 col-6"
                            />

                            <FormTextArea
                                type="text"
                                register={register("description")}
                                value={description}
                                placeholder="Введите описание лекции"
                                error={errors.description}
                                id="description"
                                action={setDescription}
                                labelText="Описание лекции"
                                clearError={clearErrors}
                                extraClass="mt-3 col-6"
                                maxRows={3}
                            />

                            <FormField
                                type="text"
                                register={register("subject")}
                                value={subject}
                                placeholder="Введите тему лекции"
                                error={errors.subject}
                                id="subject"
                                action={setSubject}
                                labelText="Тема лекции"
                                clearError={clearErrors}
                                extraClass="mt-3 col-6"
                            />

                            <FormDateField
                                value={date}
                                setValue={(value: Date) =>
                                    setValue("date", value)
                                }
                                error={errors.date}
                                clearError={clearErrors}
                                action={setDate}
                                id="date"
                            />
                        </>
                    )}

                    <WithPrealoader status={thunk.status}>
                        <input
                            type="submit"
                            className="btn-darker text-white col-6 mt-3"
                            value={buttonText}
                        />
                    </WithPrealoader>
                </div>
            </form>
        </div>
    );
};
