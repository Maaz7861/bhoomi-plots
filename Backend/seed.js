require('dotenv').config();
const mongoose = require('mongoose');
const Plot = require('./models/Plot');
const Banner = require('./models/Banner');

const initialPlots = [
  {
    title: 'Lakeview Township',
    category: 'plots',
    price: '₹ 45 Lakh',
    location: 'Near Hinjewadi, Pune',
    description: 'Plotted development with central park, lake promenade and clubhouse, near key IT corridors.',
    features: '1200 sq.ft • 3000 sq.ft • Lake Front',
    status: 'Fast Selling',
    reraNumber: 'P52100012345',
    developer: 'Bhoomi Projects',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    isFeatured: true,
  },
  {
    title: 'Expressway Enclave',
    category: 'plots',
    price: '₹ 60 Lakh',
    location: 'Pune–Mumbai Expressway',
    description: 'Road-touch plots just off the expressway, ideal for commercial and mixed-use developments.',
    features: '2000 sq.ft • 5000 sq.ft • Highway Touch',
    status: 'Limited Inventory',
    reraNumber: 'P52100067890',
    developer: 'Bhoomi Projects',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    isFeatured: false,
  },
  {
    title: 'Bhoomi Hills',
    category: 'land',
    price: '₹ 2.5 Cr',
    location: 'Nashik Road, Nashik',
    description: 'Scenic NA land parcels overlooking hills, ideal for long-term investment and future farm houses.',
    features: 'NA Land • Clear Title • Hill View',
    status: 'High Appreciation',
    reraNumber: 'P51600022334',
    developer: 'Bhoomi Projects',
    imageUrl: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80',
    isFeatured: true,
  },
  {
    title: 'Premium Bungalow',
    category: 'residential',
    price: '₹ 1.27 Cr',
    location: '500 MG Road, Camp, Pune',
    description: 'Premium 3 BHK bungalow with private sit-out in the heart of Camp.',
    features: '3 Bds • 3 Ba • 1,250 sqft',
    status: 'RERA Approved',
    reraNumber: 'P52100088990',
    developer: 'Bhoomi Prime',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    isFeatured: true,
  },
  {
    title: 'Horizon IT Park',
    category: 'commercial',
    price: '₹ 3.5 Cr',
    location: 'Baner, Pune',
    description: 'Premium office spaces designed for modern IT and multinational companies.',
    features: 'Grade A • Office Spaces • Food Court',
    status: 'Under Construction',
    reraNumber: 'P52100033445',
    developer: 'Bhoomi Commercials',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    isFeatured: true,
  },
];

const initialBanners = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80',
    ctaText: 'Explore Premium Plots →',
    link: 'http://localhost:3000/projects?tab=plots',
    isActive: true,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    ctaText: 'View Commercial Spaces',
    link: 'http://localhost:3000/projects?tab=commercial',
    isActive: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clean existing
    await Plot.deleteMany({});
    await Banner.deleteMany({});
    console.log('🧹 Cleaned existing collections');

    // Insert
    const createdPlots = await Plot.insertMany(initialPlots);
    console.log(`🌱 Seeded ${createdPlots.length} plots`);

    const createdBanners = await Banner.insertMany(initialBanners);
    console.log(`🌱 Seeded ${createdBanners.length} banners`);

    console.log('✨ Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
