import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { AsyncThunkAction, UnknownAction } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { setDescription, setName } from "../../store/slices/group-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { ThunkType } from "../../store/store.types";
import { Group } from "../../types/group.types";
import { WithPrealoader } from "../common/WithPreloader";
import { FormField } from "../Form/FormField";
import { FormTextArea } from "../Form/FormTextArea";

interface Props {
    navigateTo: string;
    type: "delete" | "update" | "create";
    thunk: ThunkType;
    thunkAction: () => AsyncThunkAction<any, any, any>;
    restoreThunk: () => UnknownAction;
    text: string;
    buttonText: string;
    group: Group | null;
}

const FormSchema = Yup.object({
    name: Yup.string().min(1).max(25).required(),
    description: Yup.string().min(1).max(255).required(),
});

interface Form {
    name: string;
    description: string;
}

export const GroupEdit = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        navigateTo,
        type,
        thunk,
        thunkAction,
        restoreThunk,
        text,
        buttonText,
        group,
    } = props;
    const navigate = useNavigate();

    const { name, description } = useSelector(
        (state: RootState) => state.groupEdit
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

    const submitAction = () => {
        return handleSubmit((data: Form) => {
            dispatch(thunkAction());
        });
    };

    useEffect(() => {
        if (thunk.status === "succeeded") {
            dispatch(restoreThunk());

            navigate(navigateTo);
        }
    }, [thunk.status]);

    return (
        <div>
            <form onSubmit={submitAction()}>
                <div className="row d-flex flex-column">
                    <h3 className=" text-darker col-6">{text}</h3>

                    <hr className="col-6 my-2" />

                    {type == "delete" && group ? (
                        <>
                            <TextField
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                label="Название группы"
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
                                label="Описание группы"
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
                                placeholder="Введите название группы"
                                error={errors.name}
                                id="name"
                                action={setName}
                                labelText="Название группы"
                                clearError={clearErrors}
                                extraClass="mt-2 col-6"
                            />

                            <FormTextArea
                                type="text"
                                register={register("description")}
                                value={description}
                                placeholder="Введите описание группы"
                                error={errors.description}
                                id="description"
                                action={setDescription}
                                labelText="Описание группы"
                                clearError={clearErrors}
                                extraClass="mt-3 col-6"
                                maxRows={3}
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
