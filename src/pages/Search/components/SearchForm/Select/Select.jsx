import './Select.css'

const Select = ({ id, name, value, onChange }) => {
  return (
    <>
        <label htmlFor="tonality" className="search-form-label">Тональность</label>
        <select name={name} id={id} className="input search-form-select" onChange={onChange} value={value}>
            <option value="any">Любая</option>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
        </select>
    </>
  )
}

export default Select