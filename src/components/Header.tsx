import React from "react"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { useDispatch } from "react-redux"
import { signOut } from "../store/reducers/auth.reducer"
import { Link } from "react-router-dom"

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user, isAuthorized} = useSelector((state: RootState) => state.auth)

    const handleSignOut = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(signOut())
    }

    return (
        <header className='Header bg-light border'>
            <div className="container">
                <nav className="navbar bg-light d-flex justify-content-between">
                    <a className="navbar-brand" href="#">Edu</a> 

                     {
                        (isAuthorized && !!user) ? (
                            <input 
                                type="button" 
                                className="btn btn-danger" 
                                value="Выйти"
                                onClick={handleSignOut}
                            />
                        ) : (
                            <Link to="/auth/sign-in" className="btn btn-success">Войти</Link>
                        )
                    }  
                </nav>
            </div>
        </header>
    )
}