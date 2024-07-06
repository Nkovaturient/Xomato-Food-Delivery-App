import mongoose from "mongoose";

const dbURL='mongodb+srv://nk8981398:Xg1QvC1JpIrEP6a34q@xomato.closxby.mongodb.net/?retryWrites=true&w=majority&appName=Xomato';

connectDB()
.then(()=>{
    console.log(`Pinged to DB! Connected Successfully!`);
})
.catch((err)=>{
    console.log(`Database Error- ${err.message}! Restart`);
});

 
export default async function connectDB(){
    await mongoose.connect(dbURL);
}