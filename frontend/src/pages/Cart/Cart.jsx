import React, { useContext } from 'react'
import './Cart.css';
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const{cartItems, food_list, url, removeFromCart, getTotalCartAmount}=useContext(storeContext);

  const navigate=useNavigate();
  


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index)=>{
            if(cartItems[item._id]>0){ /*if any cart items contains items  */
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/`+item.image} alt="img" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
                <hr />
                </div>
              )
            } 
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>+${getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button disabled={getTotalCartAmount() === 0 ? true : false} onClick={() => navigate('/placeorder') }>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Got a PROMO CODE? Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart