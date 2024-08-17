import { useState } from 'react'
import './DateInput.css'

const DateInput = ({ name, value, placeholder, onChange, required, error }) => {
    const [type, setType] = useState('text')
    
    return (
        <input
            className={`input date-input ${type === 'date' ? 'date' : ''} ${error ? 'error' : ''}`}
            type={type}
            name={name}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => setType('date')}
            onBlur={() => {
                if (value === '') {
                    setType('text')
                }
            }}
        />
    )
}

export default DateInput