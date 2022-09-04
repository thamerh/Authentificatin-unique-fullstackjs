import express from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getStudent,getStudentById,updateStudent,deleteStudent,addStudent } from "../controllers/CRUD.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {addFile,getFiles,getOneFile,updateFile,upload,deleteFile,DownolodsFile} from "../controllers/UploadFile.js"
const router = express.Router();
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
//Application one : CRUD
router.post('/students', addStudent)
router.get('/students' , verifyToken,getStudent );
router.get('/students/:id', verifyToken,getStudentById);
router.patch('/students/:id', updateStudent);
router.delete('/students/:id',deleteStudent);
//Application tow : CRUD file
router.get('/DownolodsFile/:file', DownolodsFile);
router.post('/addFile',upload,addFile);
router.get('/files' , verifyToken, getFiles );
router.get('/files/:id', verifyToken,getOneFile);
router.put('/files/:id',upload, updateFile);
router.delete('/files/:id', deleteFile);


export default router;