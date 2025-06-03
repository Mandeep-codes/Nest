const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("./models/listing"); // update path if needed
require("dotenv").config();

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const DB_URL = "mongodb://127.0.0.1:27017/your-db-name"; // ← change this

async function updateListingsWithCoordinates() {
  await mongoose.connect(DB_URL);
  console.log("📡 Connected to DB");

  const listings = await Listing.find({ $or: [{ geometry: { $exists: false } }, { "geometry.coordinates": { $size: 0 } }] });

  console.log(`🔍 Found ${listings.length} listings to update...`);

  for (let listing of listings) {
    try {
      const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          key: OPENCAGE_API_KEY,
          q: listing.location,
          limit: 1
        }
      });

      const results = response.data.results;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        listing.geometry = {
          type: "Point",
          coordinates: [lng, lat]
        };
        await listing.save();
        console.log(`✅ Updated "${listing.title}" with coordinates: [${lng}, ${lat}]`);
      } else {
        console.warn(`⚠️ No coordinates found for "${listing.title}" (${listing.location})`);
      }

    } catch (err) {
      console.error(`❌ Error for "${listing.title}": ${err.message}`);
    }
  }

  console.log("🎉 All done.");
  await mongoose.disconnect();
}

updateListingsWithCoordinates();
