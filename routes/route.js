const express = require('express');
const router = express.Router();
const backendController = require('../controllers/backendController.js');
const formValidation = require('../middleware/formValidation.js');
const fileUpload = require('../middleware/fileUpload.js');


//Admin Routes

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


module.exports = router;