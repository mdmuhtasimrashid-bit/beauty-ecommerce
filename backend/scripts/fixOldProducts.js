const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const connectDB = require('../config/db');

dotenv.config();
connectDB().then(async () => {
  try {
    // Get category IDs
    const cats = {};
    const allCats = await Category.find({}).lean();
    for (const c of allCats) {
      cats[c.name.toLowerCase()] = c._id;
    }
    console.log('Categories loaded:', Object.keys(cats).join(', '));

    // Get brand IDs
    const brands = {};
    const allBrands = await Brand.find({}).lean();
    for (const b of allBrands) {
      brands[b.name.toLowerCase()] = b._id;
    }
    console.log('Brands loaded:', Object.keys(brands).join(', '));

    // Category string -> ObjectId mapping
    const catMap = {
      'serum': cats['serum'],
      'toner': cats['toner'],
      'facewash': cats['cleanser'],
      'moisturizer': cats['moisturizer'],
      'sunscreen': cats['sunscreen'],
    };

    // Helper to find brand
    const getBrand = (name) => {
      const n = name.toLowerCase();
      if (n.includes('the ordinary')) return brands['the ordinary'];
      if (n.includes('skin1004') || n.includes('skin 1004')) return brands['skin 1004'];
      if (n.includes("skin'o") || n.includes('skino') || n.includes("skin'o")) return brands['skino'] || brands["skin'o"];
      if (n.includes("i'm from") || n.includes('im from')) return brands["i'm from"];
      if (n.includes('laikou') || n.includes('japan sakura')) return brands['laikou'];
      if (n.includes('cerave') || n.includes('cerave')) return brands['cerave'];
      if (n.includes('pomegranate')) return brands['skinfood'];
      if (n.includes('face shop')) return brands['the face shop'];
      if (n.includes('innsaei')) return brands['innsaei'];
      if (n.includes('mistine')) return brands['mistine'];
      if (n.includes('bioaqua')) return brands['bioaqua'];
      if (n.includes('simple')) return brands['simple'];
      if (n.includes('dabo')) return brands['dabo'];
      return null;
    };

    // Product-specific fixes: { id: { price, stock, ... } }
    const productFixes = {
      // Serums
      '698b361f9a4272fff75d0bb8': { price: 1800, stock: 10 },  // TO Multi-Peptide 60ml
      '698b37559a4272fff75d0bde': { price: 1050, stock: 10 },  // TO Alpha Arbutin
      '698b3af09a4272fff75d0c3a': { price: 1600, stock: 1 },   // SKIN1004 Ampoule 100ml
      '698b3dfb9a4272fff75d0c70': { price: 800, stock: 1 },    // Skin'O Brightening Serum
      '698b3ec59a4272fff75d0c88': { price: 1100, stock: 1 },   // TO Retinol 0.5%
      '698b3fe09a4272fff75d0ca6': { price: 1200, stock: 1 },   // TO Retinol 1%
      '698b40699a4272fff75d0cb5': { price: 1100, stock: 1 },   // TO AHA BHA Peeling
      '698b410e9a4272fff75d0cca': { price: 900, stock: 1 },    // TO Multi-Peptide Eye
      '698b41b89a4272fff75d0cdc': { price: 1100, stock: 1 },   // TO Ascorbyl Glucoside
      '698b429f9a4272fff75d0cf4': { price: 1000, stock: 1 },   // TO Argireline
      '698c629b9a4272fff75d1273': { price: 1200, stock: 1 },   // TO Glycolic 100ml
      '698c63bf9a4272fff75d1294': { price: 1800, stock: 1 },   // TO Glycolic 240ml

      // Toners
      '698b440d9a4272fff75d0d1b': { price: 650, stock: 4 },    // I'M FROM Rice Toner 30ml
      '698b44a49a4272fff75d0d2d': { price: 1500, stock: 1 },   // I'M FROM Rice Toner 150ml

      // Cleansers
      '698b453a9a4272fff75d0d3f': { price: 350, stock: 1 },    // LAIKOU Sakura Cleanser 50ml
      '698b45cb9a4272fff75d0d51': { price: 550, stock: 1 },    // LAIKOU Sakura Cleanser 100ml
      '698b47399a4272fff75d0d75': { price: 1400, stock: 1 },   // CeraVe Hydrating Cleanser
      '698b48399a4272fff75d0d95': { price: 1400, stock: 1 },   // CeraVe Foaming Cleanser
      '698b49c59a4272fff75d0db6': { price: 750, stock: 1 },    // Pomegranate Peeling Gel
      '698b59d59a4272fff75d0ef8': { price: 550, stock: 1 },    // Face Shop Rice Water
      '698b5a8f9a4272fff75d0f0d': { price: 550, stock: 1 },    // Innsaei Low pH Cleanser
      '698b5c289a4272fff75d0f3a': { price: 450, stock: 1 },    // Mistine Acne Foam

      // Moisturizers
      '698b5fbb9a4272fff75d0f8a': { price: 600, stock: 1 },    // Skino Gel Moisturizer
      '698b60f49a4272fff75d0fab': { price: 650, stock: 1 },     // Skin'O Hydro Boost
      '698b631b9a4272fff75d0fd4': { price: 400, stock: 1 },     // Bioaqua Rice Cream
      '698b64409a4272fff75d0ffa': { price: 600, stock: 1 },     // Simple Moisturiser
      '698b65149a4272fff75d1012': { price: 1800, stock: 1 },    // CeraVe Night Cream
      '698b66e09a4272fff75d103c': { price: 650, stock: 1 },     // DABO Snail 50ml
      '698b672d9a4272fff75d1048': { price: 950, stock: 1 },     // DABO Snail 100ml

      // Sunscreen
      '698c6cb09a4272fff75d134a': { price: 1200, stock: 1 },    // SKIN1004 Suncream
    };

    // Check if The Face Shop brand exists, create if not
    if (!brands['the face shop']) {
      const newBrand = await Brand.create({ name: 'The Face Shop', description: 'Korean beauty brand with nature-inspired skincare' });
      brands['the face shop'] = newBrand._id;
      console.log('Created new brand: The Face Shop');
    }

    console.log(`\nFixing ${Object.keys(productFixes).length} products...\n`);

    let fixed = 0;
    let errors = 0;

    for (const [id, fixes] of Object.entries(productFixes)) {
      try {
        const product = await Product.findById(id);
        if (!product) {
          console.log(`  ❌ Product ${id} not found`);
          errors++;
          continue;
        }

        // Fix category
        const catString = typeof product.category === 'string' ? product.category : null;
        if (catString && catMap[catString]) {
          product.category = catMap[catString];
        }

        // Fix brand
        if (!product.brand || !mongoose.Types.ObjectId.isValid(product.brand)) {
          const brandId = getBrand(product.name);
          if (brandId) {
            product.brand = brandId;
          } else {
            console.log(`  ⚠️  No brand match for: ${product.name}`);
          }
        }

        // Fix price and stock
        if (fixes.price) product.price = fixes.price;
        if (fixes.stock) product.stock = fixes.stock;

        await product.save();
        console.log(`  ✅ ${product.name} → cat: ${catString || 'ok'}, price: ${fixes.price}, stock: ${fixes.stock}`);
        fixed++;
      } catch (err) {
        console.error(`  ❌ ${id}: ${err.message}`);
        errors++;
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log(`✅ ${fixed} products fixed`);
    if (errors > 0) console.log(`❌ ${errors} errors`);
    console.log('═══════════════════════════════════════\n');

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
});
