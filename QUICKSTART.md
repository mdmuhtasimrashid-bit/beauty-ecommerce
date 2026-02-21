# 🚀 Quick Start Guide - Glowiva E-Commerce

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend Configuration:**
```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env` and update:
- MongoDB connection string (use local MongoDB or Atlas)
- JWT secret key

**Frontend Configuration:**
```powershell
cd frontend
Copy-Item .env.example .env
```

The frontend `.env` is already configured for local development.

### Step 3: Start Development Servers

**Terminal 1 - Start Backend (PowerShell):**
```powershell
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running in development mode on port 5000
```

**Terminal 2 - Start Frontend (PowerShell):**
```powershell
cd frontend
npm start
```

The browser will automatically open at `http://localhost:3000`

### Step 4: Access the Application

- **Homepage**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health
- **Admin Dashboard**: http://localhost:3000/admin (after creating admin user)

---

## 👤 Create First Admin User

### Option 1: Via Registration + Database Update

1. Register a new user at: http://localhost:3000/register
2. Connect to MongoDB (using MongoDB Compass or CLI)
3. Find your user in the `users` collection
4. Update the `role` field from `"user"` to `"admin"`

### Option 2: Direct Database Insert

Using MongoDB Compass or CLI:

```javascript
// First, generate a hashed password using bcrypt
// Password: "admin123"
// Hashed: Use bcrypt online tool or backend script

db.users.insertOne({
  name: "Admin User",
  email: "admin@glowiva.com",
  password: "$2a$10$8K1p/a0dL2LzB34jN.oHOOD8K5WlX6QgKHCzwkRLhCKhBg1QrWi7i",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Then login with:
- Email: admin@glowiva.com
- Password: admin123

---

## 📊 Adding Initial Data

### Add Categories

1. Login as admin
2. Go to: http://localhost:3000/admin/categories
3. Add categories:
   - Skin Care
   - Make Up
   - Hair Care
   - Body Care
   - Mens Product
   - Mom & Baby

### Add Brands

1. Go to: http://localhost:3000/admin/brands
2. Add brands:
   - Anua
   - Derma Co
   - WishCare
   - Simple
   - MISSHA
   - Skin1004

### Add Products

1. Go to: http://localhost:3000/admin/products
2. Create products with:
   - Name
   - Category and Brand
   - Price and Discount Price
   - Description
   - Images (URLs or file uploads)
   - Stock quantity

---

## 🧪 Testing Features

### Test User Features
1. ✅ Register new account
2. ✅ Login
3. ✅ Browse products
4. ✅ Add to cart
5. ✅ Proceed to checkout
6. ✅ Place order
7. ✅ View order history

### Test Admin Features
1. ✅ Access admin dashboard
2. ✅ Create products
3. ✅ Manage orders
4. ✅ Update order status
5. ✅ Create coupons
6. ✅ View analytics

---

## 🛠️ Common Commands

### Backend Commands
```powershell
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Install new package
npm install package-name
```

### Frontend Commands
```powershell
cd frontend

# Development mode
npm start

# Production build
npm run build

# Install new package
npm install package-name
```

---

## 📱 Features Overview

### ✨ Customer Features
- [x] Product browsing with filters
- [x] Search functionality
- [x] Shopping cart
- [x] Product comparison
- [x] User authentication
- [x] Order placement
- [x] Order tracking
- [x] Product reviews
- [x] Wishlist
- [x] Responsive design

### 🔧 Admin Features
- [x] Dashboard with analytics
- [x] Product management (CRUD)
- [x] Order management
- [x] User management
- [x] Category management
- [x] Brand management
- [x] Coupon management
- [x] Review moderation

### 🎨 Design Features
- [x] Modern UI inspired by provided screenshots
- [x] Tailwind CSS styling
- [x] Smooth animations
- [x] Mobile responsive
- [x] Pink/purple gradient theme
- [x] Product cards with hover effects
- [x] Hero banner slider

---

## 📁 Project Structure

```
Glowiva/
├── backend/              # Node.js/Express API
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
│
├── frontend/            # React application
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # State management
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Helpers
│   │   └── App.js       # Main component
│   └── package.json
│
├── SETUP.md             # Detailed setup guide
├── DEPLOYMENT.md        # Deployment instructions
├── API_DOCUMENTATION.md # API reference
└── README.md            # Project overview
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
✅ Solution: Make sure MongoDB is running
- Local: Start MongoDB service
- Atlas: Check connection string and IP whitelist
```

### Port Already in Use
```
✅ Solution: Change port in .env file
Backend: Change PORT=5000 to PORT=5001
Frontend: Create .env with PORT=3001
```

### Module Not Found
```
✅ Solution: Reinstall dependencies
cd backend (or frontend)
rm -r node_modules
npm install
```

### API Not Working
```
✅ Check:
1. Backend server is running
2. MongoDB is connected
3. REACT_APP_API_URL is correct in frontend/.env
4. CORS is properly configured
```

---

## 📚 Next Steps

1. **Customize Design**
   - Update colors in `frontend/tailwind.config.js`
   - Add your logo to `frontend/public/`
   - Modify homepage content

2. **Add More Features**
   - Payment gateway integration (SSLCommerz/Stripe)
   - Email notifications
   - SMS notifications
   - Social media authentication
   - Advanced filtering
   - Product recommendations

3. **Deploy to Production**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) guide
   - Set up MongoDB Atlas
   - Deploy backend to Render
   - Deploy frontend to Vercel

4. **Optimize Performance**
   - Image optimization
   - Lazy loading
   - Caching strategies
   - Database indexing

---

## 💡 Tips

- Use **MongoDB Compass** for easy database management
- Use **Postman** to test API endpoints
- Check **browser console** for frontend errors
- Check **terminal** for backend errors
- Use **React DevTools** for component debugging

---

## 📞 Need Help?

- Check [SETUP.md](./SETUP.md) for detailed instructions
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
- Check error logs in terminal
- Review the code comments

---

## 🎉 You're All Set!

Your Glowiva e-commerce platform is ready for development. Happy coding! 🚀

For deployment to production, see [DEPLOYMENT.md](./DEPLOYMENT.md)
