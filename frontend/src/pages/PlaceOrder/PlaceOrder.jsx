import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { storeContext } from '../../context/storeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  const{ getTotalCartAmount, token, food_list, cartItems, url}=useContext(storeContext);

  const [data, setData]=useState({
    firstName: '',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pincode: '',
    country: '',
    phone: '',

  });

  const onChangeHandler=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setData(data => ({ ...data, [name]: value}));
  }

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo=item;
        itemInfo['quantity']=cartItems[item._id]; //via this id we get entire info of item qty in iteminfo
        orderItems.push(itemInfo) //adding all itemInfo in this arr

      }
    })
    // console.log(orderItems);
    let orderData={
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+20,
    }
    //try{
      const response= await axios.post(`${url}/api/order/place`, orderData,  {headers: {token}})
      if(response.data.success){
        const {session_url}= response.data;
        console.log(session_url);
        //sending user the sessionurl for payment redirect
        window.location.replace(session_url) //then go to STRIPE DUMMY CARD
      } else {
        toast.warning(`${response.data.message}`); 
      }

    // }catch(err){
    //   toast.error(`something went wrong!- ${err.message}`);
    // }
  }


  // useEffect(()=>{
  //   console.log(data);
  // }, [data])
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      toast.warning('Kindly Login before placing order!')
        navigate('/cart')
    } else if(getTotalCartAmount() === 0) //cart empty then
    {
      navigate('/cart');
    }
},[token])




  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <div className="title">Delivery Information</div>

        <div className="multi-fields">
          <input onChange={onChangeHandler}  value={data.firstName}
           type="text" name='firstName' placeholder='First Name' required/>
          <input onChange={onChangeHandler}  value={data.lastName}
           type="text" name='lastName' placeholder='Last Name' required/>
        </div>

        <input onChange={onChangeHandler}  value={data.email}
         type="email" name='email' placeholder='email' required/>
         <input onChange={onChangeHandler}  value={data.phone}
         type="tel" name='phone' placeholder='phone' required/>
        <label htmlFor="address">Address</label>
        <input onChange={onChangeHandler}  value={data.street}
         type="text" name='street' placeholder='Sector/Locality/Quarter/street' required/>

        <div className="multi-fields">
          <input onChange={onChangeHandler}  value={data.city}
           type="text"  name='city' placeholder='City' required/>
          <input onChange={onChangeHandler}  value={data.state}
           type="text" name='state' placeholder='State' required/>
        </div>

        <div className="multi-fields">
          <input onChange={onChangeHandler}  value={data.pincode}
           type="text" name='pincode' placeholder='Pin code' required/>
          <input onChange={onChangeHandler}  value={data.country}
           type="text" name='country' placeholder='Country' required/>
        </div>


      </div>
      <br />
      <hr />
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Your Order Details</h2>
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
          <button type='submit' >Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder