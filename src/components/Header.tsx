import React from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { signOut } from "../store/slices/auth.slice";
import { Link, NavLink } from "react-router-dom";
import { HeaderNavLink } from "./HeaderNavLink";

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthorized } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSignOut = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(signOut());
    };

    return (
        <header className="Header bg border">
            <div className="container">
                <nav className="navbar bg d-flex justify-content-between">
                    <a className="navbar-brand text-black" href="#">
                        Edu
                    </a>

                    <div className="navbar-nav d-flex flex-row justify-content-start flex-grow-1 mx-4 align-items-center">
                        <HeaderNavLink
                            url="/profile"
                            text="Профиль"
                            offset="me-3"
                        />
                        <HeaderNavLink
                            url="/courses"
                            text="Курсы"
                            offset="me-3"
                        />
                        <HeaderNavLink
                            url="/users"
                            text="Пользователи"
                            offset="me-3"
                        />
                    </div>

                    {isAuthorized && !!user ? (
                        <input
                            type="button"
                            className="btn btn-danger"
                            value="Выйти"
                            onClick={handleSignOut}
                        />
                    ) : (
                        <Link
                            to="/auth/sign-in"
                            className="btn-darker text-white"
                        >
                            Войти
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
