const express = require('express');
const router = express.Router();
const backendController = require('../controllers/backendController.js');
const formValidation = require('../middleware/formValidation.js');
const fileUpload = require('../middleware/fileUpload.js');
const multipleFileUpload = require('../middleware/multipleFileUpload.js');
const authenticateToken = require('../middleware/authenticateToken.js');


//----- Admin Routes Start -----//


//admin login
router.post('/admin/login', formValidation.login, backendController.login);

//category routes
router.get('/admin/category', authenticateToken, backendController.getCategory);
router.post('/admin/category-create', authenticateToken, formValidation.createCategory, backendController.createCategory);
router.get('/admin/category-edit/:id', authenticateToken, backendController.editCategory);
router.post('/admin/category-update', authenticateToken, formValidation.createCategory, backendController.updateCategory);
router.delete('/admin/category/:id', authenticateToken, backendController.deleteCategory);

//Banner routes
router.get('/admin/banner', authenticateToken, backendController.getBanner);
router.post('/admin/banner-create', authenticateToken, fileUpload.uploadFile, formValidation.createBanner, backendController.createBanner);
router.get('/admin/banner-edit/:id', authenticateToken, backendController.editBanner);
router.post('/admin/banner-update', authenticateToken, fileUpload.updateFile, backendController.updateBanner);
router.delete('/admin/banner/:id', authenticateToken, backendController.deleteBanner);

//Product routes
router.get('/admin/product', authenticateToken, backendController.getProduct);
router.post('/admin/product-create', authenticateToken, multipleFileUpload.uploadFiles, formValidation.createProduct, backendController.createProduct);
router.get('/admin/product-edit/:id', authenticateToken, backendController.editProduct)
router.post('/admin/product-update', authenticateToken, multipleFileUpload.updateFiles, backendController.updateProduct);
router.delete('/admin/product-image/:id', authenticateToken, backendController.deleteProductImage);
router.delete('/admin/product/:id', authenticateToken, backendController.deleteProduct);

//------ Admin Route End -----//


module.exports = router;