import React, { useEffect } from "react"
import { GetCourse } from "../../types/course.types"

interface Props extends GetCourse {
    currentUserId: number | undefined
}

export const Course = (props: Props) => {
    return (
        <div className="d-flex flex-column">
            <div>{props.name}</div>

            <hr />

            <div>{props.description}</div>

            <hr />

            {
                props.currentUserId && props.currentUserId == props.mentor.id && (
                    <>
                        <div className="d-flex flex-row">
                            <input 
                                type="button"
                                className="btn btn-primary"
                                value="Редактировать"
                            />

                            <input 
                                type="button"
                                className="btn btn-danger"
                                value="Удалить"
                            />
                        </div>
                        
                        <hr />
                    </>
                )
            }

            <div className="badge">{props.lecturesAmount}</div>
            <div className="badge">{props.studentsAmount}</div>
        </div>
    )
}