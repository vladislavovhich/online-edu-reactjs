import React, { useEffect } from "react";
import "../styles/common.css";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { authMe } from "../store/slices/auth.slice";
import { AppDispatch, RootState } from "../store/store";
import { Header } from "./Header";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { WithPrealoader } from "./common/WithPreloader";
import { WsTest } from "./WsTest";
import axios from "axios";

axios.defaults.withCredentials = true;

export const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authMeThunk = useSelector((state: RootState) => state.auth.authMe);

    useEffect(() => {
        dispatch(authMe());
    }, []);

    return (
        <div>
            <Header />
            <main className="mt-3 mb-3">
                <div className="container">
                    <WithPrealoader status={authMeThunk.status}>
                        <Outlet />
                    </WithPrealoader>
                </div>
            </main>
        </div>
    );
};
