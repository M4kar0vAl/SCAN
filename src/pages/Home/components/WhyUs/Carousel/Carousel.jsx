import useWindowSize from '../../../../../hooks/useWindowSize'
import { useCarousel } from '../../../../../hooks/useCarousel'

import rightBtn from '../../../../../assets/home/whyUsCarousel/rightButton.svg'

import './Carousel.css'

const Carousel = ({ items, length }) => {
    const { width } = useWindowSize()

    if (width <= 1140) {
        length = 2
    }

    if (width <= 680) {
        length = 1
    }

    const {curItems, isNext, isPrev, handleNextClick, handlePrevClick} = useCarousel(items, length)

    return (
        <div className='carousel'>
            <button
                className={'carousel-btn left' + (!isPrev ? ' inactive' : '')}
                disabled={!isPrev}
                onClick={handlePrevClick}
            >
                    <img src={rightBtn} alt="" />
            </button>
            {curItems.map((item) =>
                <div key={item.text} className='carousel-item'>
                    <img src={item.icon} alt="" />
                    <p className='carousel-item-text'>{item.text}</p>
                </div>
            )}
            <button
                className={'carousel-btn right' + (!isNext ? ' inactive' : '')}
                disabled={!isNext}
                onClick={handleNextClick}
            >
                <img src={rightBtn} alt="" />
            </button>
        </div>
    )
}

export default Carousel