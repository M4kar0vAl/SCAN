import AuthForm from './components/AuthForm/AuthForm'
import Title from './components/Title/Title'
import imageURL from '/src/assets/auth/auth1.svg' 
import useWindowSize from '../../hooks/useWindowSize'

import './Auth.css'

const Auth = () => {
    const { width } = useWindowSize()

    return (
        <>
            <div className='container-auth'>
                <Title> 
                    Для оформления подписки<br/>
                    <span style={width <= 400 ? {whiteSpace: 'nowrap'} : {}}>на тариф, необходимо</span><br/>
                    авторизоваться.
                </Title>
                <AuthForm />
                <img className='auth-img' src={imageURL} alt="" />
            </div>
        </>
    )
}

export default Auth