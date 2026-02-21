const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const checkProducts = async () => {
  try {
    const products = await Product.find({})
      .populate('category', 'name slug')
      .limit(20);
    
    console.log('\n📦 Products in database:\n');
    
    if (products.length === 0) {
      console.log('❌ No products found in database');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   Category: ${product.category ? product.category.name + ' (slug: ' + product.category.slug + ')' : 'No category assigned'}`);
        console.log(`   Category ID: ${product.category ? product.category._id : 'null'}`);
        console.log('');
      });
    }
    
    console.log(`\nTotal: ${products.length} products\n`);
    
    // List all categories
    const categories = await Category.find({});
    console.log('📋 Available Categories:\n');
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (slug: ${cat.slug}, ID: ${cat._id})`);
    });
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkProducts();
