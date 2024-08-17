import React from 'react'
import Logo from '../Header/components/Logo/Logo'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='inner-footer'>
                <Logo isLight={true} />
                <div className='footer-content'>
                    <p>
                        г. Москва, Цветной б-р, 40<br />
                        +7 495 771 21 11<br />
                        info@skan.ru
                    </p>
                    <p>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer