# Frontend — Pages & Components

This document provides a comprehensive overview of the pages and components that your React frontend should implement. Each section includes the route, purpose, expected data, and behavior of the respective page.

## Overview
A simple map of pages your React frontend should implement, with route, purpose, expected data, and behavior.

### Home
- **Path:** /
- **Purpose:** Landing page showcasing featured products, promotions, and categories.
- **Data:** Featured products list, promotional banners.
- **Behavior:** Links to product list and individual product pages.

### Products / Catalog
- **Path:** /products or /category/:slug
- **Purpose:** Display a list of products with filtering options (category, price, sort).
- **Data:** Array of products, pagination information, available filters.
- **Behavior:** Fetch products via GET /api/products with query parameters; clicking on an item navigates to the product detail page.

### Product Detail
- **Path:** /product/:id
- **Purpose:** Show detailed information about a specific product, including images, price, stock availability, and reviews.
- **Data:** Product object, related products.
- **Behavior:** Options to add the product to the cart, select quantity, and view reviews.

### Cart
- **Path:** /cart
- **Purpose:** Display items currently in the cart, allowing users to adjust quantities, remove items, and proceed to checkout.
- **Data:** List of cart items, total price.
- **Behavior:** Manage client-side state or persist data server-side for logged-in users.

### Checkout
- **Path:** /checkout
- **Purpose:** Collect shipping and payment details, review the order, and submit it.
- **Data:** Cart contents, shipping options, payment form details.
- **Behavior:** POST request to /api/orders (authentication required) followed by a redirect to the order confirmation page.

### Order Confirmation
- **Path:** /order/:id/confirmation or /order/confirmation
- **Purpose:** Display a summary of the order and tracking information.
- **Data:** Order object.
- **Behavior:** Show order status and email confirmation details.

### Authentication
- **Login**
  - **Path:** /login
  - **Purpose:** Authenticate users.
  - **Behavior:** POST request to /api/auth/login, which returns a token/session.
  
- **Register**
  - **Path:** /register
  - **Purpose:** Create a new user account.
  - **Behavior:** POST request to /api/auth/register.

### User Profile / Orders
- **Path:** /profile
- **Purpose:** View and update user information and list past orders.
- **Data:** User object, array of past orders.
- **Behavior:** GET request to /api/users/:id (authentication required), PUT request to update user information.

### Admin Dashboard (if present)
- **Path:** /admin or /admin/dashboard
- **Purpose:** Manage products, orders, and users.
- **Behavior:** Protected routes that require authentication, manage resources via REST endpoints (create/update/delete).

### Static / Info Pages
- **About:** /about
- **Contact:** /contact
- **Policy/Terms:** /terms, /privacy

### Error / Fallback
- **404 Page:** Displayed for unknown routes.
- **Purpose:** Guide users back to the home page or provide a search option.

## Notes and Best Practices
- Utilize client-side routing (React Router) with server-side fallback to index.html for non-API routes.
- Centralize data fetching using hooks or services that call the backend API endpoints outlined in backend.md.
- Protect private routes by verifying authentication tokens/state and redirecting to /login when necessary.
- Ensure accessibility and responsiveness across all pages for an optimal user experience.
 Frontend — Pages & Components

Overview: simple map of pages your React frontend should implement, with route, purpose, expected data, and behaviour.

- Home
  - Path: /
  - Purpose: Landing page with featured products, promos, categories.
  - Data: featured products list, banners.
  - Behaviour: link to product list and product pages.

- Products / Catalog
  - Path: /products or /category/:slug
  - Purpose: list products with filters (category, price, sort).
  - Data: products[], pagination info, filters.
  - Behaviour: fetch GET /api/products with query params; clicking item → product detail.

- Product Detail
  - Path: /product/:id
  - Purpose: show product details, images, price, stock, reviews.
  - Data: product object, related products.
  - Behaviour: add to cart, select quantity, view reviews.

- Cart
  - Path: /cart
  - Purpose: list items in cart, adjust quantity, remove items, proceed to checkout.
  - Data: cart items, totals.
  - Behaviour: client-side state (or persisted server-side for logged users).

- Checkout
  - Path: /checkout
  - Purpose: collect shipping/payment details, review order, submit.
  - Data: cart, shipping options, payment form.
  - Behaviour: POST /api/orders (auth required) then redirect to order confirmation.

- Order Confirmation
  - Path: /order/:id/confirmation or /order/confirmation
  - Purpose: show order summary and tracking info.
  - Data: order object.
  - Behaviour: display status and email confirmation info.

- Authentication
  - Login
    - Path: /login
    - Purpose: authenticate users.
    - Behaviour: POST /api/auth/login → receives token/session.
  - Register
    - Path: /register
    - Purpose: create new user account.
    - Behaviour: POST /api/auth/register.

- User Profile / Orders
  - Path: /profile
  - Purpose: view/update user info and list past orders.
  - Data: user object, orders[].
  - Behaviour: GET /api/users/:id (auth required), PUT to update.

- Admin Dashboard (if present)
  - Path: /admin or /admin/dashboard
  - Purpose: product management, orders, users.
  - Behaviour: protected routes, manage via REST endpoints (create/update/delete).

- Static / Info
  - About: /about
  - Contact: /contact
  - Policy/Terms: /terms, /privacy

- Error / Fallback
  - 404 Page: shown for unknown routes.
  - Purpose: guide user back to home/search.

Notes and best practices:
- Use client-side routing (React Router) with server fallback to index.html for non-API routes.
- Keep data fetching centralized (hooks or services) calling backend API endpoints described in backend.md.
- Protect private routes by checking auth token/state and redirecting to /login when necessary.
