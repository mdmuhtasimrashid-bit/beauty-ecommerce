# Glowiva E-Commerce Platform - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn package manager
- Git

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
cd c:\Glowiva
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` file with your configurations:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/glowiva
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

**For MongoDB Atlas:**
Replace `MONGODB_URI` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glowiva
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Glowiva
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`  
The backend API runs at `http://localhost:5000`

## 📊 Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod
   ```

### Option 2: MongoDB Atlas (Recommended for Production)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `.env`

## 🌱 Seed Initial Data (Optional)

To populate your database with sample data, you can use the MongoDB compass or create seed scripts.

### Create Admin User Manually

Use MongoDB Compass or mongo shell to create an admin user:

```javascript
// Connect to your database and run:
db.users.insertOne({
  name: "Admin User",
  email: "admin@glowiva.com",
  password: "$2a$10$xYz...", // Use bcrypt to hash "admin123"
  role: "admin",
  createdAt: new Date()
})
```

Or register through the app and manually update the role to "admin" in the database.

## 🧪 Testing the Application

### Test Authentication
1. Go to `http://localhost:3000/register`
2. Create a new account
3. Login with credentials
4. Test protected routes

### Test Product Features
1. Create categories and brands via admin panel
2. Add products with images
3. Test cart functionality
4. Test checkout process

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is busy:

**Backend:**
```bash
# Change PORT in backend/.env
PORT=5001
```

**Frontend:**
```bash
# Create .env in frontend with:
PORT=3001
```

### MongoDB Connection Error
- Check if MongoDB service is running
- Verify connection string format
- Check network access in MongoDB Atlas
- Ensure IP is whitelisted

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## 📁 Project Structure

```
Glowiva/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth & error handling
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Context providers
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Helper functions
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   └── package.json
│
└── README.md
```

## 🎨 Customization

### Change Brand Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ... other shades
  }
}
```

### Update Logo
Replace logo files in `frontend/public/`

### Modify Email Templates
Edit email configurations in `backend/config/`

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The optimized production build will be in `frontend/build/`

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🆘 Support

For issues or questions:
- Check the documentation
- Review error logs
- Create an issue in the repository

## 📝 License

All Rights Reserved - Glowiva © 2025
