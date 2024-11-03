import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    icon: IconProp;
    url: string;
}

export const IconNavLink = (props: Props) => {
    return (
        <NavLink
            to={props.url}
            className={({ isActive, isPending }) =>
                `d-flex flex-row align-items-center text-darker h5 link ${
                    isActive && "link-active"
                }`
            }
        >
            <div>{props.text}</div>

            <FontAwesomeIcon icon={props.icon} className="ms-1 mt-1" />
        </NavLink>
    );
};
