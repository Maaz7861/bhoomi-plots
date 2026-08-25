import path from 'path';
import dotenv from 'dotenv';
import * as XLSX from 'xlsx';
import mongoose from 'mongoose';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined. Please check .env.local');
  process.exit(1);
}

// Plot Schema definition
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

function formatPriceInLakhs(amount: number): string {
  if (!amount || isNaN(amount)) return 'Price on Request';
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹ ${parseFloat(cr)} Cr`;
  }
  const l = (amount / 100000).toFixed(2);
  return `₹ ${parseFloat(l)} Lakh`;
}

function formatPriceRange(min: number, max: number): string {
  if (!min && !max) return '';
  const formatShort = (num: number) => {
    if (num >= 10000000) {
      return `${parseFloat((num / 10000000).toFixed(2))} Cr`;
    }
    return `${parseFloat((num / 100000).toFixed(1))}L`;
  };

  if (min && max) {
    // If max has an obvious typo (e.g. 695000 vs 6950000 for 67L project)
    let adjustedMax = max;
    if (max < min && max * 10 >= min) {
      adjustedMax = max * 10;
    }
    return `${formatShort(min)} - ${formatShort(adjustedMax)}`;
  }
  if (min) return `From ${formatShort(min)}`;
  return '';
}

function deriveBHK(smallest: number, biggest: number): string {
  const bhks: string[] = [];
  if (smallest < 800 || biggest <= 800) bhks.push('1 BHK');
  if ((smallest <= 1200 && biggest >= 800) || (smallest >= 800 && smallest <= 1300)) bhks.push('2 BHK');
  if (biggest >= 1250 || (smallest >= 1200 && smallest <= 1800)) bhks.push('3 BHK');
  if (biggest >= 1650) bhks.push('4 BHK');
  return bhks.length > 0 ? Array.from(new Set(bhks)).join(', ') : '2, 3 BHK';
}

function cleanTitle(title: string): string {
  if (!title) return 'Residential Property';
  return title
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatFeatures(amenities: string): string {
  if (!amenities) return 'Lift • Parking • 24/7 Security • Power Backup';
  const items = amenities
    .replace(/\//g, ',')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  return items.slice(0, 6).join(' • ');
}

async function seed() {
  console.log('🌱 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI!);
  console.log('✅ Connected to DB');

  const excelPath = path.resolve('e:/office-project/bhoomiplot/bhoomi-plots/CRM Project details  (1).xlsx');
  console.log(`📖 Reading Excel file: ${excelPath}`);

  const wb = XLSX.readFile(excelPath);
  const rawRows: any[] = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1']);

  // First row is descriptions / headers in Hindi/English, real data starts at index 1
  const dataRows = rawRows.slice(1);
  console.log(`Found ${dataRows.length} project rows to process.`);

  const seededPlots = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const title = cleanTitle(row.project_title);
    if (!title || title.toLowerCase().includes('project ka naam')) continue;

    const minPrice = Number(row.minimum_unit_price) || 0;
    const maxPrice = Number(row.maximum_unit_price) || 0;

    const price = formatPriceInLakhs(minPrice);
    const priceRange = formatPriceRange(minPrice, maxPrice);

    const smallest = Number(row.smallest_unit_size) || 0;
    const biggest = Number(row.biggest_unit_size) || 0;
    const bhk = deriveBHK(smallest, biggest);

    let location = 'Nashik';
    if (row.city) location = row.city;
    if (row.full_address) {
      const parts = row.full_address.split(',');
      const area = parts[parts.length - 2]?.trim() || parts[0]?.trim();
      if (area && !area.toLowerCase().includes('sr') && !area.toLowerCase().includes('servey')) {
        location = `${area}, ${row.city || 'Nashik'}`;
      } else {
        location = `Nashik, Maharashtra`;
      }
    }
    if (row.project_title?.toLowerCase().includes('vraj')) location = 'Indira Nagar, Nashik';
    if (row.project_title?.toLowerCase().includes('sarthak')) location = 'Mumbai Naka, Nashik';
    if (row.project_title?.toLowerCase().includes('liberty')) location = 'Chetna Nagar, Nashik';
    if (row.project_title?.toLowerCase().includes('pawa')) location = 'Indira Nagar, Nashik';
    if (row.project_title?.toLowerCase().includes('shree')) location = 'Bhaba Nagar, Mumbai Naka, Nashik';
    if (row.project_title?.toLowerCase().includes('samarth')) location = 'Meri Rasbihari Link Road, Nashik';
    if (row.project_title?.toLowerCase().includes('adish')) location = 'Meri Rasbihari Link Road, Nashik';

    const reraNumber = row.rera_number && row.rera_number !== 'NA' ? String(row.rera_number).toUpperCase() : 'Applied';

    let status = 'Under Construction';
    if (String(row.project_status).toLowerCase().includes('ready')) {
      status = 'Ready to Move';
    } else if (String(row.project_status).toLowerCase().includes('planning')) {
      status = 'New Launch';
    }

    const floors = row.project_floor_count ? `Featuring ${row.project_floor_count} floors.` : '';
    const description = `Premium ${bhk} residential spaces at ${title}, located in prime ${location}. ${floors} Designed with top-tier amenities, modern infrastructure, and excellent connectivity.`;

    const features = formatFeatures(row.amenities);

    // Categories: residential, with some commercial/residential combo
    const category = 'residential';

    const imageUrl = `/projects/${i % 2 === 0 ? 'residential' : 'plot'}.jpg`;

    const isFeatured = i < 3; // First 3 are featured

    const plotDoc = {
      title,
      category,
      price,
      priceRange,
      bhk,
      location,
      description,
      features,
      status,
      reraNumber,
      developer: 'Bhoomi Projects',
      imageUrl,
      isFeatured,
    };

    // Upsert by title
    const updated = await Plot.findOneAndUpdate({ title }, plotDoc, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    seededPlots.push(updated);
    console.log(`✅ Seeded: ${title} | ${bhk} | Starting: ${price} | Range: ${priceRange} | Status: ${status}`);
  }

  console.log(`\n🎉 Successfully seeded ${seededPlots.length} CRM projects into MongoDB Atlas!`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
