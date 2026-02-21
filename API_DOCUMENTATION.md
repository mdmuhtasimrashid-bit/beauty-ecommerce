# API Documentation - Glowiva E-Commerce

Base URL: `http://localhost:5000/api` (Development)  
Production URL: `https://your-backend.onrender.com/api`

## Authentication

All authenticated requests require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Auth Routes

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
```
*Requires Authentication*

### Update User Details
```http
PUT /api/auth/updatedetails
```
*Requires Authentication*

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "01234567890",
  "address": {
    "street": "123 Main St",
    "city": "Dhaka",
    "postalCode": "1205"
  }
}
```

---

## 📦 Product Routes

### Get All Products
```http
GET /api/products?page=1&limit=12&category=skin-care&brand=anua&sort=-createdAt
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category ID
- `brand` - Filter by brand ID
- `featured` - true/false
- `sort` - Sort field (prefix with - for descending)
- `price[gte]` - Minimum price
- `price[lte]` - Maximum price

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "pagination": {
    "next": { "page": 2, "limit": 12 }
  },
  "data": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "slug": "product-name",
      "price": 2500,
      "discountPrice": 2000,
      "images": ["image1.jpg"],
      "brand": { "name": "Brand Name" },
      "category": { "name": "Category Name" },
      "stock": 10,
      "ratings": 4.5,
      "numReviews": 25
    }
  ]
}
```

### Get Single Product
```http
GET /api/products/:slug
```

### Create Product (Admin Only)
```http
POST /api/products
```
*Requires Authentication & Admin Role*

**Request Body:**
```json
{
  "name": "Product Name",
  "brand": "brand_id",
  "category": "category_id",
  "price": 2500,
  "discountPrice": 2000,
  "description": "Product description",
  "images": ["image1.jpg", "image2.jpg"],
  "stock": 50,
  "featured": false
}
```

### Update Product (Admin Only)
```http
PUT /api/products/:id
```

### Delete Product (Admin Only)
```http
DELETE /api/products/:id
```

### Search Products
```http
GET /api/products/search/:keyword
```

---

## 🏷️ Category Routes

### Get All Categories
```http
GET /api/categories
```

### Get Single Category
```http
GET /api/categories/:slug
```

### Create Category (Admin Only)
```http
POST /api/categories
```

**Request Body:**
```json
{
  "name": "Skin Care",
  "description": "Skincare products"
}
```

### Update Category (Admin Only)
```http
PUT /api/categories/:id
```

### Delete Category (Admin Only)
```http
DELETE /api/categories/:id
```

---

## 🏢 Brand Routes

### Get All Brands
```http
GET /api/brands
```

### Get Single Brand
```http
GET /api/brands/:slug
```

### Create Brand (Admin Only)
```http
POST /api/brands
```

### Update Brand (Admin Only)
```http
PUT /api/brands/:id
```

### Delete Brand (Admin Only)
```http
DELETE /api/brands/:id
```

---

## 🛒 Order Routes

### Create Order
```http
POST /api/orders
```
*Requires Authentication*

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "image": "image.jpg",
      "price": 2000
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "01234567890",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "Dhaka",
    "postalCode": "1205"
  },
  "paymentMethod": "Cash on Delivery",
  "itemsPrice": 4000,
  "shippingPrice": 60,
  "taxPrice": 0,
  "totalPrice": 4060
}
```

### Get My Orders
```http
GET /api/orders/myorders
```
*Requires Authentication*

### Get Single Order
```http
GET /api/orders/:id
```
*Requires Authentication*

### Get All Orders (Admin Only)
```http
GET /api/orders
```

### Update Order Status (Admin Only)
```http
PUT /api/orders/:id/status
```

**Request Body:**
```json
{
  "status": "Shipped"
}
```

### Cancel Order
```http
PUT /api/orders/:id/cancel
```
*Requires Authentication*

---

## 👥 User Routes

### Get All Users (Admin Only)
```http
GET /api/users
```

### Get Single User (Admin Only)
```http
GET /api/users/:id
```

### Delete User (Admin Only)
```http
DELETE /api/users/:id
```

### Add to Wishlist
```http
POST /api/users/wishlist/:productId
```
*Requires Authentication*

### Remove from Wishlist
```http
DELETE /api/users/wishlist/:productId
```
*Requires Authentication*

### Get Wishlist
```http
GET /api/users/wishlist
```
*Requires Authentication*

---

## 🎟️ Coupon Routes

### Validate Coupon
```http
POST /api/coupons/validate
```

**Request Body:**
```json
{
  "code": "NEWYEAR2026",
  "cartTotal": 5000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "NEWYEAR2026",
    "discount": 500,
    "newTotal": 4500
  }
}
```

### Get All Coupons (Admin Only)
```http
GET /api/coupons
```

### Create Coupon (Admin Only)
```http
POST /api/coupons
```

**Request Body:**
```json
{
  "code": "NEWYEAR2026",
  "discountType": "percentage",
  "discountValue": 10,
  "minPurchase": 1000,
  "expiryDate": "2026-12-31",
  "usageLimit": 100,
  "isActive": true
}
```

---

## ⭐ Review Routes

### Get Product Reviews
```http
GET /api/reviews/product/:productId
```

### Create Review
```http
POST /api/reviews
```
*Requires Authentication*

**Request Body:**
```json
{
  "product": "product_id",
  "rating": 5,
  "title": "Great product!",
  "comment": "I love this product..."
}
```

### Update Review
```http
PUT /api/reviews/:id
```
*Requires Authentication*

### Delete Review
```http
DELETE /api/reviews/:id
```
*Requires Authentication*

### Get All Reviews (Admin Only)
```http
GET /api/reviews
```

### Approve Review (Admin Only)
```http
PUT /api/reviews/:id/approve
```

---

## 📋 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🔒 Error Response Format

```json
{
  "success": false,
  "error": "Error message here"
}
```

## 💡 Tips

1. All dates are in ISO 8601 format
2. Prices are in Bangladeshi Taka (BDT)
3. Pagination uses 1-based indexing
4. Search is case-insensitive
5. File uploads require multipart/form-data
