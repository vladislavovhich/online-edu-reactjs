import { faPersonChalkboard, faComments, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { User } from "../../types/auth.types"
import { ProfileNavBarLink } from "./ProfileNavBarLink"

interface Props {
    user: User
    currentUser: User | null
}

export const ProfileNavBar = (props: Props) => {
    return (
        <div className="d-flex flex-row justify-content-between py-3">
            <ProfileNavBarLink 
                text="Курсы"
                url="/profile/courses"
                icon={faPersonChalkboard}
            />

            {
                props.currentUser && props.currentUser.id == props.user.id && (
                    <>   
                        <ProfileNavBarLink 
                            text="Сообщения"
                            url="/messages"
                            icon={faComments}
                        />
            
                        <ProfileNavBarLink 
                            text="Настройки"
                            url="/profile/update"
                            icon={faGear}
                        />
                    </>
                )
            }
        </div>
    )
}