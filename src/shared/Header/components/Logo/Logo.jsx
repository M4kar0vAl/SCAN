import React from 'react'
import lightLogoURL from '../../../../assets/logo-light.svg'
import darkLogoURL from '../../../../assets/logo-dark.svg'
import './Logo.css'

const Logo = ({ isLight }) => {
    const logoUrl = isLight ? lightLogoURL : darkLogoURL

    return (
        <img className='logo' src={logoUrl} alt="logo" />
    )
}

export default Logo
