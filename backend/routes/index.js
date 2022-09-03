import express from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getStudent,getStudentById,updateStudent,deleteStudent,addStudent } from "../controllers/CRUD.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/students', addStudent)
router.get('/students' , verifyToken,getStudent );
router.get('/students/:id', verifyToken,getStudentById);
router.patch('/students/:id', updateStudent);
router.delete('/students/:id',deleteStudent);

export default router;