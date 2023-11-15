import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import Navbar from '../../components/NavBar/NavBar'
import Home from '../Home/Home'
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import Vehicle from '../Vehicle/Vehicle';
import BabyCategory from '../../components/BabyCategory/BabyCategory';
import Location from '../../components/Location/Location';
import FooterWithSitemap  from '../../components/Footer/Footer';
import Faq from '../../components/Faq/Faq';
import AboutUs from '../../components/AboutUs/AboutUs';
import Cart from '../../components/CartIcon/CartIcon';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import Cancel from '../../components/Cancel/Cancel'
import Success from '../../components/Success/Success'
import Search from '../../components/Search/Search';
export default function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="">
  <Navbar user={user} />
  <Search />
  <Routes>

    <Route path="/cancel" element={<Cancel />} />
    <Route path="/success" element={<Success />} />
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Vehicle />} />
    <Route path="/:name/:id" element={<ProductDetail user={user} setUser={setUser}/>} />
    <Route path="/model/:modelId" element={<BabyCategory />} />
    <Route path="/location" element={<Location />} />
    <Route path="/faqs" element={<Faq />} />
    <Route path="/about-us" element={<AboutUs />} />
      <Route path="/cart" element={user ? <OrderDetail /> : <Navigate to='/login' />} />
    <Route path="/login" element={<AuthPage setUser={setUser}/>} />
  </Routes>
  <FooterWithSitemap />
</main>
  );
}


