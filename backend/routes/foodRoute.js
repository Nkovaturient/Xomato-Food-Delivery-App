import express from 'express';
import { addFood, getFoodAll, removeFood } from "../controllers/foodController.js";
import multer from 'multer';

const foodRouter=express.Router()

//image storage engine
const storage=multer.diskStorage({
    destination: 'uploads', 
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`) //timestamps willbe added to filename
    }
})

const upload= multer({ storage: storage})

foodRouter.route('/add')
.post( upload.single('image'), addFood);

foodRouter.route('/list')
.get(getFoodAll);

foodRouter.route('/delete')
.post(removeFood);


export default foodRouter;