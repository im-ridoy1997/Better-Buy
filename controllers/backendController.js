const connection = require('../config.js');


const getCategory = (req, res, next) => {
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
        next();
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

module.exports = {
    getCategory,
    createCategory
};