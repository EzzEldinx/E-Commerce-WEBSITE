const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

function readProductsFromFile() {
  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeProductsToFile(products) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf-8');
}

// GET /products
exports.listProducts = (req, res) => {
  const products = readProductsFromFile();

  const { category } = req.query;
  const result = category
    ? products.filter((p) =>
        (p.category || '').toLowerCase() === String(category).toLowerCase()
      )
    : products;

  res.status(200).json({ success: true, products: result });
};

// GET /products/:id
exports.getProductById = (req, res) => {
  const products = readProductsFromFile();
  const product = products.find((p) => String(p.id) === String(req.params.id));

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, product });
};

// POST /products
exports.createProduct = (req, res) => {
  const { title, description, price, imageUrl, category } = req.body || {};

  const errors = [];
  if (!title || typeof title !== 'string') errors.push('title is required');
  if (!description || typeof description !== 'string') errors.push('description is required');
  if (price === undefined || price === null || isNaN(Number(price))) errors.push('price must be a number');
  if (!imageUrl || typeof imageUrl !== 'string') errors.push('imageUrl is required');
  if (category !== undefined && typeof category !== 'string') errors.push('category must be a string');

  if (errors.length) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const products = readProductsFromFile();
  const newProduct = {
    id: Date.now().toString(),
    title,
    description,
    price: String(price),
    imageUrl,
    category: category || null,
  };

  products.push(newProduct);
  writeProductsToFile(products);

  res.status(201).json({ success: true, product: newProduct });
};


