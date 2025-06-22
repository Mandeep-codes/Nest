# 🏡 Nest – Rent & Listing Platform

Nest is a full-stack backend project for listing rental properties. Users can upload property details along with images, and the app handles location mapping automatically using third-party APIs. Think of it as a foundation for a platform like NoBroker or Airbnb — built with Node.js and Express.

🛠️ I made this while learning backend development, file uploads, API integration, and how to store and serve real-world listing data.

🌐 **Live Demo:**  
https://nest-yoor.onrender.com/

---

**🧰 Tech Stack:**  
Node.js  
Express  
MongoDB + Mongoose  
Cloudinary (for image uploads)  
OpenCage + Thunderforest APIs (for location data)  
Multer (for handling file uploads)  
dotenv  
csv-parser 

---

**🚀 How to Run Locally:**

Clone the repo:  
`git clone https://github.com/Mandeep-codes/Nest.git`  
`cd Nest`

Install dependencies:  
`npm install`

Set up environment variables:  
Create a `.env` file in the root directory and add all required API keys and DB connections (refer to `.env.example` if provided)

Start the server:  
`node app.js` or `nodemon app.js`

---

**📦 Features:**

- 🏠 Add rental listings with details and images  
- 🖼️ Upload and store property images via Cloudinary  
- 📍 Auto-map locations using OpenCage/Thunderforest APIs  
- 📂 RESTful API for property data  
- 🧹 Cleans and corrects incomplete location info  
- 🧾 MongoDB for storing listing data

---

**📚 What I Learned:**

- Building a real-world Express backend  
- Managing images and file uploads securely  
- Geocoding and reverse-geocoding locations  
- MongoDB schema design  
- Deploying production backends on Render

---

**📄 License:**  
MIT


