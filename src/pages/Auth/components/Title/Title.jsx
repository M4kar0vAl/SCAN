import './Title.css'

const Title = ({ children }) => {
    return (
        <h1 className='title-auth'>
            {children}
        </h1>
    )
}

export default Title