import userModel from "../models/userModel.js";

//add items to user cart
const addtoCart= async(req, res)=>{
    try{
        const user=await userModel.findOne({ _id: req.body.userId  });//after authMw-acessing user from req.body.userId
        let cartData= await user.cartData;
        if(!cartData[req.body.itemId]){ //if 1st time item entry,adding else increasing that item if clicked 2wice
            cartData[req.body.itemId]= 1
        }
        else {
            cartData[req.body.itemId] += 1
        }

       const addItems= await userModel.findByIdAndUpdate(req.body.userId, { cartData})
       return res.json({success: true, message: `Added items to Cart`});

    } catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

//remove items from cart
const removeFromCart=async(req, res)=>{
    try{
        const user=await userModel.findOne({ _id: req.body.userId  });//after authMw-acessing user from req.body.userId
        let cartData= await user.cartData;
        if(cartData[req.body.itemId]>0){ //if no item entry in cartData, removing
            cartData[req.body.itemId] -= 1
        }
        
        const removeItems= await userModel.findByIdAndUpdate(req.body.userId, { cartData});
       return res.json({success: true, message: `Removed items from Cart`});

    } catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

//fetch user cartData
const getUserCartData=async(req, res)=>{
    try{
        const user=await userModel.findOne({ _id: req.body.userId  });
        let cartData= await user.cartData;
        res.json({success: true, cartData});

    } catch(err){
        return res.json({success: false, message: `${err.message}`});
    }

}

export {addtoCart, removeFromCart, getUserCartData}

