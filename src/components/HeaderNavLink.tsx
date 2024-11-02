import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    url: string;
    offset: string;
}

export const HeaderNavLink = (props: Props) => {
    return (
        <NavLink
            to={props.url}
            className={({ isActive, isPending }) =>
                `${props.offset} ${
                    isActive ? "link-header-active" : "link-header"
                }`
            }
        >
            {props.text}
        </NavLink>
    );
};
