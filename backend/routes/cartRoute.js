import express from 'express'
import { addtoCart, getUserCartData, removeFromCart } from '../controllers/cartController.js'
import authMiddleware from '../middlewares/auth.js'
const cartRouter=express.Router()

cartRouter.post('/add', authMiddleware, addtoCart)
cartRouter.post('/remove', authMiddleware, removeFromCart)
cartRouter.post('/get', authMiddleware, getUserCartData)

export default cartRouter;