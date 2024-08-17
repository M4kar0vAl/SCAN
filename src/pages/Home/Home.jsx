import ServiceInfo from "./components/ServiceInfo/ServiceInfo"
import WhyUs from "./components/WhyUs/WhyUs"
import Rates from "./components/Rates/Rates"
import imageURL from '../../assets/home/main2.svg'
import './Home.css'

const Home = () => {
    

    return (
        <>
            <ServiceInfo />
            <WhyUs />
            <img className="main-2-img" src={imageURL} alt="" />
            <Rates />
        </>
    )
}

export default Home