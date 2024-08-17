import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Button from "/src/UI/Button/Button"
import Input from "../Input/Input"
import OAuthLink from "../OAuthLink/OAuthLink"
import { useAuthDispatch } from "../../../../../context/AuthContext"

import googleLogo from '/src/assets/auth/oauth/google.svg'
import facebookLogo from '/src/assets/auth/oauth/facebook.svg'
import yandexLogo from '/src/assets/auth/oauth/yandex.svg'

import './LogInForm.css'
import { useLimitInfoDispatch } from "../../../../../context/LimitInfoContext"

const BASE_URL = import.meta.env.VITE_BASE_URL

const LogInForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState({
        login: '',
        password: ''
    })

    const dispatch = useAuthDispatch()
    const limitInfoDispatch = useLimitInfoDispatch()
    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(true)

    function handleInputChange(e) {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        if (name === 'login') {
            if (!isLoginValid(value) && !isPhoneValid(value)) {
                setFormErrors((prev) => ({
                    ...prev,
                    [name]: 'Введите корректные данные'
                }))
                setIsDisabled(true)
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    [name]: ''
                }))
                setIsDisabled(false)
            }
        } else if (name === 'password') {
            if (!value) {
                setFormErrors((prev) => ({
                    ...prev,
                    [name]: 'Неправильный пароль'
                }))
                setIsDisabled(true)
            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    [name]: ''
                }))
                setIsDisabled(false)
            }
        }
    }

    function handleInputFocus(e) {
        const {name} = e.target;

        setFormErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }


    async function handleSubmit(e) {
        setIsDisabled(true)
        e.preventDefault()
        let token = ''
        try {
            const URL = `${BASE_URL}/api/v1/account/login`
            const resp = await axios.post(URL, formData)
            token = resp.data
            dispatch({
                type: 'setToken',
                token: resp.data
            })
            setIsDisabled(false)
            navigate('/', {replace: true})
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message
                setFormErrors((prev) => ({
                    ...prev,
                    password: errorMsg
                }))
                setIsDisabled(true)
            } else {
                console.error(error)
            }
        }

        try {
            const URL = `${BASE_URL}/api/v1/account/info`
            const resp = await axios.get(URL, {headers: {'Authorization': `Bearer ${token.accessToken}`}})
            await limitInfoDispatch({
                type: 'setLimitInfo',
                limitInfo: resp.data.eventFiltersInfo
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <Input
                    label='Логин или номер телефона:'
                    id='login'
                    type='text'
                    name='login'
                    value={formData.login}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={formErrors.login}
                />
                <Input
                    label='Пароль:'
                    id='pass'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={formErrors.password}
                />
                <Button ls={2} disabled={isDisabled}>Войти</Button>
            </form>
            <Link to='#' className="reset-psw-link">Восстановить пароль</Link>
            <p className="login-form-label">Войти через:</p>
            <div className="oauth-container">
                <OAuthLink to='#' logoUrl={googleLogo} />
                <OAuthLink to='#' logoUrl={facebookLogo} />
                <OAuthLink to='#' logoUrl={yandexLogo} />
            </div>
        </>
    )
}

function isPhoneValid(phone) {
    // +7 999 999 99 99 (+7 и 10 цифр, между группами цифр от 0 до бесконечности пробелов)
    let phoneRegExp = /^\+7\s*\d{3}\s*\d{3}\s*\d{2}\s*\d{2}\s*$/
    return phoneRegExp.test(phone)
}

function isLoginValid(login) {
    // буквы, цифры и "_", длина не более 50 символов
    let loginRegExp = /^\w{1,50}$/
    return loginRegExp.test(login)
}

export default LogInForm
