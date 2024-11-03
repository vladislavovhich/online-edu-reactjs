import React from "react";

interface Props {
    name: string;
    description: string;
    extraClass?: string | undefined;
    addSeparator?: boolean | undefined;
}

export const CourseInfo = (props: Props) => {
    return (
        <div className={`d-flex flex-column ${props.extraClass}`}>
            <div className="h4 text-darker text-break">{props.name}</div>

            {(props.addSeparator === undefined || !!props.addSeparator) && (
                <hr className="my-2" />
            )}

            <div className="text-darker font-bolder text-break">
                {props.description}
            </div>
        </div>
    );
};
