import axios from "axios"

import { useState } from "react"

import { useNavigate } from 'react-router-dom'

import Button from '/src/UI/Button/Button'
import Checkbox from "./Checkbox/Checkbox"
import DateInput from "./DateInput/DateInput"
import Input from "../../../Auth/components/AuthForm/Input/Input"
import Select from "./Select/Select"

import { useHistogramsDispatch } from "../../../../context/HistogramsContext"
import { useDocumentsInfoDispatch } from "../../../../context/DocumentsContext"

import './SearchForm.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

const SearchForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        inn: '',
        tonality: 'any',
        limit: '',
        startDate: '',
        endDate: '',
        max_fullness: false,
        is_business: false,
        only_main_role: false,
        only_with_risk_factors: false,
        is_tech_news: false,
        include_announcement: false,
        include_digest: false,
    })

    const [formErrors, setFormErrors] = useState({
        inn: '',
        limit: '',
        dateRange: ''
    })

    const isDisabled = !(formData.inn && formData.limit && formData.startDate && formData.endDate) ||
        formErrors.inn || formErrors.limit || formErrors.dateRange

    const histogramsDispatch = useHistogramsDispatch()
    const documentsInfoDispatch = useDocumentsInfoDispatch()

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'inn') {
            if (!value) {
                setFormErrors((prev) => ({
                    ...prev,
                    inn: 'Обязательное поле'
                }))
            } else if (!isInnValid(value)) {
                setFormErrors((prev) => ({
                    ...prev,
                    inn: 'Введите корректные данные'
                }))
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    inn: ''
                }))
            }
        } else if (name === 'limit') {
            if (!value) {
                setFormErrors((prev) => ({
                    ...prev,
                    limit: 'Обязательное поле'
                }))
            } else if (!isLimitValid(value)) {
                setFormErrors((prev) => ({
                    ...prev,
                    limit: 'Введите корректные данные'
                }))
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    limit: ''
                }))
            }
        } else if (name === 'startDate') {
            const endDate = formData.endDate

            if (!value) {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: 'Обязательное поле'
                }))
            } else if (!isDatesValid(value, endDate)) {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: 'Введите корректные данные'
                }))
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: ''
                }))
            }
        } else if (name === 'endDate') {
            const startDate = formData.startDate

            if (!value) {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: 'Обязательное поле'
                }))
            } else if (!isDatesValid(startDate, value)) {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: 'Введите корректные данные'
                }))
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    dateRange: ''
                }))
            }
        }
    }

    function handleCheckboxChange(e) {
        const { name, checked } = e.target

        setFormData({
            ...formData,
            [name]: checked
        })
    }

    async function handleSubmit(e) {
        histogramsDispatch({
            type: 'clearHistograms'
        })
        documentsInfoDispatch({
            type: 'clearDocumentsInfo',
        })
        e.preventDefault()
        navigate('/search/result')

        const data = getDataForRequest(formData)

        try {
            // fetch histograms
            const URL = `${BASE_URL}/api/v1/objectsearch/histograms`
            const resp = await axios.post(URL, data)
            histogramsDispatch({
                type: 'setHistograms',
                histograms: normalizeHistograms(resp.data.data)
            })
        } catch (error) {
            console.error(error)
        }

        try {
            // fetch documents ids
            const URL = `${BASE_URL}/api/v1/objectsearch`
            const resp = await axios.post(URL, data)
            const docIds = resp.data.items.map((item) => item.encodedId)
            documentsInfoDispatch({
                type: 'setDocumentsIds',
                documentsIds: docIds
            })

            // fetch first 10 documents
            const documentsURL = `${BASE_URL}/api/v1/documents`
            if (docIds.length > 0) {
                // make request only if documents ids found
                const { idsForRequest, isLast } = getIdsForRequest(docIds, 0)
                const documentsResp = await axios.post(documentsURL, { ids: idsForRequest })
                documentsInfoDispatch({
                    type: 'setStartIndex',
                    startIndex: 10
                })
                documentsInfoDispatch({
                    type: 'setHasMore',
                    isLast: isLast
                })
                documentsInfoDispatch({
                    type: 'setDocuments',
                    documents: documentsResp.data
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="column">
                <Input
                    id='inn'
                    name='inn'
                    label='ИНН компании'
                    type='text'
                    placeholder='10 цифр'
                    variant="search"
                    onChange={handleInputChange}
                    value={formData.inn}
                    required={true}
                    error={formErrors.inn}
                />
                <Select
                    id='tonality'
                    name='tonality'
                    value={formData.tonality}
                    onChange={handleInputChange}
                />
                <Input
                    id='limit'
                    name='limit'
                    label='Количество документов в выдаче'
                    type='number'
                    placeholder="От 1 до 1000"
                    variant="search"
                    onChange={handleInputChange}
                    value={formData.limit}
                    required={true}
                    error={formErrors.limit}
                    min={1}
                    max={1000}
                />
                <div className="search-range">
                    <p className={`search-form-label required ${formErrors.dateRange ? 'label-error' : ''}`}>Диапазон поиска</p>
                    <DateInput
                        name='startDate'
                        placeholder='Дата начала'
                        onChange={handleInputChange}
                        value={formData.startDate}
                        required={true}
                        error={formErrors.dateRange}
                    />
                    <DateInput
                        name='endDate'
                        placeholder='Дата конца'
                        onChange={handleInputChange}
                        value={formData.endDate}
                        required={true}
                        error={formErrors.dateRange}
                    />
                    {formErrors.dateRange && <p className="error">{formErrors.dateRange}</p>}
                </div>
            </div>
            <div className="column">
                <div className="checkbox-container">
                    <Checkbox
                        id='max_fullness'
                        name='max_fullness'
                        label='Признак максимальной полноты'
                        onChange={handleCheckboxChange}
                        checked={formData.max_fullness}
                    />
                    <Checkbox
                        id='is_business'
                        name='is_business'
                        label='Упоминания в бизнес-контексте'
                        onChange={handleCheckboxChange}
                        checked={formData.is_business}
                    />
                    <Checkbox
                        id='only_main_role'
                        name='only_main_role'
                        label='Главная роль в публикации'
                        onChange={handleCheckboxChange}
                        checked={formData.only_main_role}
                    />
                    <Checkbox
                        id='only_with_risk_factors'
                        name='only_with_risk_factors'
                        label='Публикации только с риск-факторами'
                        onChange={handleCheckboxChange}
                        checked={formData.only_with_risk_factors}
                    />
                    <Checkbox
                        id='is_tech_news'
                        name='is_tech_news'
                        label='Включать технические новости рынков'
                        onChange={handleCheckboxChange}
                        checked={formData.is_tech_news}
                    />
                    <Checkbox
                        id='include_announcement'
                        name='include_announcement'
                        label='Включать анонсы и календари'
                        onChange={handleCheckboxChange}
                        checked={formData.include_announcement}
                    />
                    <Checkbox
                        id='include_digest'
                        name='include_digest'
                        label='Включать сводки новостей'
                        onChange={handleCheckboxChange}
                        checked={formData.include_digest}
                    />
                </div>
                <div className="search-form-btn-container">
                    <Button disabled={isDisabled}>Поиск</Button>
                    <p>* Обязательные к заполнению поля</p>
                </div>
            </div>
        </form>
    )
}

function getDataForRequest(formData) {
    const dataForRequest = {
        "issueDateInterval": {
            "startDate": formData.startDate,
            "endDate": formData.endDate
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": formData.inn,
                        "maxFullness": formData.max_fullness,
                        "inBusinessNews": formData.is_business
                    }
                ],
                "onlyMainRole": formData.only_main_role,
                "tonality": formData.tonality,
                "onlyWithRiskFactors": formData.only_with_risk_factors,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
        },
        "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
        },
        "attributeFilters": {
            "excludeTechNews": !formData.is_tech_news,
            "excludeAnnouncements": !formData.include_announcement,
            "excludeDigests": !formData.include_digest
        },
        "similarMode": "duplicates",
        "limit": formData.limit,
        "sortType": "sourceInfluence",
        "sortDirectionType": "desc",
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ]
    }

    return dataForRequest
}

function normalizeHistograms(dataArr) {
    const totalDocumentsArray = dataArr[0]?.data
    const riskFactorsArray = dataArr[1]?.data

    let result = []

    if (!totalDocumentsArray || !riskFactorsArray) return result

    for (let i = 0; i < totalDocumentsArray.length; i++) {
        result.push({
            date: totalDocumentsArray[i].date,
            totalDocuments: totalDocumentsArray[i].value,
            riskFactors: riskFactorsArray[i].value
        })
    }

    return result
}

export function getIdsForRequest(idsArray, startIndex) {
    const result = []
    let isLast = false

    for (let i = startIndex; i < startIndex + 10; i++) {
        if (idsArray[i] !== undefined) {
            result.push(idsArray[i])
        } else {
            isLast = true;
            break;
        }
    }

    if (!idsArray[startIndex + 10]) isLast = true

    return { idsForRequest: result, isLast }
}

function isInnValid(inn) {
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }
    if (!inn.length) {
        return false
    } else if (/[^0-9]/.test(inn)) {
        return false
    } else if ([10, 12].indexOf(inn.length) === -1) {
        return false
    } else {
        const checkDigit = (inn, coefficients) => {
            let n = 0;
            for (let i in coefficients) {
                n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10);
        };
        switch (inn.length) {
            case 10:
                let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(inn[9])) {
                    return true
                }
                break;
            case 12:
                // let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                // let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                // if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                // 	return true
                // }
                return false // backend only accepts 10-digit inn
                break;
        }
    }
    return false;
}

function isLimitValid(limit) {
    if (/^\d{1,4}$/.test(limit)) {
        let num = parseInt(limit)
        return 1 <= num && num <= 1000
    }
    return false
}

function isDatesValid(startDate, endDate) {
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    if (startDate > endDate) {
        return false
    } else if (startDate > Date.now() || endDate > Date.now()) {
        return false
    }

    return true
}

export default SearchForm
