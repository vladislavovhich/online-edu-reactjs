import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
    text: string;
    icon: IconProp;
    url: string;
    extraClass?: string | undefined;
}

export const IconTextLink = (props: Props) => {
    return (
        <Link
            to={props.url}
            className={`mb-1 d-flex flex-row btn-darker ${props.extraClass}`}
        >
            <div className="text-white">{props.text}</div>
            <FontAwesomeIcon
                icon={props.icon}
                className="mt-1 ms-1 text-white"
            />
        </Link>
    );
};
