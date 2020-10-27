const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const postRouter = require('../routes/postRoutes');

//POST /slug/posts
//GET /slug/posts

router.use('/:category/posts', postRouter);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo,
    categoryController.createCategory
  )
  .get(categoryController.getAllCategories);

router.use(authController.protect, authController.restrictTo);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
