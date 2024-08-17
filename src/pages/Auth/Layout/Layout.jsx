import { Outlet } from 'react-router-dom'
import './Layout.css'

const AuthLayout = () => {
  return (
    <main className='main-auth'>
        <Outlet />
    </main>
  )
}

export default AuthLayout