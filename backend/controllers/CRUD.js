import Students from "../models/StudentModel.js";

export const addStudent = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        await Students.create({
            name: name,
            email: email,
            password: password
        });
        res.json({msg: "student adding seccessfly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "student alredy exist"});
    }
}

export const getStudent = async(req, res) =>{
    try {
        const response = await Students.findAll({});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getStudentById = async(req, res) =>{
    try {
        const response = await Students.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const updateStudent = async(req, res) =>{
    const {cin,name,email,password} = req.body;
    try {
        await Students.update({cin,name,email,password},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Updated"});
    } catch (error) {
        console.log(error.message);
    }
}


export const deleteStudent = async(req, res) =>{
    try {
        await Students.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
