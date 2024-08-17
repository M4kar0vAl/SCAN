import SubTitle from "../SubTitle/SubTitle"
import begginer from '../../../../assets/rates/begginer.svg'
import pro from '../../../../assets/rates/pro.svg'
import business from '../../../../assets/rates/business.svg'
import begginerSm from '../../../../assets/rates/beginner-sm.svg'
import proSm from '../../../../assets/rates/pro-sm.svg'
import businessSm from '../../../../assets/rates/business-sm.svg'
import RateCard from "./RateCard/RateCard"

import './Rates.css'

const Rates = () => {
  return (
    <>
        <SubTitle>наши тарифы</SubTitle>
        <div className="card-list">
            {rates.map((rate) => 
                <RateCard key={rate.name} rate={rate} />
            )}  
        </div>
    </>
    
  )
}

const rates = [
    {
        name: 'Beginner',
        description: 'Для небольшого исследования',
        icon: begginer,
        icon_sm: begginerSm,
        price: 1200,
        discount_price: 799,
        is_discount: true,
        installment_price: 150,
        installment_duration: 24,
        has_installment: true,
        includes: [
            'Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7',
        ],
        is_active: true,
    },
    {
        name: 'Pro',
        description: 'Для HR и фрилансеров',
        icon: pro,
        icon_sm: proSm,
        price: 2600,
        discount_price: 1299,
        is_discount: true,
        installment_price: 279,
        installment_duration: 24,
        has_installment: true,
        includes: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам',
        ],
        is_active: false,
    },
    {
        name: 'Business',
        description: 'Для корпоративных клиентов',
        icon: business,
        icon_sm: businessSm,
        price: 3700,
        discount_price: 2379,
        is_discount: true,
        installment_price: null,
        installment_duration: null,
        has_installment: false,
        includes: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка',
        ],
        is_active: false,
    },
]

export default Rates