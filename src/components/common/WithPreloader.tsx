import React from "react";
import { thunkStatusType, ThunkType } from "../../store/store.types";
import { CircularProgress } from "@mui/material";

interface Props {
    children: JSX.Element;
    status: thunkStatusType;
}

export const WithPrealoader = (props: Props) => {
    return props.status == "pending" ? (
        <div className="my-4 d-flex align-items-center justify-content-center w-100">
            <CircularProgress />
        </div>
    ) : (
        props.children
    );
};
