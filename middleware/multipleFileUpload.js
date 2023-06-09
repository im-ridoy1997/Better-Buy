const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});

//----- Product images upload -----//
const uploadFiles = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
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
        if(req.files.length === 0){
            return res.status(400).json({
                status: false,
                error: 'Image filed reqired.'
            });
        }
        next();
    });
};

//----- Product images update -----//
const updateFiles = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
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
        next();
    })
};

module.exports = {
    uploadFiles,
    updateFiles
};