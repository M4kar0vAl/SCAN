import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({isBurger, onMenuClick}) => {
    let listClass = 'nav-list'
    let linkClass = 'nav-link'

    if (isBurger) {
        listClass += ' burger'
        linkClass += ' light'
    }
    
    return (
        <nav>
            <ul className={listClass}>
                <li><Link className={linkClass} to='/' onClick={onMenuClick}>Главная</Link></li>
                <li><Link className={linkClass} to='#'>Тарифы</Link></li>
                <li><Link className={linkClass} to='#'>FAQ</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar