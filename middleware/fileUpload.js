const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});
const uploadFile = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if(err instanceof multer.MulterError){
            return res.status(500).json({
                status: false,
                error: err
            });
        }else if(err){
            return res.status(400).json({
                status: false,
                error: err
            });
        }
        if(!req.file){
            return res.status(400).json({
                status: false,
                error: 'Image filed reqired.'
            });
        }
        next();
    });
};


module.exports = {
    uploadFile
}