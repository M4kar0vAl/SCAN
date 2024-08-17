import { useNavigate } from 'react-router-dom'

import { useAuthDispatch } from '../../../../context/AuthContext'
import { useLimitInfoDispatch } from '../../../../context/LimitInfoContext'
import { useHistogramsDispatch } from '../../../../context/HistogramsContext'

import avatarURL from '../../../../assets/avatar_example.svg'

import './Avatar.css'
import { useDocumentsInfoDispatch } from '../../../../context/DocumentsContext'

const Avatar = () => {
    const dispatch = useAuthDispatch()
    const limitInfoDispatch = useLimitInfoDispatch()
    const histogramsDispatch = useHistogramsDispatch()
    const documentsInfoDispatch = useDocumentsInfoDispatch()
    const navigate = useNavigate()

    function handleClick() {
        dispatch({
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
        <div className='avatar'>
            <div className='avatar-info'>
                <p>Алексей А.</p>
                <button onClick={handleClick}>Выйти</button>
            </div>
            <img className='avatar-img' width={32} height={32} src={avatarURL} alt="avatar" />
        </div>
    )
}

export default Avatar