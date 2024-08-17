import { Link } from "react-router-dom"
import './ButtonLink.css'

const ButtonLink = ({ children, to = '#', color = 'blue', fs = 20, isSmall = false, fw = 400, onClick, target = '_self'}) => {
    return (
        <Link
            to={to}
            className={`link-btn ${color} ${isSmall ? 'small' : `fs-${fs}`} fw-${fw}`}
            onClick={onClick}
            target={target}
        >
            {children}
        </Link>
    )
}

export default ButtonLink