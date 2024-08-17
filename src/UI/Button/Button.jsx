import './Button.css'

const Button = ({ children, color = 'blue', fs = 22, onClick, disabled = false, ls = 2 }) => {
    return (
        <button
            className={`btn ${color} fs-${fs} ls-${ls}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button