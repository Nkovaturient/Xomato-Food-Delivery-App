import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter=express.Router()

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;