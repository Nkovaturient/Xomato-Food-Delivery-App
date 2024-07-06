import React from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {assets} from '../../assets/assets.js'


const Orders = ({url}) => {
  let[orders, setOrders]=useState([]);
  const[status, setStatus]=useState('');

  
    const fetchAllOrders=async()=>{
      const response=await axios.get(`${url}/api/order/list`)
      if(response.data.success){
          console.log(response.data.data);
          setOrders(response.data.data);
          // toast.info('Fetched Saved Orders');
      } else {
          toast.error('No order history was found!')
      }
  }

  const handleStatus=async(event, orderId)=>{
    // setStatus(event.target.value);
    const response=await axios.post(`${url}/api/order/status`, {orderId, status: event.target.value})
    if(response.data.success){
        await fetchAllOrders();
        toast.success(`${response.data.message}`);
    } else {
        toast.error('Error}')
    }

  }

  useEffect(()=>{
    fetchAllOrders()
  }, [])

  
  return (
    <div className='order add'>
      <h3>Order Panel</h3>
      <div className="order-list">
        {
          orders.map((order, index)=>{
            return <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="order" />
              <div>
                <p className="order-item-food">
                  {
                    order.items.map((item, index)=>{
                      if(index === order.items.length - 1){
                        return item.name+" x "+item.quantity
                      } else{
                        return item.name+" x "+item.quantity+" , "
                      }
                    })
                  }
                </p>
                <p className="order-item-name">Ordered By: <b>{order.address.firstName+ " "+ order.address.lastName}</b></p>
                <div className="order-item-address">
                  <p>Address Details: {order.address.street+ ", "}</p>
                  <p>{order.address.city+ ", "+ order.address.state+", "+ order.address.country+", "+ order.address.pincode}</p>
                </div>
                <p className="order-item-phone">Contact: {order.address.phone}</p>
              </div>
              <p>Items Ordered: {order.items.length}</p>
              <p>Amount Paid: 💲{order.amount}</p>
              <select onChange={(event)=> handleStatus(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          })
        }
      </div>
    </div>
  )
}


export default Orders