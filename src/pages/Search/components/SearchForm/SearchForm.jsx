import Button from '/src/UI/Button/Button'
import Checkbox from "./Checkbox/Checkbox"
import DateInput from "./DateInput/DateInput"
import Input from "../../../Auth/components/AuthForm/Input/Input"
import Select from "./Select/Select"

import './SearchForm.css'

const SearchForm = ({ formData, formErrors, onInputChange, onCheckboxChange, onSubmit }) => {
    const isDisabled = !(formData.inn && formData.limit && formData.startDate && formData.endDate) ||
        formErrors.inn || formErrors.limit || formErrors.dateRange

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <div className="column">
                <Input
                    id='inn'
                    name='inn'
                    label='ИНН компании'
                    type='text'
                    placeholder='10 цифр'
                    variant="search"
                    onChange={onInputChange}
                    value={formData.inn}
                    required={true}
                    error={formErrors.inn}
                />
                <Select
                    id='tonality'
                    name='tonality'
                    value={formData.tonality}
                    onChange={onInputChange}
                />
                <Input
                    id='limit'
                    name='limit'
                    label='Количество документов в выдаче'
                    type='number'
                    placeholder="От 1 до 1000"
                    variant="search"
                    onChange={onInputChange}
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
                        onChange={onInputChange}
                        value={formData.startDate}
                        required={true}
                        error={formErrors.dateRange}
                    />
                    <DateInput
                        name='endDate'
                        placeholder='Дата конца'
                        onChange={onInputChange}
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
                        onChange={onCheckboxChange}
                        checked={formData.max_fullness}
                    />
                    <Checkbox
                        id='is_business'
                        name='is_business'
                        label='Упоминания в бизнес-контексте'
                        onChange={onCheckboxChange}
                        checked={formData.is_business}
                    />
                    <Checkbox
                        id='only_main_role'
                        name='only_main_role'
                        label='Главная роль в публикации'
                        onChange={onCheckboxChange}
                        checked={formData.only_main_role}
                    />
                    <Checkbox
                        id='only_with_risk_factors'
                        name='only_with_risk_factors'
                        label='Публикации только с риск-факторами'
                        onChange={onCheckboxChange}
                        checked={formData.only_with_risk_factors}
                    />
                    <Checkbox
                        id='is_tech_news'
                        name='is_tech_news'
                        label='Включать технические новости рынков'
                        onChange={onCheckboxChange}
                        checked={formData.is_tech_news}
                    />
                    <Checkbox
                        id='include_announcement'
                        name='include_announcement'
                        label='Включать анонсы и календари'
                        onChange={onCheckboxChange}
                        checked={formData.include_announcement}
                    />
                    <Checkbox
                        id='include_digest'
                        name='include_digest'
                        label='Включать сводки новостей'
                        onChange={onCheckboxChange}
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

export default SearchForm
