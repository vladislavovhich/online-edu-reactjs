import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCourses } from "../../store/slices/course.slice"
import { AppDispatch, RootState } from "../../store/store"
import { CourseList } from "../Course/CourseList"

export const ProfileCourses = () => { 
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

    return (
        <div className="d-flex flex-column">
            <h3 className="h3 text-darker my-3">Курсы</h3>

            <hr className="mt-0 mb-3"/>

            <CourseList 
                courses={courses} 
                currentUserId={user.id}
            />
        </div>
    )
}