import './Input.css'

const Input = ({ label, id, type, name, value, onChange, onFocus, error, placeholder = '', variant = 'login', required = false, min = null, max = null }) => {
    return (
        <>
            {
                label
                ?
                <label className={`${variant}-form-label ${required ? 'required' : ''} ${error ? 'label-error' : ''}`} htmlFor={id}>{label}</label>
                :
                null
            }
            <input
                className={`input ${variant}-form-input ${error ? 'error' : ''}`}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                required={required}
                {...type === 'number' && {min: min, max: max}}
            />
            {error && <p className='error'>{error}</p>}
        </>
    )
}

export default Input