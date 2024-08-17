import LoadingSpinner from '../../../../UI/LoadingSpinner/LoadingSpinner'

import { useLimitInfo } from '../../../../context/LimitInfoContext'

import './LimitInfo.css'


const LimitInfo = () => {
    let limitInfo = useLimitInfo()
    const isLoading = !limitInfo

    return (
        <div className='info'>
            {
            isLoading
            ?
            <LoadingSpinner />
            :
            <div className='info-grid'>
                <div className='info-text'>Использовано компаний</div>
                <div className='info-number'>{limitInfo.usedCompanyCount}</div>
                <div className='info-text'>Лимит по компаниям</div>
                <div className='info-number'>{limitInfo.companyLimit}</div>
            </div>
            }
        </div>
    )
}

export default LimitInfo
