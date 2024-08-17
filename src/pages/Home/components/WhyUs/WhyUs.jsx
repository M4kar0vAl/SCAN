import Carousel from './Carousel/Carousel'
import SubTitle from '../SubTitle/SubTitle'

import useWindowSize from '../../../../hooks/useWindowSize'

import icon1 from '../../../../assets/home/whyUsCarousel/icon1.svg'
import icon2 from '../../../../assets/home/whyUsCarousel/icon2.svg'
import icon3 from '../../../../assets/home/whyUsCarousel/icon3.svg'

import './WhyUs.css'

const carouselItems = [
    {
        icon: icon1,
        text: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        icon: icon2,
        text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        icon: icon3,
        text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
]

const WhyUs = () => {
    const { width } = useWindowSize()

    return (
        <div className='why-us'>
            <SubTitle>Почему {width <= 400 ? <br/> : ''} именно мы</SubTitle>
            <Carousel items={carouselItems} length={3} />
        </div>
    )
}

export default WhyUs