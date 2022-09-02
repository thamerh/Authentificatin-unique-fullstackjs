import express from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;