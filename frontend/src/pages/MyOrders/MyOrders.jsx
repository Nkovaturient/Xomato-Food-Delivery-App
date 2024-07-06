import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { storeContext } from '../../context/storeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {assets} from '../../assets/assets.js'

const MyOrders = () => {
    let[orders, setOrders]=useState([]);
    const{url, token}=useContext(storeContext);

    const fetchOrders=async()=>{
        const response=await axios.post(`${url}/api/order/userorders`,{}, {headers: {token}})
        if(response.data.success){
            // console.log(response.data.data);
            setOrders(response.data.data);
            toast.info('Your Saved Orders');
        } else {
            toast.error('No order history was found!')
        }
    }

    
    useEffect(()=>{
        if(token){
            fetchOrders()
        }
        
    },[token]) // will update depending on everytime token gen

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                orders.length && orders.map((order, index)=>{
                    
                    return  <div className="my-orders-order" key={index}>
                            <img src={assets.parcel_icon} alt="parcel" />
                            <p>Your Order: {order.items.map((item, index)=>{
                                if(index === order.items.length - 1){ //acess last item of foodItems
                                    return item.name+" x "+item.quantity
                                } else {
                                    return item.name +" x "+item.quantity+" , "
                                }
                            })}</p>
                            <p>Total Amount Paid: 💲{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>Status: <span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>

                    
                })
            }
        </div>
    </div>
  )
}

export default MyOrders