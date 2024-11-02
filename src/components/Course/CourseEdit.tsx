import React, { DispatchWithoutAction, useEffect } from "react";
import * as Yup from "yup";
import { ThunkType } from "../../store/store.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../store/store";
import { AsyncThunk, AsyncThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { setName, setDescription } from "../../store/slices/course-edit.slice";
import { FormField } from "../Form/FormField";
import { FormTextArea } from "../Form/FormTextArea";
import { TextField } from "@mui/material";
import { GetCourse } from "../../types/course.types";
import { useUserProfile } from "../../hooks/useUserProfile.hook";

interface Props {
    navigateTo: string;
    type: "delete" | "update" | "create";
    thunk: ThunkType;
    thunkAction: () => AsyncThunkAction<any, any, any>;
    restoreThunk: () => UnknownAction;
    text: string;
    buttonText: string;
    course: GetCourse | null;
}

const FormSchema = Yup.object({
    name: Yup.string().min(1).max(45).required(),
    description: Yup.string().min(3).max(255).required(),
});

interface Form {
    name: string;
    description: string;
}

export const CourseEdit = (props: Props) => {
    const { user, userAuthorized, isProfileOwner } = useUserProfile();
    const {
        navigateTo,
        type,
        thunk,
        thunkAction,
        restoreThunk,
        text,
        buttonText,
        course,
    } = props;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { name, description } = useSelector(
        (state: RootState) => state.courseEdit
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: { name, description },
    });

    const formOnSubmit = (data: Form) => {
        dispatch(thunkAction());
    };

    useEffect(() => {
        if (thunk.status == "succeeded") {
            dispatch(restoreThunk());

            navigate(navigateTo);
        }
    }, [thunk.status]);

    useEffect(() => {
        if (type != "delete" && type != "create" && course) {
            dispatch(setName(course.name));
            dispatch(setDescription(course.description));
        }
    }, [type]);

    useEffect(() => {
        if (type == "create") {
            return;
        }

        if (userAuthorized && userAuthorized.id != course?.mentor.id) {
            navigate("/profile");
        }
    }, [user, course]);

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column">
                    <h3 className="h3 text-darker">{text}</h3>

                    <hr className="col-6" />

                    {type == "delete" ? (
                        <>
                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Название курса"
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
                                label="Описание курса"
                                defaultValue={description}
                                size="small"
                                multiline
                                rows={4}
                                className="col-6 mt-3"
                            />
                        </>
                    ) : (
                        <>
                            <FormField
                                type="text"
                                register={register("name")}
                                value={name}
                                placeholder="Название курса"
                                error={errors.name}
                                id="name"
                                action={setName}
                                labelText="Название курса"
                                clearError={clearErrors}
                                extraClass="col-6"
                            />

                            <FormTextArea
                                type="text"
                                register={register("description")}
                                value={description}
                                placeholder="Описание курса"
                                error={errors.description}
                                id="description"
                                action={setDescription}
                                labelText="Описание курса"
                                clearError={clearErrors}
                                extraClass="mt-3 col-6"
                                maxRows={3}
                            />
                        </>
                    )}

                    <input
                        type="submit"
                        className="btn-darker col-6 mt-2"
                        value={buttonText}
                    />
                </div>
            </form>
        </div>
    );
};
