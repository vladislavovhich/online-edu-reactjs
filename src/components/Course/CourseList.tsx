import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { GetCourse } from "../../types/course.types"
import { Course } from "./Course"

interface Props {
    courses: GetCourse[]
    currentUserId: number | undefined
}

export const CourseList = (props: Props) => {
    const {courses} = props

    return (
        <div className="d-flex flex-column">
            <Link to="/courses/create" className="btn btn-primary">Добавить курс</Link>

            <div className="d-flex flex-column">
                {
                    courses != undefined && courses.map((course, index) => (
                        <Course 
                            {...course} 
                            currentUserId={props.currentUserId}
                            key={index.toString()}
                            index={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}