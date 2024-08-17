import ButtonLink from '../../../../UI/ButtonLink/ButtonLink'
import Title from '../Title/Title'
import { useAuth } from '../../../../context/AuthContext'

import imageURL from '../../../../assets/home/main1.svg'

import './ServiceInfo.css'

const ServiceInfo = () => {
    const isAuthenticated = !!useAuth()
    
    return (
        <div className='container'>
            <div>
                <Title>
                    сервис по поиску<br />
                    публикаций<br />
                    о компании<br />
                    по его ИНН
                </Title>
                <p className='text'>
                    Комплексный анализ публикаций, получение данных<br/>
                    в формате PDF на электронную почту.
                </p>
                {isAuthenticated && <div className='btn-container'><ButtonLink to='/search' fs={22}>Запросить данные</ButtonLink></div>}
            </div>
            <img className='inner-img' src={imageURL} alt="" />
        </div>
    )
}

export default ServiceInfo