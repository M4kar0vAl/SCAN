import { useNavigate } from 'react-router-dom'

import Navbar from '../../Navbar/Navbar'
import AuthLinks from '../../AuthLinks/AuthLinks'
import Button from '/src/UI/Button/Button'

import { useAuth, useAuthDispatch } from '../../../../../context/AuthContext'
import { useLimitInfoDispatch } from '../../../../../context/LimitInfoContext'

import './BurgerMenuContent.css'
import { useHistogramsDispatch } from '../../../../../context/HistogramsContext'
import { useDocumentsInfoDispatch } from '../../../../../context/DocumentsContext'


const BurgerMenuContent = ( { onMenuClick }) => {
    const isAuthentcated = !!useAuth()
    const authDispatch = useAuthDispatch()
    const limitInfoDispatch = useLimitInfoDispatch()
    const histogramsDispatch = useHistogramsDispatch()
    const documentsInfoDispatch = useDocumentsInfoDispatch()
    const navigate = useNavigate()

    function handleLogoutClick() {
        onMenuClick()
        authDispatch({
            type: 'clearToken'
        })
        navigate('/auth', {replace: true})
        limitInfoDispatch({
            type: 'clearLimitInfo'
        })
        histogramsDispatch({
            type: 'clearHistograms'
        })
        documentsInfoDispatch({
            type: 'clearDocumentsInfo'
        })
    }

    return (
        <div className='menu-content'>
            <div className='navbar-wrapper'>
                <Navbar isBurger={true} onMenuClick={onMenuClick} />
            </div>
            {
                isAuthentcated
                ?
                <Button color='green' fs={20} ls={1} onClick={handleLogoutClick}>Выйти</Button>
                :
                <AuthLinks isBurger={true} onMenuClick={onMenuClick} />
            }
        </div>
    )
}

export default BurgerMenuContent