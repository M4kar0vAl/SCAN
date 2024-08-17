import { Link } from 'react-router-dom'

import ButtonLink from '/src/UI/ButtonLink/ButtonLink'

import { getDateToShow } from '../SummaryCarousel/SummaryCarousel'

import './DocumentCard.css'


const DocumentCard = ({ document }) => {
    const imgSrc = getDocumentImgSrc(document)
    
    return (
        <div className='document-card'>
            <div className='document-card-info'>
                <time dateTime="2021-09-13">{getDateToShow(document.issueDate)}</time>
                <Link to={document.url} target='_blank'>{getDocumentSourceToShow(document.source.name)}</Link>
            </div>
            <h3 className='document-card-title'>
                {document.title.text}
            </h3>
            {
                getDocumentTags(document.attributes).map((tag) => (
                    <div className='document-card-tag' key={tag}>
                        {tag}
                    </div>
                ))
            }
            {
                imgSrc
                ?
                    <img className='document-card-img' src={imgSrc} alt="" />
                :
                    null
            }
            <div
                className='document-card-text'
                dangerouslySetInnerHTML={{__html: getDocumentContent(document)}}
                style={imgSrc ? {} : {height: '390px'}}
            >
            </div>
            <div className='document-card-footer'>
                <ButtonLink to={document.url} color='green' fs={16} target='_blank'>Читать в источнике</ButtonLink>
                <span className='document-card-wordcount'>{document.attributes.wordCount} слова</span>
            </div>
        </div>
    )
}

function getDocumentImgSrc(document) {
    const scandoc = getScandocElement(document.content.markup)
    const imgSrc = scandoc.getElementsByTagName('img')[0]?.getAttribute('src')
    return imgSrc
}

function getDocumentContent(document) {
    const scandoc = getScandocElement(document.content.markup)
    const sentences = scandoc.getElementsByTagName('sentence')

    let result = ''
    
    for (let i = 0; i < sentences.length; i++) {
        for (const node of sentences[i].childNodes) {
            result += node.textContent
        }
        result += '<br/>'
    }

    const parser = new DOMParser()
    result = parser.parseFromString(result, 'text/html')
    const resulHTML = result.querySelector('body').outerHTML

    return resulHTML
}

function getDocumentSourceToShow(sourceName) {
    const arr = sourceName.split(' ')
    if (arr.length > 1) {
        arr.pop()
        const result = arr.join(' ')
        return result
    }

    return arr[0]
    
}

function getDocumentTags(documentAttributes) {
    let result = []

    if (documentAttributes.isAnnouncement) result.push('Анонсы и события')
    if (documentAttributes.isDigest) result.push('Сводки новостей')
    if (documentAttributes.isTechNews) result.push('Технические новости')

    return result
}

function getScandocElement(markup) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(markup, 'text/xml')
    return xmlDoc.getElementsByTagName('scandoc')[0]
}

export default DocumentCard
