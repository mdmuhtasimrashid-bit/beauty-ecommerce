const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const connectDB = require('../config/db');

dotenv.config();
connectDB().then(async () => {
  try {
    const products = await Product.find({
      $or: [
        { category: null },
        { category: { $exists: false } },
        { brand: null },
        { brand: { $exists: false } },
        { price: null },
        { price: 0 },
        { price: { $exists: false } },
        { stock: null },
        { stock: 0 },
        { stock: { $exists: false } },
      ]
    }).select('name category brand price stock').populate('category', 'name').populate('brand', 'name').lean();

    if (products.length === 0) {
      console.log('All products have category, brand, price, and stock set.');
    } else {
      console.log(`Found ${products.length} products with issues:\n`);
      products.forEach(p => {
        const issues = [];
        if (!p.category) issues.push('NO CATEGORY');
        if (!p.brand) issues.push('NO BRAND');
        if (!p.price) issues.push('NO PRICE');
        if (!p.stock) issues.push('STOCK=0');
        console.log(`${p.name}`);
        console.log(`  Issues: ${issues.join(', ')}`);
        console.log(`  Category: ${p.category?.name || '-'} | Brand: ${p.brand?.name || '-'} | Price: ${p.price || 0} | Stock: ${p.stock || 0}`);
        console.log('');
      });
    }
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
});
