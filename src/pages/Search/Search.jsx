import SearchForm from './components/SearchForm/SearchForm'
import Title from './components/Title/Title'

import imageURL from '/src/assets/search/search1.svg'
import documentURL from '/src/assets/search/Document.svg'
import foldersURL from '/src/assets/search/Folders.svg'

import useWindowSize from '/src/hooks/useWindowSize.js'


import './Search.css'

const Search = ({formData, formErrors, onInputChange, onCheckboxChange, onSubmit}) => {
    const { width } = useWindowSize()

    return (
        <>
        <div className="container-search">
            <img className='document-img' src={documentURL} alt="" />
            <img className='folders-img' src={foldersURL} alt="" />
            <Title>
                Найдите{width <= 500 ? <br /> : ' '}
                необходимые<br />
                данные в пару{width <= 500 ? <br /> : ' '}
                кликов.
            </Title>
            <p className='search-hint'>
                Задайте параметры поиска.<br />
                <span className='search-hint-emphasis'>Чем больше заполните</span>, тем точнее поиск
            </p>
            <div className='search-form-container'>
                <SearchForm
                    formData={formData}
                    formErrors={formErrors}
                    onInputChange={onInputChange}
                    onCheckboxChange={onCheckboxChange}
                    onSubmit={onSubmit}
                />
                <img className='search-img' src={imageURL} alt="" />
            </div>
        </div>
        </>
    )
}

export default Search