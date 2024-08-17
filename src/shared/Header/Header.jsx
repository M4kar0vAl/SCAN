import Logo from './components/Logo/Logo'
import Navbar from './components/Navbar/Navbar'
import AuthLinks from './components/AuthLinks/AuthLinks'
import LimitInfo from './components/LimitInfo/LimitInfo.jsx'
import Avatar from './components/Avatar/Avatar.jsx'
import BurgerMenuButton from './components/BurgerMenu/BurgerMenuButton/BurgerMenuButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

import './Header.css'

const Header = ({isMenuActive, onMenuClick}) => {
    const isAuthenticated = !!useAuth() 

    return (
        <header className={'header' + (isMenuActive ? ' dark' : '')}>
            <div className='inner-header'>
                <Logo isLight={isMenuActive} />
                <Navbar />
                {
                    isAuthenticated
                        ?
                        <>
                            {!isMenuActive && <LimitInfo />}
                            <Avatar />
                        </>
                        :
                        <AuthLinks />
                }
                <BurgerMenuButton isActive={isMenuActive} onClick={onMenuClick} />
            </div>
            
        </header>
    )
}

export default Header