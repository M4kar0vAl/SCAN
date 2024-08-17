import spinnerUrl from '/src/assets/spinner.svg'

import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <img className='spinner' src={spinnerUrl} alt="spinner" />
  )
}

export default LoadingSpinner