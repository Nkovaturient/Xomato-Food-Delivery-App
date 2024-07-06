import foodModel from "../models/foodModel.js";
import fs from 'fs' //Nodejs-inbuilt filesystem

//add food item
const addFood=async(req, res)=>{
    let image_filename= `${req.file.filename}`;
    const food= new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        
    });

   try{
    const foodInfo= await food.save();
    console.log(foodInfo);
    return res.status(200).json({success: true, message: 'Food Item was Added!'});

   } catch(err){
    console.log(err.message);
    return res.status(401).json({success: false, message: `${err.message}`});
   }
};

// FETCH entire food items
const getFoodAll=async(req, res)=>{
    try{
        const foodList= await foodModel.find({});

    return res.status(200).json({success: true, data: foodList});

    } catch(err){
        console.log(err.message);
    return res.status(401).json({success: false, message: `${err.message}`});
    }
}

//remove food item
const removeFood=async(req, res)=>{
    try{
        // let {id}= {...req.body.id}; //enter id in json { "id": "id"}in thundercLIENT || req.params
        const foodItem= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`, ()=>{}) //alongside deleting the linked img from uploads dir
        await foodModel.findByIdAndDelete(req.body.id);

    return res.status(200).json({success: true, message: 'Deleted Food Item'});

    } catch(err){
        console.log(err.message);
    return res.status(400).json({success: false, message: `${err.message}`});
    }

}

export { addFood, getFoodAll, removeFood};

