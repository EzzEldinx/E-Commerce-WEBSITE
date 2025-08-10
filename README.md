## Run Locally

Clone the project

```bash
  git clone https://dredsoftlabs-admin@bitbucket.org/dredsoftlabs/ecommerce.git
```

Go to the project directory

```bash
  cd eCommerce
```

Install dependencies

```bash
  npm install

  or 

  npm install react-material-ui-carousel --save --legacy-peer-deps
```

Start the server

```bash
  npm start
```

The server should now be running. You can access the application by opening a web browser and entering the following URL:

```bash
  http://localhost:3000

## Basic Product API

We added a simple file-backed Product API using `api/data/products.json`.

- Tech stack: Node.js, Express
- How to run: `npm install` then `npm start` (backend on `http://localhost:4001`, frontend on `http://localhost:3000`)

### Endpoints
- GET `/products` — list products; supports `?category=Apparel`
- GET `/products/:id` — get product by id
- POST `/products` — create product (body: `title`, `description`, `price`, `imageUrl`, optional `category`)

### Sample requests
```bash
curl http://localhost:4001/products
curl "http://localhost:4001/products?category=Apparel"
curl http://localhost:4001/products/123245
curl -X POST http://localhost:4001/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Shirt",
    "description": "100% cotton",
    "price": 29.99,
    "imageUrl": "https://example.com/shirt.jpg",
    "category": "Apparel"
  }'
```

Note: This API is intentionally simple and persists to `api/data/products.json`.
```
