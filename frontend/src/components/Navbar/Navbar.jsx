import React, { useContext, useState } from 'react'
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate} from 'react-router-dom'
import { storeContext } from '../../context/storeContext';
import { toast } from 'react-toastify';

const Navbar = ({setLoginPopup}) => {
  //underline-effect for navbar menu
  //if hover, then "active class .active else {}"
  const [menu, setMenu]= useState("home");
  const{getTotalCartAmount, token, setToken}=useContext(storeContext);

  const navigate=useNavigate();
  

  const logout=async()=>{
    localStorage.removeItem('token');
    setToken(''); //after removing token-- ensuring setting token on user signup/login in storeContext
    toast.success('Logged out successfully!');
    navigate('/');
  }

  return (
    <div className='navbar text-3xl text-blue-600'>
      
    <Link to='/'><img src={assets.logo} alt="hero-img" className="logo" /></Link>

    <ul className="navbar-menu">  {/**now smooth scroll in index.css in root css */}
      <Link to='/' onClick={ ()=> setMenu("home")} className={menu === "home" ? "active" : ""}  >Home</Link>
      <a href='#explore-menu' onClick={ ()=> setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
      <a href='#app-download' onClick={ ()=> setMenu("download-mobile-app")} className={menu === "download-mobile-app" ? "active" : ""}>Download Mobile App</a>
      <a href='#footer' onClick={ ()=> setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
    </ul>

    <div className="navbar-right">
      <img src={assets.search_icon} alt="search-icon" />
      <div className="navbar-search-icon">
        <Link to='/cart'><img  src={assets.basket_icon} alt="basket-icon" /></Link>
         <div className={getTotalCartAmount() ? 'dot' : ''}></div> {/** when cart filled show this dot */}
      </div>
      {
        !token 
        ? <button onClick={() => setLoginPopup(true)}>Sign In</button>
        : <div className="navbar-profile">
          <img src={assets.profile_icon} alt="profile" />
          <ul className="nav-profile-dropdown">
            <li ><img src={assets.bag_icon} alt="bag" /><Link to={'/myorders'}>Orders</Link ></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
          </ul>
        </div>
      }
      
    </div>
    </div>
  )
}

export default Navbar