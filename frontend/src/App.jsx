import React, { Suspense, lazy, useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home.jsx';
// import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx';
import { assets } from './assets/assets.js';
import Spinner from './components/Spinner/Spinner.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
const Home= lazy(() => import('./pages/Home/Home.jsx'));
const Cart=lazy(()=> import('./pages/Cart/Cart.jsx'));


const App = () => {

  const[loginPopup, setLoginPopup]=useState(false);

  return (
    <>
    <ToastContainer/>
    <Suspense fallback={<Spinner />}>
    { //to display above the app component
      loginPopup ? <LoginPopup  setLoginPopup={setLoginPopup} /> : ''
    }
    <div className='app'>
      <Navbar setLoginPopup={setLoginPopup}/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart /> } />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>

    <Footer />
    </Suspense>
    </>
  )
}

export default App