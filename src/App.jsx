import axios from "axios"

import { useState } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom'

import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Search from './pages/Search/Search'
import SearchResult from './pages/SearchResult/SearchResult'
import BasicLayout from './shared/BasicLayout/BasicLayout'
import HomeLayout from './pages/Home/Layout/Layout'
import AuthLayout from './pages/Auth/Layout/Layout'
import SearchLayout from './pages/Search/Layout/Layout'
import AuthenticatedOnlyRoute from './routes/AuthenticatedOnlyRoute/AuthenticatedOnlyRoute'
import NotAuthenticatedOnlyRoute from './routes/NotAuthenticatedOnlyRoute/NotAuthenticatedOnlyRoute'

import { useHandleTokenExpired } from './hooks/useHandleTokenExpired'

import './App.css'

import { useHistogramsDispatch } from "./context/HistogramsContext"
import { useDocumentsInfoDispatch } from "./context/DocumentsContext"

const BASE_URL = import.meta.env.VITE_BASE_URL

function App() {
    useHandleTokenExpired()
    const navigate = useNavigate()
    const [isMenuActive, setIsMenuActive] = useState(false)

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
                const {idsForRequest, isLast} = getIdsForRequest(docIds, 0)
                const documentsResp = await axios.post(documentsURL, {ids: idsForRequest})
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
        <>
            <Routes>
                <Route path='/' element={<BasicLayout isMenuActive={isMenuActive} onMenuClick={() => setIsMenuActive(!isMenuActive)} />}>
                    <Route element={<HomeLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route element={<NotAuthenticatedOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                            <Route path='auth' element={<Auth />} />
                        </Route>
                    </Route>
                    <Route element={<AuthenticatedOnlyRoute />}>
                        <Route element={<SearchLayout />}>
                            <Route
                                path='search'
                                element={
                                    <Search
                                        formData={formData}
                                        formErrors={formErrors}
                                        onInputChange={handleInputChange}
                                        onCheckboxChange={handleCheckboxChange}
                                        onSubmit={handleSubmit}
                                    />
                                }
                            />
                            <Route
                                path='search/result'
                                element={
                                    <SearchResult />
                                }
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
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

export default App
