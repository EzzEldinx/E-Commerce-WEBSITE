const express = require('express');
const { listProducts, getProductById, createProduct } = require('../controllers/productsFileController');

const router = express.Router();

router.get('/products', listProducts);
router.get('/products/:id', getProductById);
router.post('/products', express.json(), createProduct);

module.exports = router;


