import './Checkbox.css'

const Checkbox = ({label, id, name, checked, onChange}) => {
  return (
    <div className='checkbox'>
        <input
            className='checkbox-input'
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
        />
        <label className={`checkbox-label ${checked ? 'checked' : ''}`} htmlFor={id}>
            {label}
        </label>
    </div>
  )
}

export default Checkbox