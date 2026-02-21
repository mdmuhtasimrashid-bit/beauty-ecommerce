require('dotenv').config();
const mongoose = require('mongoose');
const Brand = require('../models/Brand');

const cleanupBrands = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find all brands with similar names
    const allBrands = await Brand.find({});
    console.log('Current brands:');
    allBrands.forEach(b => {
      console.log(`  - ${b.name} (slug: ${b.slug})`);
    });
    console.log('');

    // Find duplicates
    const skinOVariants = allBrands.filter(b => 
      b.name.toLowerCase().includes('skin') && b.name.toLowerCase().includes('o')
    );
    
    if (skinOVariants.length > 1) {
      console.log('Found multiple skinO variants:', skinOVariants.map(b => `${b.name} (${b.slug})`).join(', '));
      
      // Delete the one with wrong slug (Skin'O with slug "dove")
      const wrongOne = skinOVariants.find(b => b.slug === 'dove');
      if (wrongOne) {
        await Brand.findByIdAndDelete(wrongOne._id);
        console.log(`✅ Deleted duplicate "${wrongOne.name}" with wrong slug "dove"\n`);
      }
    }

    // Now add Dove if it doesn't exist
    const doveExists = await Brand.findOne({ name: 'Dove' });
    if (!doveExists) {
      const dove = await Brand.create({
        name: 'Dove',
        description: 'Personal care brand',
        isActive: true
      });
      console.log(`✅ Added "Dove" (slug: ${dove.slug})\n`);
    } else {
      console.log('Dove already exists\n');
    }

    // List all brands sorted
    const finalBrands = await Brand.find({}).sort({ name: 1 });
    console.log('=== FINAL BRAND LIST ===\n');
    finalBrands.forEach((brand, index) => {
      console.log(`${index + 1}. ${brand.name} (slug: ${brand.slug})`);
    });
    console.log(`\n📊 Total: ${finalBrands.length} brands`);

    await mongoose.connection.close();
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanupBrands();
