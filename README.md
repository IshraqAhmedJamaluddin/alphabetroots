# Alphabetroots - Personalized Storybooks Website

A modern web application converted from Wix, built with PostgreSQL, Node.js/Express (TypeScript), and React (TypeScript).

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm run install:all
```

2. Set up the database:

   - Create a PostgreSQL database named `alphabetroots`
   - Copy the environment file and update with your database connection string:

```bash
cd backend
cp .env.example .env
# Edit .env and update DATABASE_URL with your connection string
```

3. Run database migrations:

```bash
cd backend
# Run the SQL migration file manually or use a migration tool
psql -d alphabetroots -f src/db/migrations/001_initial_schema.sql
```

4. Start the development servers:

```bash
# From root directory
npm run dev

# Or start separately:
npm run dev:backend  # Runs on http://localhost:3001
npm run dev:frontend  # Runs on http://localhost:3000
```

## Environment Variables

### Backend (.env)

```
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/alphabetroots
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRES_IN=7d
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3001/api
```

## Features

- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Gallery with image filtering
- ✅ Story collection
- ✅ Contact form
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart/:sessionId` - Add item to cart
- `PUT /api/cart/:sessionId/:itemId` - Update cart item
- `DELETE /api/cart/:sessionId/:itemId` - Remove cart item
- `GET /api/stories` - Get all stories
- `GET /api/gallery` - Get gallery images
- `POST /api/contact` - Submit contact form
- `POST /api/orders` - Create order

## Pages

- Home
- About
- Gallery
- Our Collection
- All Stories
- Product Page
- Cart
- Contact
- Thank You
- Preview
- Privacy Policy
- Terms and Conditions
- Shipping Policy
- Refund Policy
- Accessibility Statement

## Development

- Backend runs on port 3001
- Frontend runs on port 3000
- Vite proxy is configured to forward `/api` requests to the backend
