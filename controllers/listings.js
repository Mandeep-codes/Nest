const Listing = require("../models/listing");
const axios = require('axios');
const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

module.exports.index = async(req,res)=>{
    const { category, search } = req.query;
    let query = {};
    
    if (category) {
        query.category = category;
    }
    
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } }
        ];
    }
    
    const allListings = await Listing.find(query);
    res.render("listings/index", { 
  allListings,
  currentCategory: req.query.category,
  searchQuery: req.query.search 
});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Requested listing does not exists");
        return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // 🌍 Debug: log the location received from the form
    console.log("📫 Location from form:", req.body.listing.location);

    // 🌍 Geocode address to coordinates using OpenCage
    try {
        const geoResponse = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
            params: {
                key: OPENCAGE_API_KEY,
                q: req.body.listing.location,
                limit: 1
            }
        });

        // 🌍 Debug: log the geocoding response
        if (geoResponse.data.results.length > 0) {
            const { lat, lng } = geoResponse.data.results[0].geometry;
            console.log("📍 Coordinates fetched:", lat, lng);
            newListing.geometry = {
                type: "Point",
                coordinates: [lng, lat]
            };
        } else {
            console.log("❌ No coordinates found for:", req.body.listing.location);
            req.flash("error", "Could not find location coordinates. Try entering a more specific location.");
            return res.redirect("/listings/new");
        }
    } catch (err) {
        console.error("❌ Geocoding error:", err.message);
        req.flash("error", "Failed to geocode the location. Try again.");
        return res.redirect("/listings/new");
    }

    // 🖼️ Image upload
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    } else {
        newListing.image = {
            url: "",
            filename: ""
        };
    }

    await newListing.save();
    req.flash("success", "New listing Created");
    res.redirect("/listings");
};


module.exports.renderEditForm = async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Requested listing does not exists");
        return res.redirect("/listings");
    };

    let originalImageUrl = listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
     
    res.render("listings/edit.ejs",{listing,originalImageUrl})
};

module.exports.updateListing = async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findOneAndDelete({ _id: id }); 
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};


