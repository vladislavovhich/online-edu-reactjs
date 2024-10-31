import React, { useEffect } from "react"
import { AppDispatch, RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { stringAvatar } from "../../helpers/color-avatar.helper";
import { useDispatch } from "react-redux";
import { ProfileNavBar } from "./ProfileNavBar"
import { Outlet, useParams, Navigate } from "react-router-dom"
import { getUser } from "../../store/slices/user-profile.slice";

export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams<{userId: string}>()
    const {user: userAuthorized, isAuthorized} = useSelector((state: RootState) => state.auth)
    const {user: profileUser} = useSelector((state: RootState) => state.userProfile)
 
    useEffect(() => {
        if (!!params.userId && !Number.isNaN(params.userId)) {
            const userId = parseInt(params.userId)
            
            dispatch(getUser(userId))
        }
    }, [params.userId])

    if (!userAuthorized && !profileUser) {
        return null
    }

    if (userAuthorized && profileUser && userAuthorized.id == profileUser.id) {
        return <Navigate to="/profile" />
    }

    const user = !Number.isNaN(params.userId) ? userAuthorized : profileUser

    if (!user) {
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
                
                <h3 className="mx-2 text-darker">{`${user.name} ${user.surname}`}</h3>

                <div className={`${bgColor} text-white badge`}>{text}</div>
            </div>

            <hr className="my-0"/>

            <ProfileNavBar 
                user={user}
                currentUser={userAuthorized}
            />

            <hr className="my-0"/>

            <div className="d-flex flex-column">
                <Outlet />
            </div>
        </div>
    )
}