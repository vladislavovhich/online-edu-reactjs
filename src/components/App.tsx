import React, { useEffect } from "react"
import "../styles/common.css"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { authMe } from "../store/reducers/auth.reducer"
import { AppDispatch } from "../store/store"
import { Header } from "./Header"

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(authMe())
    }, [])

    return (
        <div>
            <Header />
            <main className='mt-3 mb-3'>
                <div className='container'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}