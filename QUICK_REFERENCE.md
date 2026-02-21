# 🚀 Glowiva - Quick Reference Guide

## Development Quick Start

### Windows
```cmd
start-dev.bat
```

### Linux/Mac
```bash
chmod +x start-dev.sh
./start-dev.sh
```

## Common Commands

### Backend
```bash
cd backend

# Development
npm run dev              # Start with nodemon (auto-restart)
npm start               # Start production

# Database
npm run seed:admin      # Create admin user
npm run seed:data       # Seed categories and brands
```

### Frontend
```bash
cd frontend

# Development
npm start               # Start dev server (port 3000)

# Production
npm run build          # Build for production
npx serve -s build     # Test build locally
```

## Default Credentials

After running `npm run seed:admin`:
- Check terminal output for admin credentials
- **Change password immediately after first login!**

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<min-32-chars>
CLIENT_URL=https://your-domain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.your-domain.com/api
```

## Production Deployment

### Quick Deploy Script
```bash
chmod +x start-production.sh
./start-production.sh
```

### Manual Steps
1. Set environment variables
2. Install dependencies
3. Build frontend: `npm run build`
4. Start backend with PM2: `pm2 start server.js --name glowiva-api`
5. Serve frontend build with Nginx/Apache

## PM2 Commands

```bash
pm2 status                  # Check status
pm2 logs glowiva-api       # View logs
pm2 restart glowiva-api    # Restart
pm2 stop glowiva-api       # Stop
pm2 delete glowiva-api     # Remove
pm2 monit                  # Monitor resources
```

## Database Backup

```bash
# Backup
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify .env file exists
- Check port 5000 is free
- Review error logs

### Frontend build fails
- Delete node_modules
- Run `npm install` again
- Check for console errors
- Verify .env file

### Images not uploading
- Check uploads/ directory exists
- Verify write permissions
- Check MAX_FILE_SIZE in .env

### CORS errors
- Verify CLIENT_URL in backend .env
- Check REACT_APP_API_URL in frontend .env
- Ensure both use http:// or https:// consistently

## Useful Paths

- **Backend API**: `http://localhost:5000/api`
- **Frontend**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
- **Health Check**: `http://localhost:5000/api/health`

## API Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@glowiva.com","password":"your-password"}'
```

## Project Structure

```
Glowivaa/
├── backend/          # Express.js API
│   ├── config/      # Database config
│   ├── controllers/ # Business logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── middleware/  # Auth, error handling
│   └── uploads/     # Uploaded files
├── frontend/        # React.js app
│   ├── public/      # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # State management
│       ├── pages/       # Page components
│       └── utils/       # Helpers
└── Documentation files
```

## Key Features Status

✅ User Authentication
✅ Product Management
✅ Shopping Cart
✅ Wishlist
✅ Product Comparison
✅ Order Management
✅ Admin Dashboard
✅ Search & Filters
✅ Reviews & Ratings
✅ Responsive Design
✅ Mobile Navigation

## Documentation

- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Detailed setup
- [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) - Deploy guide
- [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) - Pre-launch checklist
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference

## Support

For issues:
1. Check error logs first
2. Review environment variables
3. Verify database connection
4. Check browser console (frontend)
5. Review PM2 logs (backend)

## Performance Tips

- Use MongoDB Atlas for production
- Enable CDN for images
- Use PM2 cluster mode for scaling
- Implement Redis caching (optional)
- Optimize images before upload
- Enable gzip compression

## Security Reminders

- Change default admin password
- Use strong JWT_SECRET (32+ chars)
- Enable HTTPS in production
- Keep dependencies updated
- Use environment variables
- Never commit .env files
- Regular database backups

---

**Need help?** Check the comprehensive docs in PRODUCTION_DEPLOYMENT.md
