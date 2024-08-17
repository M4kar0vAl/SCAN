import { Outlet } from "react-router-dom"

import './Layout.css'

const Layout = () => {
    return (
        <main className="main-home">
            <Outlet />
        </main>
    )
}

export default Layout
