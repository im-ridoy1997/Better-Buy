const express = require('express');
const router = express.Router();
const backendController = require('../controllers/backendController.js');
const formValidation = require('../middleware/formValidation.js');


//Admin Routes
router.get('/admin/category', backendController.getCategory);
router.post('/admin/category-create', formValidation.createCategory, backendController.createCategory);
router.get('/admin/category-edit/:id', backendController.editCategory);
router.post('/admin/category-update', formValidation.createCategory, backendController.updateCategory);
router.delete('/admin/category/:id', backendController.deleteCategory);


module.exports = router;