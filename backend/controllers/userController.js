import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import { signupValidation } from '../middlewares/validation.js';

const createToken=(id)=>{ //taking userId and gen jwtsecret
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//login user
const loginUser= async(req, res)=>{
    try{
        const {email, password}=req.body;
        const user=await userModel.findOne({ email : email})

        if(!user){
            return res.json({success: false, message: `User doesnt exist!`})
        }

        const verifyPass= await bcrypt.compare(password, user.password);
        if(!verifyPass){
            return res.json({success: false, message: 'Wrong password!'})
        }

        const token= createToken(user._id);
        res.json({success: true, token})



    } catch(err){
        return res.status(400).json({ success: false, message: `${err.message}`});
    }
}


//register user
const registerUser= async(req, res)=>{
    try{

    const { error}= signupValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    const { username, email, password }=req.body;
        const user=await userModel.findOne({email : email})
        if(user){ //if user already exists
            return res.json({ success: false, message: `User with this emailID already exists. Try Login`});
        }


        //hashing user password
        const salt=await bcrypt.genSalt(10); 
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser= new userModel({
            username: username,
            email: email,
            password: hashedPassword,
            
        });

        const registerUser=await newUser.save();
        // console.log('New user=', registerUser);
        const token= createToken(registerUser._id);
        // console.log(`gen token= ${token}`);
        return res.json({success: true, token})

    } catch(err){
        return res.status(400).json({ success: false, message: `${err.message}`});
    }
}

export { loginUser, registerUser}