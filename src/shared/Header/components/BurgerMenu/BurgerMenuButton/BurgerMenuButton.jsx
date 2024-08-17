import React from 'react'
import inactveBurgerURL from '../../../../../assets/burger-menu.svg'
import activeBurgerURL from '../../../../../assets/burger-menu-active.svg'
import './BurgerMenuButton.css'

const BurgerMenuButton = ({isActive, onClick}) => {
    let menuIcon = isActive ? activeBurgerURL : inactveBurgerURL

    return (
        <button className='menu-button' onClick={onClick}>
            <img src={menuIcon} alt="menu button" />
        </button>
    )
}

export default BurgerMenuButton