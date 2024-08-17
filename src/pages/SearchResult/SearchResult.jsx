import axios from 'axios'

import { useState } from 'react'

import Title from './components/Title/Title'
import Subtitle from './components/Subtitle/Subtitle'
import SummaryCarousel from './components/SummaryCarousel/SummaryCarousel'
import DocumentCard from './components/DocumentCard/DocumentCard'
import Button from '/src/UI/Button/Button'

import image1URL from '/src/assets/search_res/search_result1.svg'

import { getIdsForRequest } from '../Search/components/SearchForm/SearchForm'
import { useHistograms } from '../../context/HistogramsContext'
import { useDocumentsInfo, useDocumentsInfoDispatch } from '../../context/DocumentsContext'
import { useHandleTokenExpired } from '../../hooks/useHandleTokenExpired'

import './SearchResult.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

const SearchResult = () => {
    useHandleTokenExpired()
    const histograms = useHistograms()
    let documentsIds
    let documents
    let startIndex
    let hasMore
    const documentsInfo = useDocumentsInfo()
    if (documentsInfo) {
        const { documentsIds: _documentsIds, documents: _documents, startIndex: _startIndex, hasMore: _hasMore } = documentsInfo
        documentsIds = _documentsIds
        documents = _documents
        startIndex = _startIndex
        hasMore = _hasMore
    }
    const documentsInfoDispatch = useDocumentsInfoDispatch()
    const [isDisabled, setIsDisabled] = useState(false)

    async function handleMoreClick() {
        setIsDisabled(true)
        const { idsForRequest, isLast } = getIdsForRequest(documentsIds, startIndex)
        const URL = `${BASE_URL}/api/v1/documents`
        let resp
        try {
            resp = await axios.post(URL, { ids: idsForRequest })
        } catch (error) {
            console.error(error)
        }

        documentsInfoDispatch({
            type: 'setHasMore',
            isLast: isLast
        })

        documentsInfoDispatch({
            type: 'setDocuments',
            documents: [...documents, ...resp.data]
        })

        documentsInfoDispatch({
            type: 'setStartIndex',
            startIndex: startIndex + 10
        })

        setIsDisabled(false)
    }


    return (
        <>
            <div className='search-res-title-container'>
                <Title>
                    Ищем. <span className='title-search-res-emphasis'>Скоро<br />будут результаты</span>
                </Title>
                <p className='search-res-hint'>
                    Поиск может занять некоторое время,<br />
                    <span className='search-res-hint-emphasis'>просим сохранять терпение</span>.
                </p>
                <img src={image1URL} alt="" />
            </div>
            <div className='summary'>
                <Subtitle>Общая сводка</Subtitle>
                <p className='res-count'>Найдено {histograms?.length ?? '...'} вариантов</p>
                <SummaryCarousel />
            </div>
            <div className='document-list'>
                <Subtitle>Список документов</Subtitle>
                <div className='document-list-card-wrapper'>
                    {
                        documents
                        &&
                        documents.map((document) => (
                            <DocumentCard key={document.ok.id} document={document.ok} />
                        ))}
                </div>
                {hasMore && <Button onClick={handleMoreClick} fs={22} ls={4} disabled={isDisabled}>Показать больше</Button>}
            </div>
        </>
    )
}

export default SearchResult
