import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    },
    

}, {minimize: false});

const userModel= mongoose.models.user || mongoose.model("User", userSchema); //if existing model else create anew
export default userModel;