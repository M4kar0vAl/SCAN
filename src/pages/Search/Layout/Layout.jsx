import { Outlet } from 'react-router-dom'
import './Layout.css'

const SearchLayout = () => {
  return (
    <main className='main-search'>
        <Outlet />
    </main>
  )
}

export default SearchLayout