import ToggleButton from "./ToggleButton/ToggleButton"
import { useState } from "react"
import LogInForm from "./LogInForm/LogInForm"
import SignUpForm from "./SignUpForm/SignUpForm"
import './AuthForm.css'

const AuthForm = () => {
    const [logInIsActive, setLoginIsActive] = useState(true)
    
    return (
        <div className="auth-form">
            <div className="toggle-btn-container">
                <ToggleButton isActive={logInIsActive} onClick={() => setLoginIsActive(true)}>Войти</ToggleButton>
                <ToggleButton isActive={!logInIsActive} onClick={() => setLoginIsActive(false)}>Зарегистрироваться</ToggleButton>
            </div>
            {
                logInIsActive
                    ?
                    <LogInForm />
                    :
                    <SignUpForm />
            }
            
        </div>
    )
}

export default AuthForm