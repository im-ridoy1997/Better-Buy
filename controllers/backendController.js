const connection = require('../config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = (req, res) => {
    const { email, password } = req.body;

    connection.query(`SELECT * FROM tbl_admin WHERE email = '${email}'`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            });
        }else if(rows.length === 0){
            return res.status(200).json({
                status: true,
                error: "Email doesn't match."
            });
        }else{
            bcrypt.compare(password, rows[0].password, (error, isMatch) => {
                if(error){
                    return res.status(500).json({
                        status: false,
                        error: err.message
                    });
                }else if(!isMatch){
                    return res.status(401).json({
                        status: false,
                        error: "Password not valid."
                    });
                }
                const token = jwt.sign({ id: rows[0].id, name: rows[0].name, email: rows[0].email }, process.env.SECRET_KEY, { expiresIn: '100s' });
                return res.status(200).json({
                    status: true,
                    token: token,
                    admin: rows[0]
                });
            });
        }
    });
};

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

const getProduct = (req, res) => {
    connection.query(`SELECT * FROM tbl_product WHERE is_deleted = 0`, (err, rows) => {
        if(err) {
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

const createProduct = (req, res) => {
    const category_id = req.body.category_id;
    const brand_id = req.body.brand_id === "" ? 0 : req.body.brand_id
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const qty = req.body.qty;
    const images = req.files;
    connection.query(`INSERT INTO tbl_product (category_id, brand_id, name, description, price, qty) VALUES('${category_id}', '${brand_id}', '${name}', '${description}', '${price}', '${qty}')`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err
            });
        }else{
            const product_id = rows.insertId;
            images.forEach((image) => {
                const imageName = image.originalname;
                connection.query(`INSERT INTO tbl_product_image_gallery(product_id, image) VALUES('${product_id}', '${imageName}')`, (err, rows) => {
                    if(err){
                        return res.status(400).json({
                            status: false,
                            error: err.message
                        });
                    }
                })
            });
            return res.status(200).json({
                status: true,
                error: 'Product upload succesfully.'
            });
        }
    });
};

const editProduct = (req, res) => {
    const id = req.params.id;
    let product = null;
    let images = null;
    const baseUrl = req.protocol + '://' + req.hostname + '/uploads/';
    connection.query(`SELECT * FROM tbl_product WHERE id = '${id}'`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            });
        }else{
            product = rows[0];
            connection.query(`SELECT * FROM tbl_product_image_gallery WHERE product_id = '${id}'`, (errors, results) => {
                if(errors){
                    return res.status(400).json({
                        status: false,
                        error: errors.message
                    });
                }else{
                    images = results;
                    images.forEach((productImage) => {
                        productImage.image = baseUrl + productImage.image;
                    });
                    product.images = images;
                    return res.status(200).json({
                        status: true,
                        data: product
                    });
                }
            });
        }
    });
};

const updateProduct = (req, res) => {
    const id = req.body.id;
    const category_id = req.body.category_id;
    const brand_id = req.body.brand_id === "" ? 0 : req.body.brand_id
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const qty = req.body.qty;
    const images = req.files;
    connection.query(`UPDATE tbl_product SET category_id = '${category_id}', brand_id = '${brand_id}', name = '${name}', description = '${description}', price = '${price}', qty = '${qty}' WHERE id = '${id}'`, (err, rows) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: err.message
            });
        }else{
            images.forEach((image) => {
                const imageName = image.originalname;
                connection.query(`INSERT INTO tbl_product_image_gallery(product_id, image) VALUES('${id}', '${imageName}')`, (err, rows) => {
                    if(err){
                        return res.status(400).json({
                            status: false,
                            error: err.message
                        });
                    }
                })
            });
            return res.status(200).json({
                status: true,
                error: 'Product update succesfully.'
            });
        }
    });
};

const deleteProductImage = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM tbl_product_image_gallery where id = '${id}'`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(200).json({
                status: true,
                message: 'Product image delete successfully.'
            }); 
        }
    })
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM tbl_product where id = '${id}'`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                status: false,
                error: err.message
            }); 
        }else{
            return res.status(200).json({
                status: true,
                message: 'Product delete successfully.'
            }); 
        }
    })
};

module.exports = {
    login,
    getCategory,
    createCategory,
    editCategory,
    updateCategory,
    deleteCategory,
    getBanner,
    createBanner,
    editBanner,
    updateBanner,
    deleteBanner,
    getProduct,
    createProduct,
    editProduct,
    updateProduct,
    deleteProductImage,
    deleteProduct
};