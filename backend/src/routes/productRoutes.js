const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productControllers')
const { protect, admin } = require('../middleware/auth')

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)

router.get('/categories', getCategories)

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

module.exports = router