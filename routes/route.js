const express = require('express');
const router = express.Router();
const backendController = require('../controllers/backendController.js');
const formValidation = require('../middleware/formValidation.js');
const fileUpload = require('../middleware/fileUpload.js');
const multipleFileUpload = require('../middleware/multipleFileUpload.js');


//----- Admin Routes Start -----//

//category routes
router.get('/admin/category', backendController.getCategory);
router.post('/admin/category-create', formValidation.createCategory, backendController.createCategory);
router.get('/admin/category-edit/:id', backendController.editCategory);
router.post('/admin/category-update', formValidation.createCategory, backendController.updateCategory);
router.delete('/admin/category/:id', backendController.deleteCategory);

//Banner routes
router.get('/admin/banner', backendController.getBanner);
router.post('/admin/banner-create', fileUpload.uploadFile, formValidation.createBanner, backendController.createBanner);
router.get('/admin/banner-edit/:id', backendController.editBanner);
router.post('/admin/banner-update', fileUpload.updateFile, backendController.updateBanner);
router.delete('/admin/banner/:id', backendController.deleteBanner);

//Product routes
router.get('/admin/product', backendController.getProduct);
router.post('/admin/product-create', multipleFileUpload.uploadFiles, formValidation.createProduct, backendController.createProduct);
router.get('/admin/product-edit/:id', backendController.editProduct)
router.post('/admin/product-update', multipleFileUpload.updateFiles, backendController.updateProduct);
router.delete('/admin/product-image/:id', backendController.deleteProductImage);
router.delete('/admin/product/:id', backendController.deleteProduct);

//------ Admin Route End -----//


module.exports = router;