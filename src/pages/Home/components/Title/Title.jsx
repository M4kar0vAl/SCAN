import './Title.css'

const Title = ({children}) => {
  return (
    <h1 className='title-main'>
        {children}
    </h1>
  )
}

export default Title