import express from "express";

import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router =express.Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getUserProfile)
router.post('/logout', logoutUser)
router.put('/me',protect, updateUserProfile)
export default router