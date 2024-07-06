import React, { useContext, useState } from 'react'
import './FoodItems.css'
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/storeContext';

const FoodItems = ({ name, image, price, description, id}) => {
  //'add to cart' feature
  // const[itemCount, setItemCount]= useState(0); //32products-its creating state var for each product-not gd practise
  //hence, assigning these 'product card data' state to contextAPi , then passing it down 

  const {cartItems, addToCart, removeFromCart, url}=useContext(storeContext);
  
  return (
    <div className='food-item' key={id}> 
    <div className="food-item-img-container">
      <img className='food-item-img' src={`${url}/images/`+image} alt={name} />
      { //if count=0 else inc/dec the item
       !cartItems[id]
       ? <img className='add' src={assets.add_icon_white} onClick={()=> addToCart(id)} />
       : <div className="food-item-counter"> 
        <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
        <p>{cartItems[id]}</p> 
        <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt="add" />
       </div>
      }
    </div>
    <div className="food-item-info">
      <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="rating" />
      </div>
    </div>
    <p className="food-item-description">{description}</p>
    <p className="food-item-price">${price}</p>

    </div>
  )
}

export default FoodItems