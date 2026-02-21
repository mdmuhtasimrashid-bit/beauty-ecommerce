# Glowiva Deployment Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- npm or yarn package manager

## Environment Setup

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database - Use MongoDB Atlas for production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glowiva

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
CLIENT_URL=https://your-domain.com

# File Upload
MAX_FILE_SIZE=5242880
```

### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_SITE_NAME=Glowiva
```

## Deployment Steps

### Option 1: Traditional Hosting (VPS/Dedicated Server)

#### Backend Deployment

1. **Install Dependencies**
   ```bash
   cd backend
   npm install --production
   ```

2. **Create Admin User**
   ```bash
   npm run seed:admin
   ```

3. **Seed Initial Data (Optional)**
   ```bash
   npm run seed:data
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

5. **Use Process Manager (PM2 - Recommended)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name glowiva-api
   pm2 save
   pm2 startup
   ```

#### Frontend Deployment

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Build Production Files**
   ```bash
   npm run build
   ```

3. **Serve with Web Server**
   - Using Nginx:
     ```nginx
     server {
         listen 80;
         server_name your-domain.com;
         
         root /path/to/frontend/build;
         index index.html;
         
         location / {
             try_files $uri $uri/ /index.html;
         }
         
         location /api {
             proxy_pass http://localhost:5000/api;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```

   - Using Apache:
     Create `.htaccess` in the build folder:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```

### Option 2: Cloud Platforms

#### Heroku Deployment

**Backend:**
1. Create `Procfile` in backend/:
   ```
   web: node server.js
   ```

2. Deploy:
   ```bash
   heroku create glowiva-api
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   # ... set other env variables
   git push heroku main
   ```

**Frontend:**
1. Add buildpack:
   ```bash
   heroku create glowiva-app
   heroku buildpacks:set mars/create-react-app
   ```

2. Set environment variables and deploy

#### Vercel Deployment (Frontend)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

#### Railway/Render Deployment

Similar to Heroku - connect your GitHub repo and set environment variables.

#### DigitalOcean App Platform

1. Connect GitHub repository
2. Set environment variables
3. Configure build and run commands

### Option 3: Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
  
  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## Post-Deployment Checklist

- [ ] Database connection is working
- [ ] Environment variables are properly set
- [ ] Admin user is created
- [ ] Upload directory has write permissions
- [ ] CORS is configured correctly
- [ ] SSL certificate is installed (HTTPS)
- [ ] File upload functionality works
- [ ] Payment integration is tested (if applicable)
- [ ] Email notifications work
- [ ] Error logging is set up
- [ ] Backup strategy is in place
- [ ] CDN is configured for images (optional)
- [ ] Performance monitoring is enabled

## Security Recommendations

1. **Use HTTPS**: Always use SSL/TLS certificates
2. **Strong JWT Secret**: Minimum 32 characters, random string
3. **Database Security**: Use strong passwords, enable authentication
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Input Validation**: Already implemented with express-validator
6. **Regular Updates**: Keep dependencies up to date
7. **Backup Database**: Schedule regular automated backups
8. **Monitor Logs**: Set up error tracking (Sentry, LogRocket, etc.)

## Scaling Considerations

1. **CDN**: Use CloudFlare or AWS CloudFront for static assets
2. **Load Balancer**: Use Nginx or cloud load balancers for multiple instances
3. **Database**: Consider MongoDB Atlas for managed database
4. **Caching**: Implement Redis for session and data caching
5. **Image Optimization**: Use image CDN (Cloudinary, ImageKit)

## Maintenance

### Backup Database
```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

### Restore Database
```bash
mongorestore --uri="mongodb+srv://..." ./backup
```

### Update Application
```bash
git pull origin main
cd backend && npm install && pm2 restart glowiva-api
cd ../frontend && npm install && npm run build
```

## Monitoring

1. **Application Logs**: `pm2 logs glowiva-api`
2. **Server Resources**: `pm2 monit`
3. **Database Monitor**: Use MongoDB Atlas dashboard
4. **Uptime Monitoring**: Use services like UptimeRobot or Pingdom

## Troubleshooting

### Backend not starting
- Check MongoDB connection string
- Verify all environment variables are set
- Check port availability
- Review error logs

### Frontend build fails
- Clear node_modules and reinstall
- Check for TypeScript/ESLint errors
- Verify environment variables

### Images not uploading
- Check uploads directory permissions
- Verify MAX_FILE_SIZE setting
- Check disk space

## Support

For issues, please check:
- Application logs
- Browser console (for frontend issues)
- MongoDB logs
- Server error logs

## Notes

- Default admin credentials will be displayed when running `npm run seed:admin`
- Change admin password immediately after first login
- Regular security updates are recommended
- Monitor application performance and optimize as needed
