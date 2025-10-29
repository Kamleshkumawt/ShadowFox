# ApanaStore - E-commerce Web Application

Welcome to ApanaStore, a modern e-commerce platform built with React and Vite.

## Overview

ApanaStore provides a seamless shopping experience with the following features:

- User authentication
- Product catalog
- Shopping cart
- Secure checkout
- Order tracking

## Technology Stack

- React 18
- Vite
- ESLint
- Modern CSS
- RESTful API integration

## Getting Started (Frontend & Backend)

### Frontend (client)
1. Open a terminal and navigate to the frontend folder:
    - cd frontend
2. Install dependencies:
    - npm install
3. Create environment file and set API URL:
    - cp .env.example .env
    - Set VITE_API_URL to your backend URL (for example http://localhost:5000)
4. Start development server:
    - npm run dev
    - App runs by default at http://localhost:5173
5. Build for production:
    - npm run build
    - Serve preview: npm run preview

### Backend (server)
1. Open a terminal and navigate to the backend folder:
    - cd backend
2. Install dependencies:
    - npm install
3. Create environment file and configure:
    - cp .env.example .env
    - Set required variables (e.g., PORT, DATABASE_URL, JWT_SECRET, etc.)
4. Prepare the database (if applicable):
    - Run migrations/seeds (script names may vary):
      - npm run migrate
      - npm run seed
    - For Prisma: npx prisma migrate deploy
5. Start development server:
    - npm run dev
    - Default server URL: http://localhost:3000
6. Start production server:
    - npm run start

### Notes & Troubleshooting
- Ensure frontend VITE_API_URL matches backend URL and port.
- If CORS errors occur, enable CORS in backend configuration.
- Check .env.example for required variables and example values.
- Ports can be changed in .env; update both frontend and backend accordingly.
- For containerized setups, refer to docker-compose or deployment docs if present.
## Getting Started

1. Clone the repository
2. Run `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:5173`

## Development Guidelines

Please follow our coding standards and submit PRs for review.

## License

MIT License - Feel free to use and modify