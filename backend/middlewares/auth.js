import jwt from 'jsonwebtoken'

const authMiddleware= async(req, res, next)=>{
    const {token}= req.headers;
    if(!token){
        return res.json({success: false, message:'Unauthorized! Kindly Login to proceed.'})
    }

    try{
        const verifyToken= jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId= verifyToken.id; //match token with the registered id and store it in userId obj
        next();

    } catch(err){
        return res.json({success: false, message: `${err.message}`});
    }
}

export default authMiddleware