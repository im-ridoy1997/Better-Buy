const connection = require('../config.js');


const getCategory = (req, res) => {
    connection.query(`SELECT * FROM tbl_category WHERE is_deleted = 0`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            });
        }else{
            return res.status(200).json({
                status: true,
                data: rows
            });
        }
    });
    
};

const createCategory = (req, res) => {
    const parent_id = req.body.parent_id === "" ? null : req.body.parent_id;
    const category_name = req.body.category_name;
    if(parent_id === null) {
        connection.query(`INSERT INTO tbl_category (category_name) VALUES('${category_name}') `, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true,
                    data: rows.insertId
                });
            }
        });
    }else{
        connection.query(`INSERT INTO tbl_category (parent_id, category_name) VALUES('${parent_id}', '${category_name}') `, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true,
                    data: rows.insertId
                });
            }
        });
    }
};

const editCategory = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM tbl_category WHERE id = '${id}'`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(400).json({
                status: true,
                data: rows[0]
            }); 
        }
    });
    
};

const updateCategory = (req, res) => {
    const parent_id = req.body.parent_id === "" ? null : req.body.parent_id;
    const id = req.body.id;
    const category_name = req.body.category_name;
    if(parent_id === null) {
        connection.query(`UPDATE tbl_category SET category_name = '${category_name}' WHERE id = '${id}'`, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true
                });
            }
        });
    }else{
        connection.query(`UPDATE tbl_category SET parent_id = '${parent_id}', category_name = '${category_name}' WHERE id = '${id}'`, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true
                });
            }
        });
    }
    
};

const deleteCategory = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM tbl_category where id = '${id}'`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(200).json({
                status: true,
                message: 'Category delete successfully.'
            }); 
        }
    })
};

const getBanner = (req, res) => {
    connection.query(`SELECT * FROM tbl_banner WHERE is_deleted = 0`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            });
        }else{
            return res.status(200).json({
                status: true,
                data: rows
            });
        }
    });
    
};

const createBanner = (req, res) => {
    const { name, description } = req.body;
    const image = req.file.originalname;
    connection.query(`INSERT INTO tbl_banner (name, description, image) VALUES('${name}', '${description}', '${image}')`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(200).json({
                status: true,
                data: rows.insertId
            });
        }
    });
};

const editBanner = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM tbl_banner WHERE id = '${id}'`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(400).json({
                status: true,
                data: rows[0]
            }); 
        }
    });
    
};

const updateBanner = (req, res) => {
    const { id, name, description } = req.body;
    if(req.file != null) {
        const image = req.file.originalname;
        connection.query(`UPDATE tbl_banner SET name = '${name}', description = '${description}', image = '${image}' WHERE id = '${id}'`, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true
                });
            }
        });
    }else{
        connection.query(`UPDATE tbl_banner SET name = '${name}', description = '${description}' WHERE id = '${id}'`, (err, rows) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    error: err.message
                }); 
            }else{
                return res.status(200).json({
                    status: true
                });
            }
        });
    }
    
};

const deleteBanner = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM tbl_banner where id = '${id}'`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(200).json({
                status: true,
                message: 'Banner delete successfully.'
            }); 
        }
    })
};

module.exports = {
    getCategory,
    createCategory,
    editCategory,
    updateCategory,
    deleteCategory,
    getBanner,
    createBanner,
    editBanner,
    updateBanner,
    deleteBanner
};