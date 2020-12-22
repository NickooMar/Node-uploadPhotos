const express = require('express');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename: (req, file, cb) =>{ 
        cb(null, path.extname(file.originalname).toLowerCase());
    
    }
});

// initializations
const app = express();

// settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(multer({
    limits: {fileSize: 2000000},
    storage,
    dest: path.join(__dirname, 'public/upload'),
    fileFilter: (req, file, cb) => {
        const filetypes =/jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    }
}).single('image'));

//Routes
app.use(require('./routes/index.routes'));

//Statics files
app.use(express.static(path.join(__dirname, 'public')))

//starting server
app.listen(app.get('port'),() => {
    console.log(`server on port ${app.get('port')}`)
})