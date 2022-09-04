import File from '../models/FileModel.js';
// image Upload
import multer  from 'multer';
import path from 'path';
// 1. create affiche

export const addFile = async (req, res) => {
   
    try {
        let info = {
            image: req.file.path,
            title: req.body.title,
            description: req.body.description
        }
    
        const file = await File.create(info);
        res.status(200).send(file);
        console.log(file);
    
    } catch (error){
        console.log(error);
        return res.status(404).json({msg: "problem"});

    } 
}



// 2. get all files
export const getFiles = async ( req, res) => {

    let file = await File.findAll({})
    res.status(200).send(file)
    console.log(file)
}

// 3. get single file

export const getOneFile = async (req, res) => {

    let id = req.params.id
    let file = await File.findOne({ where: { id: id }})
    res.status(200).send(file)

}

// 4. update files

export const updateFile = async (req, res) => {

    let id = req.params.id
    
        let info = {    
             title: req.body.title,
             description: req.body.description
         }
    const file = await File.update(info, { where: { id: id }})

    res.status(200).send(file)
   

}

// 5. delete file by id

export const deleteFile = async (req, res) => {

    let id = req.params.id
    
    await File.destroy({ where: { id: id }} )

    res.status(200).send('File is deleted !')

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if( mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image');

//7 .Downolods file
export const DownolodsFile = async (req, res)=>{
    let file = req.params.file
    let imgFolder ="Images/"
    res.download(imgFolder.concat(file));
    
}