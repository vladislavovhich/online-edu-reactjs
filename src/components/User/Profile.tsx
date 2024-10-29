import React from "react"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material";
import { Badge } from "react-bootstrap";
import { stringAvatar } from "../../helpers/color-avatar.helper";
  
export const Profile = () => {
    const {user, isAuthorized} = useSelector((state: RootState) => state.auth)
    
    if (!user || !isAuthorized) {
        return null
    }

    const bgColor = user.role == "MENTOR" ? "success" : "primary"

    return (
        <div className="d-flex flex-row">
            <div className="d-flex flex-row align-items-center">
                <Avatar 
                    {...stringAvatar(`${user.name} ${user.surname}`, 56, 56)} 
                />
                
                <h3 className="mx-2">{`${user.name} ${user.surname}`}</h3>

                <Badge bg={bgColor}>{user.role}</Badge>
            </div>
        </div>
    )
}