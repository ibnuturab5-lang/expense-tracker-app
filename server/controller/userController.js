import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
const generateToken =(res, id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'});
    res.cookie('jwt', token,{
        httpOnly:true,
        sameSite:'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return token;
}
//register user
export const registerUser = async (req,res) => {
    const {fullName, email, password} =req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'user already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({fullName,email, password:hashedPassword});
        if(user){
            generateToken(res, user._id)
            return res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email
            })
        }else{
            return res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"server error", error:error.message})
    }
}
//login user
export const loginUser = async (req,res) => {
    const { email, password} =req.body;
    try {
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))){
           generateToken(res, user._id)
            return res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email
            })
        }else{
            return res.status(402).json({message:"Invalid email or password"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"server error", error:error.message})
    }
}

//logout user
export const logoutUser = async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.json({message:"user logged out successfully!"})
}
//get user info
export const getUserProfile =async (req,res) => {
    try {
        const user =await User.findById(req.user._id).select('-password')
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else{
            return res.status(200).json(user)
        }
    } catch (error) {
         console.log(error.message)
        res.status(500).json({message:"server error", error:error.message})
    }
}
//get user info
export const updateUserProfile =async (req,res) => {
    const {fullName, email,password} =req.body;
    try {
        const user =await User.findById(req.user._id).select('-password')
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else{
            user.fullName= fullName || user.fullName;
            user.email= email || user.email;
            if(password){
                user.password = await bcrypt.hash(password, 10);
            }
            const updatedUser = await user.save()
            return res.status(201).json({
                _id:updatedUser._id,
                fullName:updatedUser.fullName,
                email:updatedUser.email
            })
        }
    } catch (error) {
         console.log(error.message)
        res.status(500).json({message:"server error", error:error.message})
    }
}