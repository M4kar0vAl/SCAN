import React from 'react'
import { Link } from 'react-router-dom'
import separatorURL from '../../../../assets/Rectangle7.svg'
import './AuthLinks.css'
import ButtonLink from '/src/UI/ButtonLink/ButtonLink'

const AuthLinks = ({ isBurger, onMenuClick }) => {
    let regLinkClass = isBurger ? 'reg-link-burger' : 'reg-link'

    return (
        <>
            {
                isBurger
                    ?
                    <div className='burger-links'>
                        <Link className={regLinkClass} to='#'>Зарегистрироваться</Link>
                        <ButtonLink color='green' fw={500} to='/auth' onClick={onMenuClick}>Войти</ButtonLink>
                    </div>
                    :
                    <div className='auth-links'>
                        <div className='auth-inner'>
                            <Link className={regLinkClass} to='#'>Зарегистрироваться</Link>
                            <img className='sep' width={2} height={26} src={separatorURL} alt="" />
                            <ButtonLink color={'green'} isSmall={true} fw={500} to='/auth' >Войти</ButtonLink>
                        </div>
                    </div>
            }
        </>
    )
}

export default AuthLinks

