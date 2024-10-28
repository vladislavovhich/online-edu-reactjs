import React from "react"
import { Outlet } from "react-router"
import { Header } from "./Header"

export const App = () => {
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