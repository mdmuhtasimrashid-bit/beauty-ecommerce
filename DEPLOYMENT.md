# Deployment Guide - Glowiva E-Commerce

## 🌐 Deployment Architecture

- **Frontend**: Vercel (React App)
- **Backend**: Render (Node.js API)
- **Database**: MongoDB Atlas
- **Assets**: Cloud Storage (Optional: Cloudinary/AWS S3)

## 📊 MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new organization

### 2. Create Cluster

1. Click "Build a Cluster"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (closest to your users)
4. Click "Create Cluster"

### 3. Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Select "Read and write to any database"
5. Add user

### 4. Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `myFirstDatabase` with `glowiva`

Example:
```
mongodb+srv://glowiva:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/glowiva?retryWrites=true&w=majority
```

## 🚀 Backend Deployment (Render)

### 1. Prepare Backend for Deployment

Create `backend/.env.production`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret_very_long_and_secure
JWT_EXPIRE=30d
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### 2. Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub

### 3. Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: glowiva-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 4. Add Environment Variables

In Render dashboard, go to "Environment" tab and add:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=https://your-app.vercel.app
```

### 5. Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://glowiva-backend.onrender.com`

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend for Deployment

Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
REACT_APP_SITE_NAME=Glowiva
```

### 2. Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 3. Import Project

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build

### 4. Add Environment Variables

In Vercel dashboard, go to "Settings" → "Environment Variables":
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
REACT_APP_SITE_NAME=Glowiva
```

### 5. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at: `https://glowiva.vercel.app`

## 🔄 Update CORS Settings

After deployment, update your backend CORS configuration:

`backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Redeploy backend on Render.

## 🌍 Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render:
1. Go to Settings → Custom Domain
2. Add your custom domain
3. Update DNS records

## 📦 Asset Management

### Option 1: Store in Public Folder
- Place images in `frontend/public/images/`
- Reference as `/images/product.jpg`

### Option 2: Cloud Storage (Recommended for Production)

**Using Cloudinary:**
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get API credentials
3. Install: `npm install cloudinary multer-storage-cloudinary`
4. Configure upload middleware

**Using AWS S3:**
1. Create S3 bucket
2. Set up IAM user with S3 permissions
3. Install: `npm install aws-sdk multer-s3`
4. Configure upload middleware

## 🔒 Security Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Enable CORS only for your domain
- [ ] Remove console.logs
- [ ] Add error monitoring (Sentry)
- [ ] Set up database backups
- [ ] Review MongoDB security rules

## 📊 Monitoring

### Backend Monitoring (Render)
- View logs in Render dashboard
- Set up health checks
- Configure alerts

### Frontend Monitoring (Vercel)
- Analytics in Vercel dashboard
- Error tracking with Sentry
- Performance monitoring

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**
2. **Automatic deployment triggers**
3. **New version goes live**

### Branch Deployments
- `main` branch → Production
- `dev` branch → Staging (create separate Vercel/Render instances)

## 💾 Database Backup

### Automated Backups (MongoDB Atlas)
1. Go to Cluster → Backup
2. Enable Cloud Backup
3. Configure backup schedule

### Manual Backup
```bash
mongodump --uri="your_mongodb_atlas_uri" --out=./backup
```

## 🐛 Troubleshooting Deployment Issues

### Build Fails
- Check Node version compatibility
- Verify all dependencies are in package.json
- Review build logs

### API Connection Fails
- Verify environment variables
- Check CORS settings
- Confirm backend URL is correct

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

## 📈 Performance Optimization

### Frontend
- Enable Vercel Analytics
- Use image optimization
- Implement lazy loading
- Enable service workers

### Backend
- Add Redis caching
- Optimize database queries
- Use CDN for static assets
- Implement API rate limiting

## 🆘 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 📝 Post-Deployment Tasks

1. Test all functionality in production
2. Set up monitoring and alerts
3. Configure automated backups
4. Document API endpoints
5. Set up SSL certificates (auto with Vercel/Render)
6. Test payment integrations
7. Set up email service
8. Configure analytics

## 🎉 You're Live!

Your Glowiva e-commerce platform is now deployed and accessible worldwide!

- Frontend: https://glowiva.vercel.app
- Backend: https://glowiva-backend.onrender.com
- Admin: https://glowiva.vercel.app/admin
