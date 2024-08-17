import './ToggleButton.css'

const ToggleButton = ({children, isActive, onClick}) => {
  return (
    <button
        className={'toggle-btn' + (isActive ? ' btn-active' : '')}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default ToggleButton