import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollTopButton from "../components/ScrollTopButton";
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
  <div className="*:overflow-x-hidden">
    <Navbar />
    <div className="bg-[#f0f0f0] bg-cover min-h-screen">
      <div className="">
        <Outlet/>
      </div>
      <div className="max-md:pt-20">
        <Footer/>
      </div>
      <ScrollTopButton/>
    </div>
  </div>
  )
}

export default MainLayout
