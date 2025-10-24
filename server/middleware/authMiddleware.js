import jwt from 'jsonwebtoken'
import User from '../models/User.js';
export const protect = async (req,res, next) => {
    let token;
    if(req.cookies.jwt){        
        try {
            token =req.cookies.jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user= await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(403).json({message:"Not authorized, token failed"})
        }
    }else{
        return res.status(403).json({message:"Not authorized, no token"})
    }
}