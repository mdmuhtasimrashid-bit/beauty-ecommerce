# 🌸 Glowiva - Beauty & Skincare E-Commerce Platform

<div align="center">

![Glowiva Logo](https://img.shields.io/badge/Glowiva-E91E63?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiAxMkwxMiAyMkwyMiAxMkwxMiAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+)

**A modern, full-stack e-commerce platform for beauty and skincare products**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat)](./LICENSE)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 🚀 Quick Start (Development)

```bash
# Windows
start-dev.bat

# Linux/Mac
chmod +x start-dev.sh
./start-dev.sh
```

This will start both backend (port 5000) and frontend (port 3000) servers.

**📖 For deployment instructions, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Glowiva** is a comprehensive e-commerce platform specifically designed for beauty, skincare, haircare, and personal care products. Built with the MERN stack, it offers a seamless shopping experience with modern UI/UX inspired by leading beauty e-commerce sites.

### Key Highlights

- ✨ **Modern Design** - Clean, responsive UI with pink/purple gradient theme
- 🔒 **Secure** - JWT authentication with encrypted passwords
- 🛒 **Full E-commerce** - Complete shopping cart, checkout, and order management
- 👨‍💼 **Admin Panel** - Comprehensive dashboard for business management
- 📱 **Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast** - Optimized performance with lazy loading and caching

---

## ✨ Features

### 🛍️ Customer Features

<details>
<summary><b>Authentication & User Management</b></summary>

- User registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Profile management
- Password update & recovery
- Wishlist functionality
- Order history tracking

</details>

<details>
<summary><b>Product Browsing & Discovery</b></summary>

- Homepage with featured products
- Category-based filtering
- Brand showcase
- Advanced search functionality
- Product comparison (up to 4 items)
- Sort by price, rating, newest
- Product ratings and reviews
- "Shop by Skin Type" feature

</details>

<details>
<summary><b>Shopping Experience</b></summary>

- Add to cart with quantity management
- Persistent cart (localStorage)
- Cart total calculation
- Apply coupon codes
- Secure checkout process
- Multiple payment options (Cash on Delivery)
- Order confirmation
- Order tracking and cancellation

</details>

### 👨‍💼 Admin Features

<details>
<summary><b>Complete Management Dashboard</b></summary>

- **Dashboard**: Analytics, revenue charts, order statistics
- **Products**: CRUD operations, image upload, stock management
- **Orders**: View, update status, mark as delivered
- **Users**: User management, role assignment
- **Categories**: Category hierarchy management
- **Brands**: Brand management with logos
- **Coupons**: Discount codes with expiry dates
- **Reviews**: Moderation and approval system

</details>

---

## 🛠️ Tech Stack

### Frontend
```
React.js 18          - UI Framework
React Router v6      - Client-side routing
Tailwind CSS         - Utility-first CSS
Axios                - HTTP client
Context API          - State management
React Slick          - Carousel/Slider
React Icons          - Icon library
React Toastify       - Toast notifications
```

### Backend
```
Node.js              - Runtime environment
Express.js           - Web framework
MongoDB              - NoSQL database
Mongoose             - ODM for MongoDB
JWT                  - Authentication
Bcrypt.js            - Password hashing
Express Validator    - Input validation
Multer               - File uploads
Nodemailer           - Email service
```

### Development Tools
```
Nodemon              - Auto-restart server
ESLint               - Code linting
Prettier             - Code formatting
```

### Deployment
```
Vercel               - Frontend hosting
Render               - Backend hosting
MongoDB Atlas        - Database hosting
```

---

## 📁 Project Structure

```
Glowiva/
│
├── 📂 backend/                    # Node.js Backend
│   ├── 📂 config/
│   │   └── db.js                 # MongoDB connection
│   ├── 📂 controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── categoryController.js
│   │   ├── brandController.js
│   │   ├── couponController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── 📂 middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   ├── 📂 models/               # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Brand.js
│   │   ├── Order.js
│   │   ├── Coupon.js
│   │   └── Review.js
│   ├── 📂 routes/               # API endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── brandRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Entry point
│
├── 📂 frontend/                  # React Frontend
│   ├── 📂 public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable components
│   │   │   ├── 📂 layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   ├── CategoryGrid.js
│   │   │   ├── BrandSlider.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── AdminRoute.js
│   │   │   └── ScrollToTop.js
│   │   ├── 📂 context/         # State management
│   │   │   ├── AuthContext.js
│   │   │   ├── CartContext.js
│   │   │   └── CompareContext.js
│   │   ├── 📂 pages/           # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   └── 📂 admin/
│   │   │       ├── AdminDashboard.js
│   │   │       ├── AdminProducts.js
│   │   │       ├── AdminOrders.js
│   │   │       └── ...
│   │   ├── 📂 utils/
│   │   │   └── api.js          # Axios config
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── 📄 API_DOCUMENTATION.md       # API reference
├── 📄 DEPLOYMENT.md             # Deployment guide
├── 📄 SETUP.md                  # Setup instructions
├── 📄 QUICKSTART.md             # Quick start guide
├── 📄 PROJECT_SUMMARY.md        # Project summary
└── 📄 README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or Atlas account)
- **npm** or **yarn**

### Installation

**1. Clone the repository**
```bash
cd c:\Glowiva
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**3. Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will open at `http://localhost:3000`

### First Admin User

Register a user, then update the database:
```javascript
// In MongoDB, update the user's role
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**📖 See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Get started in 5 minutes |
| [SETUP.md](./SETUP.md) | Detailed setup instructions |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Comprehensive project overview |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product details
- `POST /api/products` - Create product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `PUT /api/orders/:id/status` - Update status (Admin)

### Categories & Brands
- `GET /api/categories` - Get all categories
- `GET /api/brands` - Get all brands

**📖 See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.**

---

## 🚀 Deployment

### Production Deployment

**Database: MongoDB Atlas**
```bash
1. Create MongoDB Atlas account
2. Create cluster and database user
3. Get connection string
```

**Backend: Render**
```bash
1. Connect GitHub repository
2. Set environment variables
3. Deploy
```

**Frontend: Vercel**
```bash
1. Import GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy
```

**📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment guide.**

---

## 📸 Screenshots

*Screenshots section - Add your actual screenshots here*

### Homepage
![Homepage](./screenshots/homepage.png)

### Product Page
![Products](./screenshots/products.png)

### Admin Dashboard
![Admin](./screenshots/admin.png)

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/glowiva
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Glowiva
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 🤝 Contributing

This is a proprietary project. Contributions are not currently accepted.

---

## 📝 License

**All Rights Reserved © 2025 Glowiva**

This project and its contents are proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited.

**Developed by**: MH45

---

## 📞 Support

For technical issues:
- 📧 Email: support@glowiva.com
- 📱 Phone: +880 1314893055
- 🌐 Website: https://glowivabd.com

---

## 🙏 Acknowledgments

- Custom design and branding for Glowiva
- UI components based on modern e-commerce best practices
- Community support from the MERN stack community

---

<div align="center">

**Built with ❤️ using the MERN Stack**

[⬆ Back to Top](#-glowiva---beauty--skincare-e-commerce-platform)

</div>
