import React, { useRef } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
    FieldError,
    Path,
    UseFormClearErrors,
    UseFormRegisterReturn,
} from "react-hook-form";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { date } from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

interface Props<T extends Record<string, any>> {
    value: number;
    setValue: (value: Date) => void;
    error: FieldError | undefined;
    clearError: UseFormClearErrors<T>;
    action: ActionCreatorWithPayload<number>;
    id: Path<T>;
}

export const FormDateField = <T extends Record<string, any>>(
    props: Props<T>
) => {
    const { clearError, error, setValue, id, action, value } = props;

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (value: Dayjs | null) => {
        if (!value) {
            return;
        }

        if (clearError) {
            clearError(id);
        }

        const date = new Date(value.toString());

        setValue(date);
        dispatch(action(+date));
    };

    return (
        <DateTimePicker
            label="Дата и время"
            value={dayjs(value)}
            onChange={handleInputChange}
            slotProps={{
                textField: {
                    error: !!error,
                    helperText: error?.message ? error.message : "",
                    className: "col-6 mt-3",
                    size: "small",
                },
            }}
        />
    );
};
