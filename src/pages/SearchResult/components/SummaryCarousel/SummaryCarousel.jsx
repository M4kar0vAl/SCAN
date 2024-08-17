import rightBtn from '/src/assets/home/whyUsCarousel/rightButton.svg'
import LoadingSpinner from '/src/UI/LoadingSpinner/LoadingSpinner'

import { useCarousel } from '../../../../hooks/useCarousel'
import useWindowSize from '../../../../hooks/useWindowSize'
import { useHistograms } from '../../../../context/HistogramsContext'

import './SummaryCarousel.css'


const SummaryCarousel = () => {
    const { width } = useWindowSize()
    const histograms = useHistograms()
    const isLoading = !histograms

    const length = getCarouselLength(width)

    const {
        curItems,
        isNext,
        isPrev,
        handlePrevClick,
        handleNextClick
    } = useCarousel(histograms ?? [], length)

    return (
        <div className='summary-carousel'>
            <button
                className={`carousel-btn left ${!isPrev ? ' inactive' : ''}`}
                onClick={handlePrevClick}
            >
                <img src={rightBtn} alt="" />
            </button>
            <div className='carousel-legend'>
                <p>Период</p>
                <p>Всего</p>
                <p>Риски</p>
            </div>
            <div className='carousel-wrapper'>
                {
                    isLoading
                    ?
                    <div className='loader'>
                        <LoadingSpinner />
                        {width > 560 && <p>Загружаем данные</p>}
                    </div>
                    :
                    curItems.map((item, index) => {
                        if (item === undefined) {
                            return (
                                <div key={index} className='summary-carousel-item'></div>
                            )
                            
                        }
                        return (
                            <div key={item.date} className='summary-carousel-item'>
                                <p>{getDateToShow(item.date)}</p>
                                <p>{item.totalDocuments}</p>
                                <p>{item.riskFactors}</p>
                            </div>
                        )
                    }
                    )
                }
            </div>
            <button
                className={`carousel-btn right ${!isNext ? ' inactive' : ''}`}
                onClick={handleNextClick}
            >
                <img src={rightBtn} alt="" />
            </button>
        </div>
    )
}

function getCarouselLength(width) {
    let length = 8;
    
    if (width <= 560) {
        length = 1;
    } else if (width <= 850) {
        length = 2;
    } else if (width <= 1170) {
        length = 4;
    } else if (width <= 1400) {
        length = 6;
    } else if (width >= 1700) {
        length = 10
    }

    return length
}

export function getDateToShow(datestring) {
    const date = new Date(Date.parse(datestring))
    
    let day = String(date.getDate())
    if (day.length === 1) day = '0' + day

    let month = String(date.getMonth() + 1)
    if (month.length === 1) month = '0' + month

    return `${day}.${month}.${date.getFullYear()}`
}

export default SummaryCarousel
