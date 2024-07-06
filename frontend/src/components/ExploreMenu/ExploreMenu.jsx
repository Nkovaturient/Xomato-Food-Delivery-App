import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu!</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one meal at a time!</p>
        <div className="explore-menu-list">
            {
                menu_list.map((menu, index)=>{
                    return (
                        <div /* prev!=menuname-in our state-will store- rolls,salad */
                        /*adding active class to img-when clicked & category==menuname-show active else empty str */
                        onClick={() => setCategory(prev => prev === menu.menu_name? 'All' : menu.menu_name) }
                         key={index} 
                         className="explore-menu-item">  
                            <img className={category === menu.menu_name ? "active": ""} src={menu.menu_image} alt="menu" />
                            <p>{menu.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu