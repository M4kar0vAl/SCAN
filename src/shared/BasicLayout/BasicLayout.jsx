import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import BurgerMenuContent from '../Header/components/BurgerMenu/BurgerMenuContent/BurgerMenuContent'
import './BasicLayout.css'

const BasicLayout = ({ isMenuActive, onMenuClick }) => {
    return (
        <>
            <Header isMenuActive={isMenuActive} onMenuClick={onMenuClick} />
            {isMenuActive && <BurgerMenuContent onMenuClick={onMenuClick} />}
            <Outlet />
            <Footer />
        </>
    )
}

export default BasicLayout