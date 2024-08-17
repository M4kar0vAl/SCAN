import { Link } from "react-router-dom"
import './OAuthLink.css'

const OAuthLink = ({to, logoUrl}) => {
  return (
    <div className="oauth-link">
        <Link to={to}><img src={logoUrl} alt="" /></Link>
    </div>
  )
}

export default OAuthLink
