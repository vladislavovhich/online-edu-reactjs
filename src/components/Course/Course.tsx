import { faCalendarDays, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Card, CardContent, CardHeader } from "@mui/material"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { stringAvatar } from "../../helpers/color-avatar.helper"
import { GetCourse } from "../../types/course.types"

interface Props extends GetCourse {
    currentUserId: number | undefined
    index: number
}

export const Course = (props: Props) => {
    const mentor = props.mentor
    
    return (
        <div className={`d-flex flex-column border px-4 py-4 mt-3 border-rounded`}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row">
                    <Avatar 
                        {...stringAvatar(`${mentor.name} ${mentor.surname}`, 42, 42)} 
                    />
                    <div className="text-darker h5 mt-2 ms-1">{`${mentor.name} ${mentor.surname}`}</div>
                </div>

                {
                    props.currentUserId && props.currentUserId == mentor.id && (
                        <div className="d-flex flex-row">
                            <Link to={`/courses/${props.id}/edit`} className="mb-1 d-flex flex-row btn bg-darker">
                                <div className="text-white">Редактировать</div>
                                <FontAwesomeIcon icon={faPencil} className="mt-1 ms-1 text-white"/>
                            </Link>
                            <Link to={`/courses/${props.id}/delete`} className="mb-1 ms-2 d-flex flex-row btn bg-darker">
                                <div className="text-white">Удалить</div>
                                <FontAwesomeIcon icon={faTrash} className="mt-1 ms-1 text-white"/>
                            </Link>
                        </div>
                        
                    )
                }
            </div>

            <hr className="my-2"/>

            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="h4 text-darker text-break">{props.name}</div>
            </div>

            <hr className="my-2"/>

            <div className="d-flex flex-column">
                <div className="text-darker font-bolder text-break">{props.description}</div>
            </div>

            <hr className="my-2"/>
            

            <div className="d-flex flex-column">
                <Link className="badge bg-darker text-wrap" to={`/courses/${props.id}`}>Подробнее...</Link>

                <hr className="my-2 mb-0"/>

                <div className="badge bg-darker text-wrap mt-2">Студентов: {props.studentsAmount}</div>
                <div className="badge bg-darker text-wrap mt-2 ">Лекций: {props.lecturesAmount}</div>
            </div>
        </div>
    )
}