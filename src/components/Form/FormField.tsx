import React, { useRef } from "react";
import ReactDOM, { Root } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
    FieldError,
    Path,
    UseFormClearErrors,
    UseFormRegisterReturn,
} from "react-hook-form";
import TextField from "@mui/material/TextField";

interface Props<T extends Record<string, any>> {
    type: "text" | "password" | "email" | "date";
    value: string | undefined;
    error: FieldError | undefined;
    action: ActionCreatorWithPayload<string>;
    register: UseFormRegisterReturn;
    extraClass?: string | undefined;
    labelText: string;
    id: Path<T>;
    placeholder?: string | undefined;
    clearError: UseFormClearErrors<T>;
}

export const FormField = <T extends Record<string, any>>(props: Props<T>) => {
    const {
        error,
        type,
        action,
        register,
        extraClass,
        value,
        id,
        labelText,
        placeholder,
        clearError,
    } = props;

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (clearError) {
            clearError(id);
        }

        dispatch(action(e.target.value));
    };

    return (
        <>
            {error ? (
                <TextField
                    type={type}
                    error
                    label={props.labelText}
                    value={value}
                    helperText={error.message}
                    {...register}
                    onChange={handleInputChange}
                    className={extraClass}
                    variant="outlined"
                    size="small"
                />
            ) : (
                <TextField
                    type={type}
                    label={props.labelText}
                    variant="outlined"
                    value={value}
                    className={extraClass}
                    {...register}
                    onChange={handleInputChange}
                    size="small"
                />
            )}
        </>
    );
};
