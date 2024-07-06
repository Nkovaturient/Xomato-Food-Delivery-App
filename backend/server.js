import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app=express();
const PORT= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads')); /*preview the uplaoded img via this endpoint- GET req to localhost:4000/images/{filename}*/

app.get("/index", (req, res)=>{
    res.send(`Welcome to Food Delivery Web Home! Yea, beside yours, it got its home too.`);
});

// app.post('/api/test', async(req, res)=>{


//     const newUser= await userModel({
//         username: 'Vladimir',
//         email: 'vladimir123@gmail.com',
//         password: 'putin124',
//         cartData: { 1: 'cake', 2: 'noodles'}
//     })

//     await newUser.save()
//         .then((result)=>{
//             console.log('New user=', result);
//             const createToken=(id)=>{ //taking userId and gen jwtsecret
//                 return jwt.sign({id}, process.env.JWT_SECRET)
//             }

//             const token= createToken(result._id);
           
//             console.log(`gen token= ${token}`);
//             return res.status(200).json({ success : true, message: `Welcome to Tomato App! You have signed in successfully.`});
//         })
//         .catch((err)=>{
//             return res.json(`not registered==${err.message}`);
//         })
// })

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
    
})
