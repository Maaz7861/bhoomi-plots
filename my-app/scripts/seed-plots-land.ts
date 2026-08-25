import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined. Please check .env.local');
  process.exit(1);
}

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['plots', 'land', 'residential', 'commercial'],
    },
    price: { type: String, required: true, trim: true },
    priceRange: { type: String, trim: true, default: '' },
    bhk: { type: String, trim: true, default: '' },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    features: { type: String, trim: true, default: '' },
    status: { type: String, required: true, trim: true },
    reraNumber: { type: String, trim: true, default: '' },
    developer: { type: String, trim: true, default: 'Bhoomi Projects' },
    imageUrl: { type: String, trim: true, default: '' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Plot = mongoose.models.Plot || mongoose.model('Plot', plotSchema);

const samplePlotsAndLand = [
  // ── PLOTS ───────────────────────────────────────────────────
  {
    title: 'Bhoomi Lakeview Enclave',
    category: 'plots',
    price: '₹ 32 Lakh',
    priceRange: '32L - 55L',
    location: 'Gangapur Road, Nashik',
    description: 'Scenic gated community NA plots with panoramic lake views, internal tar roads, underground electricity cabling, and 24/7 security.',
    features: '1200 sq.ft • 2500 sq.ft • NA Clear Title • Lake Facing • Club House • Water & Electricity',
    status: 'Fast Selling',
    reraNumber: 'P51600063211',
    imageUrl: '/projects/plot.jpg',
    isFeatured: true,
  },
  {
    title: 'Emerald Green Valley Plots',
    category: 'plots',
    price: '₹ 22.5 Lakh',
    priceRange: '22L - 45L',
    location: 'Igatpuri Hill Station, Nashik',
    description: 'Serene climate and misty mountain views. Ready-to-build villa and bungalow plots situated in a gated resort-style layout with recreational clubhouse.',
    features: '1500 sq.ft • 4000 sq.ft • Gated Security • Mountain View • Resort Amenities • Clear Title',
    status: 'New Launch',
    reraNumber: 'P51600078420',
    imageUrl: '/projects/plot.jpg',
    isFeatured: true,
  },
  {
    title: 'Expressway Commerce & Residential Plots',
    category: 'plots',
    price: '₹ 45 Lakh',
    priceRange: '45L - 80L',
    location: 'Mumbai-Nashik Highway Touch, Nashik',
    description: 'Prime highway frontage NA plots ideal for mixed-use residential bungalows and commercial storefronts. High capital appreciation zone.',
    features: '2000 sq.ft • 5000 sq.ft • Highway Frontage • High ROI • Commercial & NA Zone • Immediate Possession',
    status: 'Limited Inventory',
    reraNumber: 'P51600054190',
    imageUrl: '/projects/plot.jpg',
    isFeatured: false,
  },
  {
    title: 'Trimbak Serenity Greens',
    category: 'plots',
    price: '₹ 18 Lakh',
    priceRange: '18L - 35L',
    location: 'Trimbakeshwar Road, Nashik',
    description: 'Surrounded by lush Sahyadri foothills, these premium NA bungalow plots offer peaceful living with landscaped gardens, kids play turf, and organic fruit orchards.',
    features: '1000 sq.ft • 2200 sq.ft • Organic Farm Space • Demarcated Boundary • Street Lights • 24/7 Water',
    status: 'Exclusive Listing',
    reraNumber: 'P51600081022',
    imageUrl: '/projects/plot.jpg',
    isFeatured: false,
  },

  // ── LAND ────────────────────────────────────────────────────
  {
    title: 'Bhoomi Sahyadri Agro Estate',
    category: 'land',
    price: '₹ 1.25 Cr',
    priceRange: '1.2 Cr - 3.5 Cr',
    location: 'Dindori Wine Valley, Nashik',
    description: 'Expansive fertile agricultural and vineyard land parcels with uninterrupted river frontage, rich black soil, and year-round perennial water availability.',
    features: '2 to 10 Acres • Vineyard Suitable • River Water Touch • Tar Road Access • Clear Title Record',
    status: 'High Appreciation',
    reraNumber: 'NA / Title Clear',
    imageUrl: '/projects/land.jpg',
    isFeatured: true,
  },
  {
    title: 'Hillside Farmhouse Land',
    category: 'land',
    price: '₹ 85 Lakh',
    priceRange: '85L - 1.8 Cr',
    location: 'Vaitarna Backwaters, Nashik',
    description: 'Pristine water-touch farmhouse land overlooking the Vaitarna reservoir. Ideal for weekend retreats, organic farm villas, and eco-tourism development.',
    features: '1 to 5 Acres • Lake Backwaters • Fencing Done • Mountain Breezes • Power & Borewell Connected',
    status: 'Fast Selling',
    reraNumber: 'NA / Clear Title',
    imageUrl: '/projects/land.jpg',
    isFeatured: true,
  },
  {
    title: 'Prime Industrial & Logistics Land',
    category: 'land',
    price: '₹ 2.8 Cr',
    priceRange: '2.8 Cr - 6.5 Cr',
    location: 'Ambad MIDC Extension, Nashik',
    description: 'Strategically positioned heavy-vehicle access industrial land parcel close to MIDC clusters and state freight highways with power sub-station nearby.',
    features: '3 to 15 Acres • Heavy Vehicle Access • Industrial Zone • 3-Phase Power Support • Wide Concrete Road',
    status: 'Limited Inventory',
    reraNumber: 'MIDC Approved',
    imageUrl: '/projects/land.jpg',
    isFeatured: false,
  },
  {
    title: 'Bhoomi Greenfield Orchard Acres',
    category: 'land',
    price: '₹ 60 Lakh',
    priceRange: '60L - 1.2 Cr',
    location: 'Peth Road, Nashik',
    description: 'Fully fenced organic farmhouse acres with established fruit trees (mango, guava, lemon), farm shed, micro-drip irrigation system, and caretakers quarters.',
    features: '1.5 to 4 Acres • Organic Certified • Drip Irrigation • Farmhouse Setup • Natural Water Well',
    status: 'Ready to Move',
    reraNumber: 'Clear Title / 7/12 Single Owner',
    imageUrl: '/projects/land.jpg',
    isFeatured: false,
  },
];

async function seedPlotsAndLand() {
  console.log('🌱 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI!);
  console.log('✅ Connected to DB');

  let count = 0;
  for (const item of samplePlotsAndLand) {
    const updated = await Plot.findOneAndUpdate(
      { title: item.title },
      item,
      { upsert: true, returnDocument: 'after', runValidators: true }
    );
    count++;
    console.log(`✅ Seeded [${item.category.toUpperCase()}]: ${updated.title} | Price: ${updated.price} | Range: ${updated.priceRange} | ${updated.location}`);
  }

  console.log(`\n🎉 Successfully seeded ${count} Plots and Land properties into MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedPlotsAndLand().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
