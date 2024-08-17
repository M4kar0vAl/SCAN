import useWindowSize from '../../../../../hooks/useWindowSize'
import ButtonLink from '/src/UI/ButtonLink/ButtonLink'
import './RateCard.css'
import { useAuth } from '../../../../../context/AuthContext'

const RateCard = ({ rate }) => {
    const { width } = useWindowSize()
    const colorClass = getColorClass(rate.name)
    const isAuthenticated = !!useAuth()

    return (
        <div className={'card' + (isAuthenticated && rate.is_active ? ` active ${colorClass}-border` : '')}>
            <div className={'card-header ' + `${colorClass}-bcg`}>
                <div>
                    <p className='card-title'>{rate.name}</p>
                    <p>{rate.description}</p>
                </div>
                <img className='card-icon' src={width <= 1440 ? rate.icon_sm : rate.icon} alt="" />
            </div>
            <div className='card-content'>
                {
                    width >= 1200
                        &&
                    <div className='current-container'>
                        {isAuthenticated && rate.is_active && <div className='current'>Текущий тариф</div>}
                    </div>
                }
                
                {
                    rate.is_discount
                        ?
                        <>
                            <span className='price'>{rate.discount_price} &#8381;</span>
                            <del className='old'>{rate.price} &#8381;</del>
                        </>
                        :
                        <span>{rate.price} &#8381;</span>
                }
                {
                    rate.has_installment
                        ?
                            <p className='installment'>или {rate.installment_price} &#8381;/мес. при рассрочке на {rate.installment_duration} мес.</p>
                        : 
                            <p className='installment'></p>
                }
                <div className='includes'>
                    <p>В тариф входит:</p>
                    <ul>
                        {rate.includes.map((i) => 
                            <li key={i}>{i}</li>
                        )}
                    </ul>
                </div>
                {
                    rate.is_active
                        ?
                            <ButtonLink color='gray'>Перейти в личный кабинет</ButtonLink>
                        :
                            <ButtonLink>Подробнее</ButtonLink>
                }
                
            </div>
        </div>
    )
}

function getColorClass(rateName) {
    let color
    
    switch (rateName) {
        case 'Beginner':
            color = 'yellow'
            break;
        
        case 'Pro':
            color = 'lightblue'
            break;

        case 'Business':
            color = 'black'
    }
    return color
}

export default RateCard