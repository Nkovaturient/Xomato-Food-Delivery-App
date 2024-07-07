import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import  { Stripe } from 'stripe';

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder=async(req, res)=>{

    const frontend_URL=`https://xomato-1x12.onrender.com`; //http://localhost:5173

    try{
        const newOrder= new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData : {}}) //empty the cartData

        const line_items=req.body.items.map((item)=> ({ //accesing user cartitems obj for stripe payment
            price_data:{
                currency: 'INR',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*84   //dollar to inr        
             },
             quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 20*100*84 //delivery charge+20
            },
            quantity: 1,
        })

        const session= await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success: true, session_url: session.url})
       

    }catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

const verifyOrder=async(req, res)=>{
    const {orderId, success}=req.body;
    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, { payment: true, });
            res.json({success: true, message: `Payment successful. Your order has been placed.`});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message:`Payment failed! Order was not placed`})
        }

    }catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

//user ordersHistory
const userOrders= async(req, res)=>{
    try{
        const orders=await orderModel.find({userId: req.body.userId})
        return res.json({success: true, data: orders})

    }catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

//fetch all orders on admin panel
const listOrders=async(req, res)=>{
    try{
        const orders=await orderModel.find({})
        return res.json({success: true, data: orders})

    }catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

//update order status
const updateStatus=async(req, res)=>{
    try{
        const orderStatus=await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status })
        return res.json({success: true, message: 'Order Status updated successfully'});

    }catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
