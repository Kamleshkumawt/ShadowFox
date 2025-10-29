# Backend — API & Routes

Quick reference for the backend API. Adjust paths and payloads to your implementation.

File Structure
```
├── db/
│   ├── db.js           # Database connection
│   └── cloudinary.js   # Cloudinary connection
├── middleware/
│   ├── auth.js         # Authentication middleware
│   ├── multer.js       # Multer middleware
│   ├── index.js        # export  middleware
│   └── error.js        # Error handling middleware
├── controllers/
│   ├── admin/        
│   │   ├── admin.js        # Admin function
│   │   ├── index.js        # Admin function
│   │   └── createAdmin.js  # Admin Auth function
│   ├── auth/        
│   │   ├── register.js     # register function
│   │   ├── index.js        # Export All function
│   │   ├── profile.js      # profile function
│   │   ├── logout.js       # logout function
│   │   └── login.js        # login Auth function
│   ├── products/        
│   │   ├── create.js  # create function
│   │   ├── get.js     # get function
│   │   ├── update.js  # update function
│   │   └── index.js   # export All function
│   └── index.js       # All function export
├── models/
│   ├── User.js        # User model schema
│   ├── Product.js     # Product model schema
│   ├── Order.js       # Order model schema
│   └── Cart.js        # Cart model schema
├── routes/
│   ├── auth.js        # Auth routes
│   ├── products.js    # Product routes
│   ├── users.js       # User routes
│   ├── index.js       # Export routes
│   ├── admin.js       # Admin routes
│   └── seller.js      # seller routes
├── utils/
│   └── helpers.js     # Helper functions
├── .env               # Environment variables
├── package.json       # Dependencies
└── server.js          # Entry point
```

Environment
  - GET /api/products
    - Query: ?page=&limit=&category=&search=&sort=
    - Response: 200 { products: [...], page, totalPages }
  - GET /api/products/:id
    - Response: 200 { product }
  - POST /api/products (admin)
    - Body: { title, price, description, images, stock, category }
    - Response: 201 { product }
  - PUT /api/products/:id (admin)
  - DELETE /api/products/:id (admin)

- Auth / Users
  - POST /api/auth/register
    - Body: { name, email, password }
    - Response: 201 { user, token }
  - POST /api/auth/login
    - Body: { email, password }
    - Response: 200 { user, token }
  - GET /api/users/:id (auth)
    - Response: 200 { user }
  - PUT /api/users/:id (auth)
    - Body: { name, email, password? }

- Cart (if server-side)
  - GET /api/cart (auth)
  - POST /api/cart (auth) — add item { productId, qty }
  - PUT /api/cart/:itemId (auth) — update qty
  - DELETE /api/cart/:itemId (auth)

- Orders
  - POST /api/orders (auth)
    - Body: { items, shippingAddress, paymentMethod, totals }
    - Response: 201 { order }
  - GET /api/orders/:id (auth, owner or admin)
  - GET /api/orders (admin) — list all orders

Request/response examples
- Login request
  - POST /api/auth/login
  - Body: { "email":"user@example.com", "password":"secret" }
- Login response
  - 200
  - { "user": { "id":"...", "name":"..." }, "token": "jwt.token.here" }

Error handling
- Use consistent error format:
  - 400 Bad Request { error: "Validation message" }
  - 401 Unauthorized { error: "Auth required" }
  - 403 Forbidden { error: "Admin only" }
  - 404 Not Found { error: "Resource not found" }
  - 500 Server Error { error: "Internal error" }

Notes and recommendations
- Validate inputs on backend; sanitize before DB writes.
- Use pagination for lists (products, orders, users).
- Secure JWT secrets and don't expose them in client code.
- Add rate-limiting and input sanitization for public endpoints where needed.
- Keep API docs in sync with actual route implementations (consider OpenAPI / Swagger for larger projects).
