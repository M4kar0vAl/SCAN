import { useState } from "react"
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Search from './pages/Search/Search'
import SearchResult from './pages/SearchResult/SearchResult'
import BasicLayout from './shared/BasicLayout/BasicLayout'
import HomeLayout from './pages/Home/Layout/Layout'
import AuthLayout from './pages/Auth/Layout/Layout'
import SearchLayout from './pages/Search/Layout/Layout'
import AuthenticatedOnlyRoute from './routes/AuthenticatedOnlyRoute/AuthenticatedOnlyRoute'
import NotAuthenticatedOnlyRoute from './routes/NotAuthenticatedOnlyRoute/NotAuthenticatedOnlyRoute'

import { useHandleTokenExpired } from './hooks/useHandleTokenExpired'

import './App.css'

function App() {
    useHandleTokenExpired()
    const [isMenuActive, setIsMenuActive] = useState(false)

    return (
        <>
            <Routes>
                <Route path='/' element={<BasicLayout isMenuActive={isMenuActive} onMenuClick={() => setIsMenuActive(!isMenuActive)} />}>
                    <Route element={<HomeLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route element={<NotAuthenticatedOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                            <Route path='auth' element={<Auth />} />
                        </Route>
                    </Route>
                    <Route element={<AuthenticatedOnlyRoute />}>
                        <Route element={<SearchLayout />}>
                            <Route
                                path='search'
                                element={<Search />}
                            />
                            <Route
                                path='search/result'
                                element={<SearchResult />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
