import React, { useEffect } from "react"
import { AppDispatch, RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { stringAvatar } from "../../helpers/color-avatar.helper";
import { CourseList } from "../Course/CourseList";
import { useDispatch } from "react-redux";
import { getCourses } from "../../store/slices/course.slice";

export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user, isAuthorized} = useSelector((state: RootState) => state.auth)
    const {courses} = useSelector((state: RootState) => state.course)
    
    useEffect(() => {
        if (!user) {
            return
        }

        dispatch(getCourses(user.id))
    }, [user])

    if (!user || !isAuthorized) {
        return null
    }

    const bgColor = user.role == "MENTOR" ? "bg-success" : "bg-primary"
    const text = user.role == "MENTOR" ? "Учитель" : "Студент"

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center mb-3">
                <Avatar 
                    {...stringAvatar(`${user.name} ${user.surname}`, 56, 56)} 
                />
                
                <h3 className="mx-2">{`${user.name} ${user.surname}`}</h3>

                <div className={`${bgColor} text-white badge`}>{text}</div>
            </div>

            <hr className="my-0"/>

            <div className="d-flex flex-column">
                <h3 className="h3 text-primary my-3">Курсы</h3>

                <hr className="mt-0 mb-3"/>

                <CourseList 
                    courses={courses} 
                    currentUserId={user.id}
                />
            </div>
        </div>
    )
}